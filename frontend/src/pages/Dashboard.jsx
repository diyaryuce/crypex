import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { getWallets, getTransactions } from "../services/api";
import TradeForm from "../components/TradeForm";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MiniChart from "../components/MiniCharts";
import DateButtons from "../components/DateButtons";

export default function Dashboard({ user }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const portfolioData = [
    { price: 62000 },
    { price: 62500 },
    { price: 62100 },
    { price: 63200 },
    { price: 62900 },
    { price: 64100 },
    { price: 65000 },
  ];

  const prices = {
    BTC: 60000,
    ETH: 2500,
  };

  const assetInfo = {
    USD: {
      name: "US Dollar",
      image: "/img/usd.png",
    },
    BTC: {
      name: "Bitcoin",
      image: "/img/btc.png",
    },
    ETH: {
      name: "Ethereum",
      image: "/img/eth.png",
    },
  };

  const portfolioValue = wallets.reduce((total, wallet) => {
    const balance = Number(wallet.balance);

    if (wallet.asset === "USD") {
      return total + balance;
    }

    return total + balance * (prices[wallet.asset] ?? 0);
  }, 0);

  const btcChartData = [
    { price: 62000 },
    { price: 63500 },
    { price: 64200 },
    { price: 63800 },
    { price: 63100 },
    { price: 62900 },
    { price: 64100 },
    { price: 65000 },
    { price: 64600 },
    { price: 65400 },
    { price: 64800 },
    { price: 63900 },
  ];

  const ethChartData = [
    { price: 2500 },
    { price: 2460 },
    { price: 2380 },
    { price: 2320 },
    { price: 2350 },
    { price: 2440 },
    { price: 2480 },
    { price: 2450 },
    { price: 2510 },
    { price: 2550 },
    { price: 2490 },
  ];

  const usdChartData = [
    { price: 100 },
    { price: 100.1 },
    { price: 99.9 },
    { price: 100.05 },
    { price: 100 },
    { price: 100.08 },
    { price: 99.98 },
  ];

  const chartData = {
    BTC: btcChartData,
    ETH: ethChartData,
    USD: usdChartData,
  };

  async function loadDashboard() {
    try {
      setError("");

      const walletData = await getWallets();
      const transactionData = await getTransactions();

      setWallets(walletData);
      setTransactions(transactionData);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#151515] w-full min-w-0 overflow-x-clip text-white">
      <Sidebar />

      <main
        className="
          placeholder:text-white 
          gap-12 min-w-0 flex-1
        "
      >
        <Header user={user} />

        <div className="p-6">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-[#858b97] mt-1 mb-4">
            Overview of your portfolio, wallets and recent activity
          </p>

          {error && <p>{error}</p>}

          <section className="flex gap-4">
            <div className="rounded-3xl px-6 py-10 border border-[#3c3c3c]/50 w-[60%] flex">
              <div className="flex flex-col gap-2 mt-4">
                <h2 className="text-[#858b97] text-lg">Portfolio Value</h2>
                <h1 className="text-[2.75rem]">${portfolioValue.toFixed(2)}</h1>

                <div className="flex gap-2 text-emerald-500">
                  <ArrowUpRight />
                  <span>+2.31%</span>
                  <span>(+$280.32)</span>
                </div>
              </div>

              <div className="flex flex-col ml-auto gap-8">
                <DateButtons />

                <MiniChart data={portfolioData} className="w-130 h-30" />
              </div>
            </div>

            <TradeForm onTrade={loadDashboard} />
          </section>

          <section className="flex gap-6">
            {wallets.map((wallet) => {
              const info = assetInfo[wallet.asset];

              const usdValue =
                wallet.asset === "USD"
                  ? Number(wallet.balance)
                  : Number(wallet.balance) * (prices[wallet.asset] ?? 0);

              return (
                <button
                  key={wallet.id}
                  className="
                    flex-1 group flex items-center rounded-3xl mt-4
                    border border-[#3c3c3c]/50 px-6 py-6 relative
                    hover:scale-[1.02] transition duration-200
                  "
                >
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                      <img
                        src={info?.image}
                        alt={wallet.asset}
                        className="h-10 w-10"
                      />

                      <div className="flex flex-col items-start">
                        <h2 className="text-lg font-medium">{wallet.asset}</h2>
                        <p className="text-sm text-[#858b97]">{info?.name}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-2xl font-medium max-w-md">
                      {wallet.asset !== "USD"
                        ? `${wallet.balance} ${wallet.asset}`
                        : `$${wallet.balance}`}
                    </p>

                    {wallet.asset !== "USD" && (
                      <p className="text-[#858b97]">≈ ${usdValue.toFixed(2)}</p>
                    )}

                    <div className="flex mt-2 gap-2 text-emerald-500">
                      <ArrowUpRight />
                      <span>+2.31%</span>
                    </div>
                  </div>

                  <MiniChart
                    data={chartData[wallet.asset]}
                    className="h-20 w-50 mx-auto"
                  />

                  <ChevronRight className="text-[#858b97] transition duration-200 group-hover:translate-x-2" />
                </button>
              );
            })}
          </section>

          <section>
            <h2>Recent transactions</h2>

            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <p>
                  {transaction.type} {transaction.amount} {transaction.asset}
                </p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
