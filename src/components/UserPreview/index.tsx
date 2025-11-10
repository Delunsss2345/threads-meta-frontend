import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface UserPreviewCardProps {
  name: string;
  username: string;
  bio?: string;
  followers?: number;
  avatar?: string;
}

export const UserPreviewCard = ({
  name,
  username,
  bio = "",
  followers = 0,
  avatar,
}: UserPreviewCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-50 w-64 bg-card text-card-foreground rounded-xl shadow-lg border border-border p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={
            avatar ||
            "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-5yzs7mlv.png"
          }
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-muted-foreground text-xs">@{username}</div>
        </div>
      </div>

      {bio && <p className="text-sm mb-2">{bio}</p>}

      <p className="text-muted-foreground text-sm mb-3">
        {followers} {t("common.followers")}
      </p>

      <Button className="w-full bg-foreground text-background font-semibold rounded-lg hover:opacity-90 transition">
        {t("common", "follow")}
      </Button>
    </motion.div>
  );
};
