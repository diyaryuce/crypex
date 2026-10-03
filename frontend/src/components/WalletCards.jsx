import { ArrowUpRight, ChevronRight } from "lucide-react";
import MiniChart from "./MiniCharts";

export default function WalletCards({ wallets, assetInfo, prices }) {
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

  return (
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
  );
}
