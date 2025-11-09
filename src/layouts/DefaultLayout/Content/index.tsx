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
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <HeaderMobile />
      <div
        className={`flex ${
          !isAuth ? "max-w-5xl" : "max-w-2xl"
        } gap-4 mx-auto items-start mt-4`}
      >
        <div className="pt-4 flex-1 shadow bg-primary-foreground rounded-4xl mt-10 sm:mt-15 overflow-hidden">
          {children}
        </div>
        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
