interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-center gap-4 px-4 py-3 rounded-xl transition-all w-full ${
        active
          ? "bg-[#1a1a1a] text-white"
          : "text-gray-400 hover:bg-[#0f0f0f] hover:text-white"
      }`}
    >
      <div className=" flex items-center justify-center">{icon}</div>
    </button>
  );
};
export default NavItem;
