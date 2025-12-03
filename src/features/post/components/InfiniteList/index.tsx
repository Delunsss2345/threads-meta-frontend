import { Virtuoso } from "react-virtuoso";

interface InfiniteListProps<T> {
  data: T[];
  endReached: () => void;
  itemContent: (index: number, item: T) => React.ReactNode;
  continuePage: boolean;
  FooterComponent?: React.ReactNode;
  skeleton?: React.ReactNode;
  useWindowScroll?: boolean;
  contentNotFoundItem?: string;
  contentNotFoundCheck?: boolean;
}

const InfiniteList = <T,>({
  data,
  endReached,
  itemContent,
  continuePage,
  FooterComponent,
  skeleton,
  useWindowScroll = true,
  contentNotFoundItem = "Không còn dữ liệu",
  contentNotFoundCheck = true,
}: InfiniteListProps<T>) => (
  <Virtuoso
    useWindowScroll={useWindowScroll}
    data={data}
    endReached={endReached}
    itemContent={itemContent}
    followOutput={false}
    components={{
      Footer: () =>
        !continuePage
          ? FooterComponent ||
            (contentNotFoundCheck ? (
              <div className="text-center py-4 text-muted-foreground">
                {contentNotFoundItem}
              </div>
            ) : (
              " "
            ))
          : skeleton || <div>Loading…</div>,
    }}
  />
);

export default InfiniteList;
