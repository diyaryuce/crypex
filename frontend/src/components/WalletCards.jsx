import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import MiniChart from "./MiniCharts";

export default function WalletCards({
  wallets,
  assetInfo,
  prices,
  historyData,
  changes,
}) {
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
            className={`
                    group flex items-center rounded-2xl mt-4
                    border border-[#3c3c3c]/50 px-8 py-4 relative
                    hover:scale-[1.02] transition duration-200 bg-[#151515]

                    ${wallet.asset === "USD" ? "w-[20%] justify-center" : "flex-1"}
                  `}
          >
            <div
              className={`
                flex flex-col
                ${wallet.asset === "USD" ? "items-center" : "items-start"}
              `}
            >
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

              <p className="mt-3 text-2xl justify-center font-medium max-w-md">
                {wallet.asset !== "USD"
                  ? `${wallet.balance} ${wallet.asset}`
                  : `$${Number(wallet.balance).toFixed(2)}`}
              </p>

              {wallet.asset !== "USD" && (
                <p className="text-[#858b97]">≈ ${usdValue.toFixed(2)}</p>
              )}

              {wallet.asset !== "USD" && (
                <div className="flex mt-2 gap-2">
                  {changes?.[wallet.asset] >= 0 ? (
                    <ArrowUpRight className="text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="text-red-500" />
                  )}

                  {changes?.[wallet.asset] >= 0 ? (
                    <span className="text-emerald-500">
                      <span>+</span>
                      {Number(changes?.[wallet.asset] ?? 0).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                      <span>%</span>
                    </span>
                  ) : (
                    <span className="text-red-500">
                      {Number(changes?.[wallet.asset] ?? 0).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                      <span>%</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {wallet.asset !== "USD" && (
              <MiniChart
                data={historyData[wallet.asset] ?? []}
                className="h-30 w-70 mx-auto"
                colour={changes?.[wallet.asset] >= 0 ? "#34d399" : "#ef4444"}
              />
            )}

            <ChevronRight className="absolute top-6 right-6 text-[#858b97] transition duration-200 group-hover:translate-x-2" />
          </button>
        );
      })}
    </section>
  );
}
