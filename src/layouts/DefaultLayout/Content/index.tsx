import LoginCard from "@/components/LoginPanel";
import Header from "../Header";


interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const isAuth = false;
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div
        className={`flex ${
          !isAuth ? "max-w-5xl" : "max-w-3xl"
        } gap-4 mx-auto items-start mt-4`}
      >
        <div className="flex-1 shadow border p-2 rounded-2xl">{children}</div>
        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
