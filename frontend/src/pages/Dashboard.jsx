import { use, useEffect, useState } from "react";
import { getWallets, getTransactions } from "../services/api";
import TradeForm from "../components/TradeForm";

export default function Dashboard({ user }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

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
    <main>
      <h1>Dashboard</h1>
      <br />
      <p>Logged in as {user.email}</p>
      <br />

      {error && <p>{error}</p>}

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
    </main>
  );
}
