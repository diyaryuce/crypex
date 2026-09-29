import { use, useEffect, useState } from "react";
import { getWallets } from "../services/api";
import { getTransactions } from "../services/api";

export default function Dashboard({ user }) {
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWallets() {
      try {
        const data = await getWallets();
        setWallets(data);

        const transactionData = await getTransactions();
        setTransactions(transactionData);
      } catch (error) {
        setError(error.message);
      }
    }

    loadWallets();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <br />
      <p>Logged in as {user.email}</p>
      <br />

      {error && <p>{error}</p>}

      {wallets.map((wallet) => (
        <div key={wallet.id}>
          <h2>{wallet.asset}</h2>
          <p>{wallet.balance}</p>
          <br />
        </div>
      ))}

      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>
            {transaction.type} {transaction.amount} {transaction.asset}
          </p>
          <br />
        </div>
      ))}
    </main>
  );
}
