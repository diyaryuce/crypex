import { useState } from "react";
import SidebarButton from "./SidebarButton";

export default function DateButtons() {
  const [selected, setSelected] = useState("1D");

  return (
    <div className="flex ml-auto gap-4">
      <SidebarButton
        label="1D"
        selected={selected === "1D"}
        onClick={() => setSelected("1D")}
      />

      <SidebarButton
        label="1W"
        selected={selected === "1W"}
        onClick={() => setSelected("1W")}
      />

      <SidebarButton
        label="1M"
        selected={selected === "1M"}
        onClick={() => setSelected("1M")}
      />

      <SidebarButton
        label="1Y"
        selected={selected === "1Y"}
        onClick={() => setSelected("1Y")}
      />
    </div>
  );
}
