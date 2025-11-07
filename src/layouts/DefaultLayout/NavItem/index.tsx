import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  link?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  active = false,
  link = null,
  onClick,
}) => {
  const Component = link ? NavLink : "div";

  return (
    <Component
      onClick={onClick}
      to={`${link}`}
      className={`cursor-pointer flex items-center justify-center gap-4 px-4 py-3 rounded-xl transition-all w-full ${
        active
          ? "bg-[#1a1a1a] text-white"
          : "text-gray-400 hover:bg-[#0f0f0f] hover:text-white"
      }`}
    >
      <div className=" flex items-center justify-center">{icon}</div>
    </Component>
  );
};
export default NavItem;
