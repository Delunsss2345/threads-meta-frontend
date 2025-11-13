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
    <main className="w-full h-full mx-auto text-foreground">
      <HeaderMobile />
      <div className="pl-[100px] dynamic-columns mt-[50px] h-full sm:mt-0 flex items-start gap-5 ">
        <div className="column">
          <Header />
          <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
            {children}
          </div>
        </div>
        <div className="column">
          <Header />
          <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
            {children}
          </div>
        </div>
        <div className="column">
          <Header />
          <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
            {children}
          </div>
        </div>
        <div className="column">
          <Header />
          <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
            {children}
          </div>
        </div>
        <div className="column">
          <Header />
          <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
            {children}
          </div>
        </div>
        <div className="column">
          <Header />
          <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
            {children}
          </div>
        </div>
        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
