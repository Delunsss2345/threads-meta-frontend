import { useRef, useState, type ChangeEvent } from "react";

export const useAction = () => {
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<File[] | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPreviewImage(Array.from(files));
    }
  };

  return {
    content,
    setContent,
    previewImage,
    handleInput,
    inputRef,
    showEmoji,
    setShowEmoji,
  };
};
