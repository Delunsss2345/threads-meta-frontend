import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function PostForm() {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (!content.trim()) return;
    console.log("New post:", content);
    setContent("");
  };

  return (
    <Card className="mt-4 border-0 transition-colors cursor-pointer shadow-none px-4 py-0 rounded-l-3xl">
      <CardContent className="flex items-start p-0">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/avatar.png" alt="user" />
          <AvatarFallback>H</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Có gì mới?"
            className="placeholder:align-middle h-auto !bg-transparent px-2 text-foreground-100 border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            rows={1}
          />
        </div>

        <Button
          onClick={handlePost}
          className="border-foreground border dark:bg-foreground !bg-white text-foreground cursor-pointer"
        >
          Đăng
        </Button>
      </CardContent>
    </Card>
  );
}
