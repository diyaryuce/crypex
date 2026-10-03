export default function TransactionList({ transactions, assetInfo }) {
  return (
    <section className="rounded-3xl border border-[#3c3c3c]/50 px-6 py-6 w-[60%] mt-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium">Recent Transactions</h2>

        <button
          type="button"
          className="
            rounded-xl border border-[#3c3c3c]/50
            px-3 py-1 text-sm text-[#858b97]
            transition hover:text-white hover:scale-[1.05]
          "
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-[110px_150px_1fr_1fr_1fr_1.4fr] gap-4 border-b border-[#2d2d2d] pb-3 text-sm text-[#858b97]">
        <span>Type</span>
        <span>Asset</span>
        <span>Amount</span>
        <span>Price</span>
        <span>Total</span>
        <span>Date</span>
      </div>

      {transactions.slice(0, 7).map((transaction) => {
        const info = assetInfo[transaction.asset];

        const prices = {
          BTC: 60000,
          ETH: 2500,
        };

        const price =
          transaction.asset === "USD" ? null : prices[transaction.asset];

        const total =
          transaction.asset === "USD"
            ? Number(transaction.amount)
            : Number(transaction.amount) * price;

        return (
          <div
            key={transaction.id}
            className="
              grid grid-cols-[110px_150px_1fr_1fr_1fr_1.4fr]
              items-center gap-4
              border-b border-[#252525]
              py-1.5 text-[#858b97]
              last:border-b-0
            "
          >
            <TransactionType type={transaction.type} />

            <div className="flex items-center gap-3">
              {info?.image && (
                <img
                  src={info.image}
                  alt={transaction.asset}
                  className="h-6 w-auto"
                />
              )}

              <span>{transaction.asset}</span>
            </div>

            <span>{Number(transaction.amount).toFixed(4)}</span>

            <span className="text-[#b8bcc5]">
              {transaction.price
                ? `$${Number(transaction.price).toFixed(2)}`
                : "-"}
            </span>

            <span>
              {transaction.total
                ? `$${Number(transaction.total).toFixed(2)}`
                : "-"}
            </span>

            <span className="text-[#858b97]">
              {new Date(transaction.createdAt).toLocaleString()}
            </span>
          </div>
        );
      })}
    </section>
  );
}

function TransactionType({ type }) {
  const styles = {
    BUY: "bg-emerald-900/40 text-emerald-400",
    SELL: "bg-red-900/30 text-red-400",
    DEPOSIT: "bg-zinc-700/50 text-zinc-300",
  };

  return (
    <span
      className={`
        w-fit rounded-lg px-3 py-1
        text-sm font-medium
        ${styles[type] ?? "bg-zinc-800 text-zinc-300"}
      `}
    >
      {type}
    </span>
  );
}
