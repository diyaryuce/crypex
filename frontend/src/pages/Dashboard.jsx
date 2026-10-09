import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  getWallets,
  getTransactions,
  getMarketPrices,
  getMarketHistory,
  getPortfolioHistory,
} from "../services/api";

import TradeForm from "../components/TradeForm";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MiniChart from "../components/MiniCharts";
import DateButtons from "../components/DateButtons";
import TransactionList from "../components/TransactionList";
import WalletCards from "../components/WalletCards";
import MarketPrices from "../components/MarketPrices";

export default function Dashboard({ user }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [marketPrices, setMarketPrices] = useState([]);

  const [selectedRange, setSelectedRange] = useState("1D");
  const [portfolioData, setPortfolioData] = useState([]);

  const [miniChartHistory, setMiniChartHistory] = useState({
    BTC: [],
    ETH: [],
    SOL: [],
    BNB: [],
  });

  const [historyLoading, setHistoryLoading] = useState(false);

  const [error, setError] = useState("");
  const [historyError, setHistoryError] = useState("");

  const prices = {
    BTC: marketPrices?.BTC?.price ?? 0,
    ETH: marketPrices?.ETH?.price ?? 0,
    SOL: marketPrices?.SOL?.price ?? 0,
    BNB: marketPrices?.BNB?.price ?? 0,
  };

  const changes = {
    BTC: marketPrices?.BTC?.change24h ?? 0,
    ETH: marketPrices?.ETH?.change24h ?? 0,
    SOL: marketPrices?.SOL?.change24h ?? 0,
    BNB: marketPrices?.BNB?.change24h ?? 0,
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

  const portfolioStartValue = portfolioData[0]?.price ?? 0;
  const portfolioEndValue = portfolioData[portfolioData.length - 1]?.price ?? 0;

  const portfolioChange = portfolioEndValue - portfolioStartValue;

  const portfolioChangePercent =
    portfolioStartValue > 0 ? (portfolioChange / portfolioStartValue) * 100 : 0;

  async function loadDashboard() {
    setError("");

    try {
      const [walletData, transactionData] = await Promise.all([
        getWallets(),
        getTransactions(),
      ]);

      setWallets(walletData);
      setTransactions(transactionData);
    } catch (error) {
      setError(error.message);
    }

    try {
      const marketData = await getMarketPrices();
      setMarketPrices(marketData);
    } catch (error) {
      console.error("Failed to fetch market prices:", error);
    }
  }

  async function loadMiniChartHistory() {
    try {
      const [btcHistory, ethHistory, solHistory, bnbHistory] =
        await Promise.all([
          getMarketHistory("BTC", "1D"),
          getMarketHistory("ETH", "1D"),
          getMarketHistory("SOL", "1D"),
          getMarketHistory("BNB", "1D"),
        ]);

      setMiniChartHistory({
        BTC: btcHistory,
        ETH: ethHistory,
        SOL: solHistory,
        BNB: bnbHistory,
      });
    } catch (error) {
      console.error("Failed to fetch mini chart history:", error);
    }
  }

  async function loadPortfolioHistory(range) {
    if (historyLoading) return;

    try {
      setHistoryLoading(true);
      setHistoryError("");

      const data = await getPortfolioHistory(range);

      setPortfolioData(data);
    } catch (error) {
      setHistoryError(error.message);
    } finally {
      setHistoryLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
    loadMiniChartHistory();
  }, []);

  useEffect(() => {
    if (wallets.length === 0) return;

    loadPortfolioHistory(selectedRange);
  }, [wallets, selectedRange]);

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl">Dashboard</h1>
              <p className="text-[#858b97] mt-1 mb-4">
                Overview of your portfolio, wallets and recent activity
              </p>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {historyError && <p className="text-red-500">{historyError}</p>}
          </div>

          <section className="flex gap-4">
            <div className="rounded-3xl px-7 py-4 border border-[#3c3c3c]/50 bg-[#151515] w-[58%] flex">
              <div className="flex flex-col gap-2 mt-4">
                <h2 className="text-[#858b97] text-lg">Portfolio Value</h2>
                <h1 className="text-[2.75rem]">${portfolioValue.toFixed(2)}</h1>

                <div
                  className={`flex gap-2 ${
                    portfolioChange >= 0 ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  <ArrowUpRight
                    className={`transition duration-300 ${portfolioChange >= 0 ? "" : "rotate-90"}`}
                  />

                  <span>
                    {portfolioChange >= 0 ? "+" : ""}
                    {portfolioChangePercent.toFixed(2)}%
                  </span>

                  <span>
                    ({portfolioChange >= 0 ? "+" : "-"}$
                    {Math.abs(portfolioChange).toFixed(2)})
                  </span>
                </div>
              </div>

              <div className="flex flex-col ml-auto gap-8">
                <DateButtons
                  selected={selectedRange}
                  onChange={(range) => {
                    if (!historyLoading) {
                      setSelectedRange(range);
                    }
                  }}
                />

                <MiniChart
                  data={portfolioData}
                  className="w-125 h-30"
                  colour={portfolioChange >= 0 ? "#34d399" : "#ef4444"}
                />
              </div>
            </div>

            <TradeForm onTrade={loadDashboard} prices={prices} />
          </section>

          <WalletCards
            wallets={wallets}
            assetInfo={assetInfo}
            prices={prices}
            historyData={miniChartHistory}
            changes={changes}
          />

          <div className="flex gap-4">
            <TransactionList
              transactions={transactions}
              assetInfo={assetInfo}
              prices={prices}
            />

            <MarketPrices
              prices={prices}
              changes={changes}
              historyData={miniChartHistory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
