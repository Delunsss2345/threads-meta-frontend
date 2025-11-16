import useWindow from "@/hooks/use-windown";
import { useTranslation } from "react-i18next";
import { QRCodeSvg } from "../QRCodeSVG";
import { Zoom } from "../Zoom";

function QRCodeSection() {
  const { isMobile } = useWindow();
  const { t } = useTranslation();
  return isMobile ? null : (
    <div className="fixed right-2 bottom-2 lg:right-10 lg:bottom-10 flex flex-col justify-center items-center gap-5 z-50 scale-75 lg:scale-100">
      <span className="text-[#777777] text-[13px] tracking-wide">
        {t("qr.scanToDownload")}
      </span>
      <div className="hover:scale-105 flex items-center justify-center transform active:scale-95 transition-transform select-none">
        <Zoom>
          <QRCodeSvg className="w-[175px] flex items-center justify-center h-[175px] cursor-pointer border border-[#393939] rounded-2xl bg-[#181818]" />
        </Zoom>
      </div>
    </div>
  );
}
export default QRCodeSection;
