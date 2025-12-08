import { CommentIconThreads } from "@/components/common/Icon/CommentIconThreads";
import { RepostIconThreads } from "@/components/common/Icon/RepostIconThreads";
import { TymIconThreads } from "@/components/common/Icon/TymIconThreads";
import i18n from "@/i18n";
import { Send } from "lucide-react";

export const PAGE_TITLES_BY_PATH: Record<string, string> = {
  "/": "home",
  "/search": "search",
  "/favorites": "favorites",
  "/ghost_posts" : "ghost_posts",
  "/profile": "profile",
  "/profile/replies": "profile",
  "/profile/media": "profile",
  "/profile/reposts": "profile",
  "/following": "following",
  "/activity": "activity",
  "/settings": "settings",
  "/settings/help": "help",
  "/settings/privacy": "privacy",
  "/settings/account": "account",
  "/settings/account_status": "account_status",
};

export const PAGE_CHILDREN_BY_PATH: Record<string, string> = {
  "/settings/help": "/settings",
  "/settings/privacy": "/settings",
  "/settings/account": "/settings",
  "/settings/account_status": "/settings",
};

export const NAV_LINKS = [
  "/",
  "/search",
  "/favorites",
  "/profile",
  "/activity",
];

export type ActionKey = "like" | "reply" | "repost" | "share";
type InteractionType = Record<
  ActionKey,
  {
    title: string;
    description: string;
    buttonText: string;
    Icon: any;
    iconGradient: string;
  }
>;

export const getInteractionAuthConfig = (): InteractionType => ({
  like: {
    title: i18n.t("authModal.signUpToLike"),
    description: i18n.t("authModal.signUpToLikeDesc"),
    buttonText: i18n.t("auth.continueWithInstagram"),
    Icon: TymIconThreads,
    iconGradient: "from-pink-500 via-red-500 to-yellow-400",
  },

  reply: {
    title: i18n.t("authModal.signUpToReply"),
    description: i18n.t("authModal.signUpToReplyDesc"),
    buttonText: i18n.t("auth.continueWithInstagram"),
    Icon: CommentIconThreads,
    iconGradient: "from-blue-500 via-sky-400 to-cyan-300",
  },

  repost: {
    title: i18n.t("authModal.signUpToRepost"),
    description: i18n.t("authModal.signUpToRepostDesc"),
    buttonText: i18n.t("auth.continueWithInstagram"),
    Icon: RepostIconThreads,
    iconGradient: "from-green-500 via-lime-400 to-yellow-300",
  },

  share: {
    title: i18n.t("authModal.signUpToShare"),
    description: i18n.t("authModal.signUpToShareDesc"),
    buttonText: i18n.t("auth.continueWithInstagram"),
    Icon: Send,
    iconGradient: "from-purple-500 via-fuchsia-500 to-pink-400",
  },
});

// For backward compatibility
export const INTERACTION_AUTH_CONFIG = getInteractionAuthConfig();
