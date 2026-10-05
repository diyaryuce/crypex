import SidebarButton from "./SidebarButton";

export default function DateButtons({ selected, onChange }) {
  const ranges = ["1D", "1W", "1M", "1Y"];

  return (
    <div className="flex ml-auto gap-4">
      {ranges.map((range) => (
        <SidebarButton
          key={range}
          label={range}
          selected={selected === range}
          onClick={() => onChange(range)}
        />
      ))}
    </div>
  );
}
