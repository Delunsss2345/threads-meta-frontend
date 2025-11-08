interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  link?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, active = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-center gap-4 px-4 py-3 rounded-xl transition-all w-full ${
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
      }`}
    >
      <div className="flex items-center justify-center">{icon}</div>
    </div>
  );
};

export default NavItem;
