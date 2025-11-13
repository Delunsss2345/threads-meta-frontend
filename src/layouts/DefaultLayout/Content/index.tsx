import LoginCard from "@/components/LoginPanel";
import type { RootState } from "@/types/redux.type";
import { useSelector } from "react-redux";
import Header from "../Header";
import HeaderMobile from "../HeaderMobile";
import "./index.css";
interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const isAuth =
    Boolean(useSelector((state: RootState) => console.log(state.auth))) !==
    null;
  return (
    <main className="w-full h-full min-h-screen mx-auto main-container text-foreground">
      <HeaderMobile />
      <div className="mt-[50px] sm:mt-0 grid grid-flow-col h-full justify-center items-start gap-5 dynamic-columns">
        <div className="column">
          <Header />
          <div className="relative z-2 flex-1 h-full min-h-screen pt-6 overflow-hidden border-b border-l border-r shadow column-container bg-primary-foreground">
            {children}
          </div>
        </div>
        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
