export default function SidebarButton({
  icon: Icon,
  label,
  selected,
  className,
}) {
  return (
    <button
      className={`
        group relative flex items-center overflow-hidden
        rounded-xl px-4 py-3 gap-3
        transition-colors duration-300

        ${className}
        ${selected ? "text-white" : "hover:text-white text-[#54585f]"}
      `}
    >
      <span
        className={`
          absolute inset-0 origin-left
          bg-gradient-to-r from-[#1d3328] to-[#202b24]
          transition-transform duration-300

          ${selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
        `}
      />
      {Icon && <Icon size={20} className="relative z-10" />}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
