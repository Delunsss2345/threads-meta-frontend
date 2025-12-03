import { useRef } from "react";

export const usePreventDrag = () => {
  const postRef = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: MouseEvent) => {
    postRef.current = { x: e.clientX, y: e.clientY };
  };

  const onClickDrag = (callBack: () => void) => (e: MouseEvent) => {
    const dx = Math.abs(e.clientX - postRef.current.x);
    const dy = Math.abs(e.clientY - postRef.current.y);
    if (dx < 4 && dy < 4) {
      callBack();
    }
  };

  return { onMouseDown, onClickDrag };
};

