import { useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent } from "../ui/card";
import NewPostCustom from "./NewPostCustom";

const FixedNewPostButton = () => {
  const [openModalNewPost, setOpenModalNewContent] = useState(false);
  const fixedCreate = document.getElementById("fixed-create-thread");
  if (!fixedCreate) return null;

  return createPortal(
    <>
      <Card
        onClick={() => setOpenModalNewContent(true)}
        className=" hidden lg:block fixed bg-primary-foreground right-5 bottom-5 height-[68px] width-[82px] z-[10] px-2 shadow-md cursor-pointer"
      >
        <CardContent className="flex items-center justify-center text-center">
          <svg
            aria-label="Tạo"
            role="img"
            viewBox="0 0 12 12"
            style={{ fill: "currentColor", height: "24px", width: "24px" }}
          >
            <title>Tạo</title>
            <path
              d="M6 2v8m4-4H2"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.5"
            ></path>
          </svg>
        </CardContent>
        {openModalNewPost && (
          <NewPostCustom onClose={() => setOpenModalNewContent(false)} />
        )}
      </Card>
    </>,
    fixedCreate
  );
};

export default FixedNewPostButton;
