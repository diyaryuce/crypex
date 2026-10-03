import { ArrowUpRight, ChevronRight } from "lucide-react";
import MiniChart, { chartData } from "./MiniCharts";

export default function WalletCards({ wallets, assetInfo, prices }) {
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
                    flex-1 group flex items-center rounded-2xl mt-4
                    border border-[#3c3c3c]/50 px-6 py-4 relative
                    hover:scale-[1.02] transition duration-200 bg-[#151515]
                  "
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3">
                <img
                  src={info?.image}
                  alt={wallet.asset}
                  className="h-12 w-auto"
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
              className="h-20 w-60 mx-auto"
            />

            <ChevronRight className="absolute top-6 right-6 text-[#858b97] transition duration-200 group-hover:translate-x-2" />
          </button>
        );
      })}
    </section>
  );
}
