import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getWallets, getTransactions } from "../services/api";
import TradeForm from "../components/TradeForm";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MiniChart from "../components/MiniCharts";
import SidebarButton from "../components/SidebarButton";

export default function Dashboard({ user }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const btcData = [
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

  const portfolioValue = wallets.reduce((total, wallet) => {
    const balance = Number(wallet.balance);

    if (wallet.asset === "USD") {
      return total + balance;
    }

    return total + balance * (prices[wallet.asset] ?? 0);
  }, 0);

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
            <div className="rounded-3xl px-6 py-10 border border-[#3c3c3c]/50 w-[66%] flex gap-1">
              <div className="flex flex-col">
                <h2 className="text-[#858b97] text-lg">Portfolio Value</h2>
                <h1 className="text-[2.75rem]">${portfolioValue.toFixed(2)}</h1>

                <div className="flex gap-2 text-emerald-500">
                  <ArrowUpRight />
                  <span>+2.31%</span>
                  <span>(+$280.32)</span>
                </div>
              </div>

              <div className="flex flex-col ml-auto gap-8">
                <div className="flex ml-auto">
                  <SidebarButton label={"1D"} />
                </div>

                <MiniChart data={btcData} className="w-150 h-30" />
              </div>
            </div>

            <div className="rounded-3xl p-4 border border-[#3c3c3c]/50 w-[34%]">
              <h2>Quick Trade</h2>
            </div>
          </section>

          <section>
            <h2>Wallets</h2>

            {wallets.map((wallet) => (
              <div key={wallet.id}>
                <h2>{wallet.asset}</h2>
                <p>{wallet.balance}</p>
                <br />
              </div>
            ))}
          </section>

          <TradeForm onTrade={loadDashboard} />

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
