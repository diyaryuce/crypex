import { useState } from "react";
import { buyCrypto, sellCrypto } from "../services/api";

export default function TradeForm({ onTrade }) {
  const [asset, setAsset] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  async function handleTrade(type) {
    setError("");

    try {
      const numericAmount = Number(amount);

      if (type === "buy") {
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
    <section>
      <h2>Trade</h2>

      <select value={asset} onChange={(event) => setAsset(event.target.value)}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>

      <input
        type="number"
        step="any"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />

      <button onClick={() => handleTrade("buy")}>Buy</button>

      <button onClick={() => handleTrade("sell")}>Sell</button>

      {error && <p>{error}</p>}
    </section>
  );
}
