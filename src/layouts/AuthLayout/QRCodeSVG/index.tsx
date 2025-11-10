import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

export function QRCodeSvg({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const qr = new QRCodeStyling({
      width: 150,
      height: 150,
      type: "svg",
      data: "https://web.facebook.com/LilChawley",
      margin: 0,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions: { color: "rgb(243,245,247)", type: "rounded" },
      backgroundOptions: { color: "rgb(24,24,24)" },
      cornersSquareOptions: {
        color: "rgb(243,245,247)",
        type: "extra-rounded",
      },
      cornersDotOptions: { color: "rgb(243,245,247)", type: "dot" },
    });

    qr.append(ref.current);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={ref} className={className}></div>;
}
