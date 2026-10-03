import { useState } from "react";
import { buyCrypto, sellCrypto } from "../services/api";
import AssetSelect from "./AssetSelect";

export default function TradeForm({ onTrade, prices }) {
  const [asset, setAsset] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [tradeType, setTradeType] = useState("Buy");
  const [error, setError] = useState("");

  async function handleTrade(type) {
    setError("");

    try {
      const numericAmount = Number(amount);

      if (type === "Buy") {
        await buyCrypto(asset, numericAmount);
      } else {
        await sellCrypto(asset, numericAmount);
      }

      setAmount("");

      onTrade();
    } catch (error) {
      setError(error.message);
    }
  }

  const estimatedTotal = Number(amount || 0) * (prices[asset] ?? 0);

  return (
    <section className="rounded-3xl px-8 py-4 border border-[#3c3c3c]/50 w-full bg-[#151515]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Quick Trade</h2>

        <div className="flex w-60 rounded-2xl bg-[#1d1f1f]">
          <button
            type="button"
            onClick={() => setTradeType("Buy")}
            className={`
              flex-1 rounded-xl py-2 text-lg transition
              ${
                tradeType === "Buy"
                  ? "bg-[radial-gradient(50.42%_92.5%_at_50.42%_7.5%,#6EE7B7_0%,#047857_100%)] text-black"
                  : "text-[#858b97]"
              }
            `}
          >
            Buy
          </button>

          <button
            type="button"
            onClick={() => setTradeType("Sell")}
            className={`
              flex-1 rounded-xl py-2 text-lg transition
              ${
                tradeType === "Sell"
                  ? "bg-[radial-gradient(50.42%_92.5%_at_50.42%_7.5%,#6EE7B7_0%,#047857_100%)] text-black"
                  : "text-[#858b97]"
              }
            `}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <div className="w-[45%]">
          <label className="mb-2 block text-[#858b97]">Asset</label>

          <AssetSelect value={asset} onChange={setAsset} />
        </div>

        <div className="w-[55%]">
          <label className="mb-2 block text-[#858b97]">Amount</label>

          <div
            className="
              flex w-full items-center gap-3
              rounded-xl border border-[#3c3c3c]/60
              bg-[#151515] px-5 py-1
            "
          >
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="h-full w-full py-3 rounded-xl focus:outline-none focus:ring-0"
            />

            <span className="ml-auto text-[#858b97]">{asset}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-[#858b97]">Est. total</span>
        <span>${estimatedTotal.toFixed(2)}</span>
      </div>

      <button
        onClick={() => handleTrade(tradeType)}
        className="
          gap-1 flex w-full justify-center items-center font-semibold h-11 mt-1 rounded-xl text-lg
          bg-[radial-gradient(50.42%_92.5%_at_50.42%_7.5%,#6EE7B7_0%,#047857_100%)] text-black
          transition duration-300 hover:scale-[1.05]
        "
      >
        <span>{tradeType}</span>
        <span>{asset}</span>
      </button>

      {error && <p>{error}</p>}
    </section>
  );
}
