import ModalPopup from "@/components/common/ModalPopup";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Post from "..";
import type { MappedPost } from "../type";

const ModalEmbedCode = ({
  post,
  onClose,
}: {
  post: MappedPost;
  onClose: () => void;
}) => {
  const permalink = `${window.location.origin}/post/${post.id}`;

  const embedCode = `
<blockquote class="text-post-media"
  data-text-post-permalink="${permalink}"
  data-text-post-version="0"
  style="background:#FFF;border:1px solid #00000026;border-radius:16px;max-width:650px;margin:1px;min-width:270px;padding:0;width:calc(100% - 2px);">
  <a href="${permalink}" target="_blank"
    style="background:#FFFFFF;line-height:0;padding:0;text-align:center;text-decoration:none;width:100%;font-family:-apple-system, BlinkMacSystemFont, sans-serif;">
    <div style="padding:40px;display:flex;flex-direction:column;align-items:center;">
      <div style="display:block;height:32px;width:32px;padding-bottom:20px;">
        <svg aria-label="Threads" height="32px" width="32px" viewBox="0 0 192 192">
          <path d="M141.537 88.9883.... FULL SVG ..." />
        </svg>
      </div>
      <div style="font-size:15px;line-height:21px;color:#000;font-weight:600;">Xem bài viết</div>
    </div>
  </a>
</blockquote>
<script async src="https://www.threads.com/embed.js"></script>
`.trim();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ModalPopup onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Embed bài viết</h2>
        <div className="rounded-xl overflow-hidden border bg-primary-foreground p-10">
          <Post post={post} mode="static" />
        </div>
        <div className="flex items-center justify-between w-full p-3 bg-muted rounded-xl">
          <div
            className="text-sm font-mono text-foreground whitespace-nowrap overflow-x-auto overflow-y-hidden"
            style={{ maxWidth: "calc(100% - 110px)" }}
          >
            {`<blockquote class="text-post-media" data-text-post-permalink="${permalink}" ... >`}
          </div>

          <button
            onClick={handleCopy}
            className="ml-3 px-4 py-1.5 text-sm font-semibold bg-black text-white rounded-lg hover:bg-black/90 transition"
          >
            {copied ? "Đã sao chép!" : "Sao chép"}
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </ModalPopup>
  );
};

export default ModalEmbedCode;
