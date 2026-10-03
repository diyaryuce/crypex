import MiniChart, { cryptoChartData } from "../components/MiniCharts";

export default function MarketPrices({ prices }) {
  const marketData = [
    {
      symbol: "BTC",
      image: "/img/btc.png",
      price: prices.BTC,
      change: "+3.4%",
    },
    {
      symbol: "ETH",
      image: "/img/eth.png",
      price: prices.ETH,
      change: "+2.1%",
    },
    {
      symbol: "SOL",
      image: "/img/sol.png",
      price: prices.SOL,
      change: "+1.8%",
    },
    {
      symbol: "BNB",
      image: "/img/bnb.png",
      price: prices.BNB,
      change: "+0.9%",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#3c3c3c]/50 px-6 py-3.25 w-[40%] mt-4 bg-[#151515]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">Market Prices</h2>

        <button
          type="button"
          className="
            rounded-xl border border-[#3c3c3c]/50
            px-5 py-2 text-sm text-[#858b97]
            transition hover:text-white hover:scale-[1.05]
          "
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-[110px_150px_1.4fr] border-b border-[#2d2d2d] pb-3 text-sm text-[#858b97]">
        <span>Asset</span>
        <span>Price</span>
        <span>24h Change</span>
      </div>

      {marketData.map((coin) => (
        <div
          key={coin.symbol}
          className="
          grid grid-cols-[110px_150px_1.4fr_1fr]
          items-center
          border-b border-[#252525]/50
          py-1.5
          last:border-b-0
        "
        >
          <div className="flex items-center gap-3">
            <img src={coin.image} alt={coin.symbol} className="h-8 w-auto" />

            <span>{coin.symbol}</span>
          </div>

          <span>
            $
            {coin.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <span className="text-emerald-500">{coin.change}</span>

          <MiniChart
            data={cryptoChartData[coin.symbol]}
            className="h-10 w-30 mx-auto"
          />
        </div>
      ))}
    </div>
  );
}
