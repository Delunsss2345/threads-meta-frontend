import Logo from "@/components/Logo";
import { Heart, Home, Menu, Pin, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import NavItem from "../NavItem";
const Navbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState("home");

  return (
    <nav className=" bg-black border-gray-900 h-screen fixed left-0 top-0 flex flex-col p-4 z-10">
      {/* Logo */}
      <div className="mb-8 size-10 hover:scale-110 transition cursor-pointer">
        <Logo />
      </div>

      {/* Navigation Items */}
      <div className="space-y-1 flex-1 gap-5 flex flex-col justify-center">
        <NavItem
          icon={<Home size={30} strokeWidth={2} />}
          active={activeNav === "home"}
          onClick={() => setActiveNav("home")}
          link="/"
        />
        <NavItem
          icon={<Search size={30} strokeWidth={2} />}
          active={activeNav === "search"}
          onClick={() => setActiveNav("search")}
          link="/search"
        />
        <NavItem
          icon={
            <div className="relative">
              <div className="w-9 h-9 bg-linear-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                <Plus size={20} strokeWidth={2.5} />
              </div>
            </div>
          }
          active={activeNav === "write"}
          onClick={() => setActiveNav("write")}
          link="/write"
        />
        <NavItem
          icon={<Heart size={30} strokeWidth={2} />}
          active={activeNav === "activity"}
          onClick={() => setActiveNav("activity")}
          link="/activity"
        />
        <NavItem
          icon={<User size={30} strokeWidth={2} />}
          active={activeNav === "profile"}
          onClick={() => setActiveNav("profile")}
          link="/profile"
        />
      </div>

      {/* Bottom Items */}
      <div className="space-y-1 border-t border-gray-900 pt-4">
        <NavItem icon={<Pin size={24} strokeWidth={2} />} />
        <NavItem icon={<Menu size={24} strokeWidth={2} />} />
      </div>
    </nav>
  );
};

export default Navbar;
