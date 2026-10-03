import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getWallets, getTransactions } from "../services/api";

import TradeForm from "../components/TradeForm";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MiniChart, { portfolioData } from "../components/MiniCharts";
import DateButtons from "../components/DateButtons";
import TransactionList from "../components/TransactionList";
import WalletCards from "../components/WalletCards";
import MarketPrices from "../components/MarketPrices";

export default function Dashboard({ user }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const prices = {
    BTC: 60000,
    ETH: 2500,
    SOL: 158,
    BNB: 600,
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

        <div className="px-6 py-4 bg-[#101011]">
          <h1 className="text-4xl">Dashboard</h1>
          <p className="text-[#858b97] mt-1 mb-4">
            Overview of your portfolio, wallets and recent activity
          </p>

          {error && <p>{error}</p>}

          <section className="flex gap-4">
            <div className="rounded-3xl px-7 py-4 border border-[#3c3c3c]/50 bg-[#151515] w-[58%] flex">
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

            <TradeForm onTrade={loadDashboard} prices={prices} />
          </section>

          <WalletCards
            wallets={wallets}
            assetInfo={assetInfo}
            prices={prices}
          />

          <div className="flex gap-4">
            <TransactionList
              transactions={transactions}
              assetInfo={assetInfo}
              prices={prices}
            />

            <MarketPrices prices={prices} />
          </div>
        </div>
      </main>
    </div>
  );
}
