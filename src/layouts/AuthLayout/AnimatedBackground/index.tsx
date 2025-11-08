// src/components/login/AnimatedBackground.tsx
import loginLogo from "@/assets/images/logoLogin.png";

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none hidden sm:block">
      <img src={loginLogo} alt="Logo" />

      {/* <div className="animate-spin-slow-reverse absolute bottom-10 right-20 w-52 h-52">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            id="curve4"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />
          <text className="text-[14px] fill-white font-light tracking-[0.3em]">
            <textPath href="#curve4">
              THREADS THREADS THREADS THREADS
            </textPath>
          </text>
        </svg>
      </div> */}
    </div>
  );
};

// <style>{`
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes spin-slow-reverse {
//           from { transform: rotate(360deg); }
//           to { transform: rotate(0deg); }
//         }
//         .animate-spin-slow { animation: spin-slow 20s linear infinite; }
//         .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
//       `}</style>
