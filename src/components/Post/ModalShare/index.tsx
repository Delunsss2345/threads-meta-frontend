import ModalPopup from "@/components/ModalPopup";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { toPng } from "html-to-image";
import { ChevronDown } from "lucide-react";
import { useContext, useRef } from "react";
import InteractionBar from "../InteractionBar";
import { PostContext } from "../PostContext";
const ModalShare = ({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "huydz.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Lỗi khi export:", err);
    }
  };

  const ctxPost = useContext(PostContext);
  return (
    <ModalPopup onClose={onClose}>
      <div className="p-10 relative rounded-tl-xl rounded-tr-xl bg-[#f5f5f5]">
        <div
          ref={ref}
          className="relative p-6 rounded-2xl bg-primary-foreground"
        >
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={undefined} />
              <AvatarFallback>UB</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold">
              {ctxPost?.post.username}
            </span>
          </div>
          <div className="inline-block px-2 py-1 text-sm font-medium text-black rounded ">
            {ctxPost?.post.content}
          </div>

          <div className="mt-2 ">
            <InteractionBar mode="share" />
          </div>
          <div className="absolute right-4 bottom-4 size-6">
            <svg
              aria-label="Threads"
              fill="currentColor"
              height="100%"
              role="img"
              viewBox="0 0 192 192"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
            </svg>
          </div>
        </div>

        <div className="absolute flex items-center gap-3 bottom-2 left-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border-2 !border-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-black rounded-full "></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="flex items-center gap-2">
          <Checkbox
            className="!p-3 flex items-center border-0 justify-center rounded-full"
            defaultChecked
          />
          <label
            htmlFor="show-numbers"
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Hiển thị số liệu
          </label>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 !p-5 rounded-xl"
        >
          Tự động
          <ChevronDown />
        </Button>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="gap-2 rounded-xl"
          >
            <svg
              aria-label=""
              role="img"
              viewBox="0 0 21 21"
              className="size-[24px]"
            >
              <title></title>
              <path d="M10.285 13.272c-.205 0-.403-.073-.6-.271L7.237 10.65a.643.643 0 0 1-.213-.476c0-.381.308-.645.674-.645.19 0 .374.074.506.22l.952 1.01.454.565-.095-1.084V2.754a.764.764 0 0 1 1.53 0v7.486l-.095 1.084.454-.564.952-1.011a.672.672 0 0 1 .506-.22c.359 0 .674.264.674.645 0 .198-.08.344-.213.476L10.878 13c-.198.198-.396.271-.593.271Zm-4.248 4.673c-1.626 0-2.498-.864-2.498-2.483V8.35c0-1.619.872-2.483 2.498-2.483h1.955v1.677H6.19c-.637 0-.974.323-.974.99v6.752c0 .66.337.982.974.982h8.152c.63 0 .982-.323.982-.982V8.533c0-.666-.352-.989-.982-.989H12.57V5.867h1.926c1.633 0 2.498.864 2.498 2.483v7.112c0 1.619-.865 2.483-2.498 2.483h-8.46Z"></path>
            </svg>
          </Button>
          <Button size="sm" className="bg-black hover:bg-black/90">
            Sao chép
          </Button>
        </div>
      </div>
    </ModalPopup>
  );
};

export default ModalShare;
