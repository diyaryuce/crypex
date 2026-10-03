import SidebarButton from "./SidebarButton";

import {
  House,
  ChartNoAxesColumnIncreasing,
  TrendingUp,
  ClipboardList,
  UserRound,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      className="
        h-screen w-[15%] sticky top-0 overflow-hidden bg-[#141515] flex flex-col p-4 pt-8
        border-r border-[#3c3c3c]/50 shrink-0
      "
    >
      <h1 className="emerald-gradient font-semibold text-4xl mb-4 ml-6">
        CrypEx
      </h1>

      <div className="flex flex-col w-full gap-4">
        <SidebarButton icon={House} label={"Dashboard"} selected />
        <SidebarButton icon={ChartNoAxesColumnIncreasing} label={"Markets"} />
        <SidebarButton icon={TrendingUp} label={"Trade"} />
        <SidebarButton icon={ClipboardList} label={"Transactions"} />
        <SidebarButton icon={UserRound} label={"Account"} />
      </div>
    </aside>
  );
}
