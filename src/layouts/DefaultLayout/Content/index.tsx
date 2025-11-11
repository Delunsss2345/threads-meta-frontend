import LoginCard from "@/components/LoginPanel";
import type { RootState } from "@/types/redux.type";
import { useSelector } from "react-redux";
import Header from "../Header";
import HeaderMobile from "../HeaderMobile";

interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const isAuth =
    Boolean(useSelector((state: RootState) => console.log(state.auth))) !==
    null;
  return (
    <main className="w-[640px] h-full mx-auto text-foreground">
      <Header />
      <HeaderMobile />
      <div
        className={` flex ${
          !isAuth ? "max-w-5xl" : "w-[640px]"
        } gap-4 mx-auto items-start `}
      >
        <div className="relative z-0 pt-6 flex-1 shadow bg-primary-foreground border-l border-r border-b overflow-hidden ">
          {children}
        </div>
        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
