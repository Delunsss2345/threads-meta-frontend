import AddColumnIcon from "@/components/common/Icon/AddColIcon";
import { selectIsAuthenticated } from "@/features/auth";
import LoginCard from "@/features/auth/components/LoginPanel";
import MenuAddContent from "@/pages/Home/MenuAddContent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Column from "../Column";
import HeaderMobile from "../HeaderMobile";
interface ContentProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuthenticated);

  // const columns = useSelector(selectColumns);
  // const dispatch = useDispatch();
  // const sensors = useSensors(useSensor(PointerSensor));

  // const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
  //   if (!over) {
  //     return;
  //   }

  //   if (active.id == over.id) {
  //     return;
  //   }
  //   console.log(
  //     arrayMove(
  //       columns,
  //       columns.findIndex((it: ColumnType) => it.id == active.id),
  //       columns.findIndex((it: ColumnType) => it.id == over.id)
  //     )
  //   );
  //   const newColumns = arrayMove(
  //     columns,
  //     columns.findIndex((it: ColumnType) => it.id == active.id),
  //     columns.findIndex((it: ColumnType) => it.id == over.id)
  //   );
  //   // dispatch(columnsSlice.actions.addNewState(newColumns));
  // };

  return (
    <main className="w-full h-full mx-auto text-foreground">
      <HeaderMobile />
      <div className="md:pl-[100px] dynamic-columns  mt-[24px] md:mt-0 h-full flex items-start gap-5">
        <Column pathName={location.pathname}>{children}</Column>
        {!isAuth ? (
          <LoginCard />
        ) : (
          <div className="hidden relative md:block h-screen">
            <div className="absolute top-1/2">
              <div className="size-10 flex items-center justify-center p-2 rounded-full bg-[#ccc]/10 shadow-2xl">
                <MenuAddContent className="text-[#ccc] !hover:text-black transition-colors cursor-pointer">
                  <AddColumnIcon size={20} />
                </MenuAddContent>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Content;

//  {location.pathname === "/" && columns.length > 1 ? (
//           // <DndContext
//           //   sensors={sensors}
//           //   onDragEnd={(e) => {
//           //     handleDragEnd(e);
//           //   }}
//           // >
//           //   <SortableContext items={columns} strategy={rectSortingStrategy}>
//           // {
//           // columns.map((column: ColumnType) => {
//           //   return (
//           //     <Column pathName={column.pathName} key={column.id} id={column.id}>
//           //       {COMPONENTS_MAP[column.pathName]}
//           //     </Column>
//           //   );
//           // })
//         // ) : (
//           // }
//           //   </SortableContext>
//           // </DndContext>
//           <>
//           </>
//         )}
