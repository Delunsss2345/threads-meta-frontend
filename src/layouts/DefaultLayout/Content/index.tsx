import AddColumnIcon from "@/components/Icon/AddColIcon";
import LoginCard from "@/components/LoginPanel";
import Home from "@/pages/Home";
import type { RootState } from "@/types/redux.type";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Column from "../Column";
import HeaderMobile from "../HeaderMobile";
import MenuAddContent from "./MenuAddContent";
interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const location = useLocation();
  const isAuth =
    Boolean(useSelector((state: RootState) => console.log(state.auth))) !==
    null;

  const [columns, setColumns] = useState([
    { id: 1, pathName: "/", element: <Home /> },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over) {
      return;
    }

    if (active.id == over.id) {
      return;
    }

    setColumns((items) => {
      return arrayMove(
        items,
        items.findIndex((it) => it.id == active.id),
        items.findIndex((it) => it.id == over.id)
      );
    });
  };

  return (
    <main className="w-full h-full mx-auto text-foreground">
      <HeaderMobile />
      <div className="pl-[100px] dynamic-columns mt-[50px] h-full sm:mt-0 flex items-start gap-5 ">
        {location.pathname === "/" && columns.length > 1 ? (
          <DndContext
            sensors={sensors}
            onDragEnd={(e) => {
              handleDragEnd(e);
            }}
          >
            <SortableContext items={columns} strategy={rectSortingStrategy}>
              {columns.map((column) => (
                <Column
                  pathName={column.pathName}
                  key={column.id}
                  id={column.id}
                >
                  {column.element}
                </Column>
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          <>
            <Column>{children}</Column>
            <div className="fixed top-0 bottom-0 right-0 h-screen w-[460px]">
              <div className="absolute top-1/2">
                <div className="size-10 flex items-center justify-center p-2 rounded-full bg-[#ccc]/10 shadow-2xl">
                  <MenuAddContent className="text-[#ccc] !hover:text-black transition-colors cursor-pointer">
                    <AddColumnIcon size={20} />
                  </MenuAddContent>
                </div>
              </div>
            </div>
          </>
        )}
        {!isAuth ? <LoginCard /> : null}
      </div>
    </main>
  );
};
export default Content;
