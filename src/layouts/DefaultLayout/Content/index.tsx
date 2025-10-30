import Header from "../Header";

// Content Area Component
interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-2xl mx-auto  border-x border-gray-900 p-2 rounded-2xl">
        {children}
      </div>
    </main>
  );
};
export default Content;
