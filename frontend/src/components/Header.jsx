import { Bell, ChevronDown, User } from "lucide-react";

export default function Header({ user }) {
  return (
    <header
      className="
        bg-[#121212] h-16 flex justify-end items-center sticky
        p-4 pr-8 border-b border-[#3c3c3c]/50 text-[#828a9c] gap-6
      "
    >
      <button className="hover:scale-[1.1] transition duration-300 curso">
        <Bell />
      </button>

      <div className="w-px h-12 bg-[#828a9c]/20" />

      <button
        className="
          flex gap-4 items-center border rounded-3xl p-1 pl-2 pr-3
        "
      >
        <div className="bg-[radial-gradient(50.42%_92.5%_at_50.42%_7.5%,#6EE7B7_0%,#047857_100%)] overflow-hidden rounded-full">
          <User size={36} className="text-white p-0.5" />
        </div>

        <span className="text-[#c2c6d0]">{user.email}</span>

        <ChevronDown size={20} />
      </button>
    </header>
  );
}
