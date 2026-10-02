import { useState } from "react";
import { buyCrypto, sellCrypto } from "../services/api";
import AssetSelect from "./AssetSelect";

export default function TradeForm({ onTrade }) {
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

  return (
    <section className="rounded-3xl px-8 py-6 border border-[#3c3c3c]/50 w-[40%]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Quick Trade</h2>

        <div className="flex w-60 rounded-2xl bg-[#1d1f1f]">
          <button
            type="button"
            onClick={() => setTradeType("Buy")}
            className={`
              flex-1 rounded-xl py-3 text-lg transition
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
              flex-1 rounded-xl py-3 text-lg transition
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

      <div className="mt-7 flex gap-4">
        <div className="w-[45%]">
          <label className="mb-2 block text-lg text-[#858b97]">Asset</label>

          <AssetSelect value={asset} onChange={setAsset} />
        </div>

        <div className="w-[55%]">
          <label className="mb-2 block text-lg text-[#858b97]">Asset</label>

          <div
            className="
              flex w-full items-center gap-3
              rounded-2xl border border-[#3c3c3c]/60
              bg-[#151515] px-5 py-1
            "
          >
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="h-full w-full py-3 rounded-2xl focus:outline-none focus:ring-0"
            />

            <span className="ml-auto text-[#858b97]">{asset}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleTrade(tradeType)}
        className="
          gap-1 flex w-full justify-center items-center font-semibold mt-6 h-12 rounded-xl text-xl
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
