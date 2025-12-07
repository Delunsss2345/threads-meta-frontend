import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import UserAction from "@/features/user/components/UserAction";
import type { User } from "@/types/user";
import type { Dispatch, SetStateAction } from "react";
import Post from "..";
import type { MappedPost } from "../type";

interface PostContentModalProps {
  title: string;
  post: MappedPost;
  user: User;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  loading: boolean;
  loadingLabel: string;
  submitLabel: string;
  addToThreadText: string;
  onClose: () => void;
  mode: "quote" | "reply";
}

const PostContentModal = ({
  title,
  post,
  user,
  content,
  setContent,
  onSubmit,
  loading,
  loadingLabel,
  submitLabel,
  addToThreadText,
  onClose,
  mode = "reply",
}: PostContentModalProps) => {
  return (
    <Card className="p-0 gap-0" onClick={(e) => e.stopPropagation()}>
      <Header headerText={title} onClose={onClose} />

      <CardContent className="p-4 pt-5">
        {mode !== "quote" && <Post post={post} mode="reply" />}

        <div className="flex gap-3 mt-5">
          <div className="flex flex-col items-center">
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src={user.avatar_url || undefined} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="w-[2px] flex-1 bg-border my-2 rounded-full" />

            <Avatar className="w-5 h-5 opacity-50">
              <AvatarImage src={user.avatar_url || undefined} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-4 pt-1">
            <UserAction
              username={user.username}
              onChangeContent={(data: { content: string }) =>
                setContent(data.content)
              }
            />

            {mode === "quote" && (
              <div className="border p-2 rounded-xl">
                <Post post={post} mode="reply" />
              </div>
            )}

            <div className="text-muted-foreground/50 text-sm pt-3">
              {addToThreadText}
            </div>
          </div>
        </div>
      </CardContent>

      <Footer
        loading={loading}
        loadingLabel={loadingLabel}
        label={submitLabel}
        content={content}
        onSubmit={onSubmit}
      />
    </Card>
  );
};

export default PostContentModal;
