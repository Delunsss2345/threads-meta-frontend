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
    <main className="main-container w-full h-full mx-auto text-foreground">
      <HeaderMobile />
      <div className="mt-[50px] sm:mt-0 grid grid-flow-col h-full justify-center items-start gap-5 dynamic-columns">
        <div className="column">
          <Header />
          <div className="column-container h-full  relative z-0 pt-6 flex-1 shadow bg-primary-foreground border-l border-r border-b overflow-hidden">
            {children}
          </div>
        </div>

        {/* <div className=" column">
          <Header />
          <div className="column-container h-full relative z-0 pt-6 flex-1 shadow bg-primary-foreground border-l border-r border-b overflow-hidden">
            {children}
          </div>
        </div> */}

        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
