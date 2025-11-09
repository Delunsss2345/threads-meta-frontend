import { motion } from "framer-motion";
import {
  BellOff,
  Bookmark,
  EyeOff,
  Link2,
  Shield,
  UserMinus,
  UserX,
} from "lucide-react";
import MenuItem from "../MenuItem";

const Menu = () => {
  return (
    <motion.div
      className="w-64 bg-card text-card-foreground rounded-xl shadow-md border border-border py-1"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.18,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="px-3 py-2 text-sm hover:bg-accent cursor-pointer rounded-t-lg">
        Thêm vào bảng feed
      </div>

      <div className="h-px bg-border my-1" />

      <MenuItem icon={<Bookmark className="w-4 h-4" />}>Lưu</MenuItem>
      <MenuItem icon={<EyeOff className="w-4 h-4" />}>Không quan tâm</MenuItem>
      <MenuItem icon={<BellOff className="w-4 h-4" />}>Tắt thông báo</MenuItem>
      <MenuItem icon={<UserMinus className="w-4 h-4" />}>Hạn chế</MenuItem>

      <MenuItem
        icon={<UserX className="w-4 h-4 text-destructive" />}
        className="text-destructive hover:bg-destructive/10"
      >
        Chặn
      </MenuItem>

      <MenuItem
        icon={<Shield className="w-4 h-4 text-destructive" />}
        className="text-destructive hover:bg-destructive/10"
      >
        Báo cáo
      </MenuItem>

      <div className="h-px bg-border my-1" />

      <MenuItem icon={<Link2 className="w-4 h-4" />}>
        Sao chép liên kết
      </MenuItem>
    </motion.div>
  );
};
export default Menu;
