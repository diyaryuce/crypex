import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AssetSelect({ value, onChange }) {
  const assets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      image: "/img/btc.png",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      image: "/img/eth.png",
    },
  ];

  const [open, setOpen] = useState(false);

  const selectedAsset = assets.find((item) => item.symbol === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex w-full items-center gap-3
          rounded-2xl border border-[#3c3c3c]/60
          bg-[#151515] px-5 py-3
        "
      >
        <img src={selectedAsset.image} alt="" className="h-7 w-7" />

        <span>{selectedAsset.symbol}</span>

        <ChevronDown
          className={`
            ml-auto transition-transform duration-200

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`
            absolute left-0 z-20 mt-2
            w-full overflow-hidden
            rounded-2xl border border-[#3c3c3c]
            bg-[#1a1a1a]
            transition duration-200 ease-in-out

            ${
              open
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }
          `}
      >
        {assets.map((item) => (
          <button
            key={item.symbol}
            type="button"
            onClick={() => {
              onChange(item.symbol);
              setOpen(false);
            }}
            className="
                flex w-full items-center gap-3
                px-5 py-3 text-left
                hover:bg-[#202b24]
              "
          >
            <img src={item.image} alt="" className="h-7 w-7" />

            <div>
              <p>{item.symbol}</p>
              <p className="text-sm text-[#858b97]">{item.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
