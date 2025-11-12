import ActivityList from "@/components/Activity/ActivityList";
import type { Activity } from "@/components/Activity/types";

export const mockActivities: Activity[] = [
  {
    id: "1",
    username: "bisnhe",
    displayName: "bisnhe",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content:
      "Hôm nay em có đi xe trên đoạn chợ ở chỗ Đức Diễn, Hà Nội thì có bạn này đi wave biển 19 phóng nhanh vã có va chạm với xe em. Xe em vỡ hết phần khung xe dưới, bạn thì không sao. Em có liên lạc với bạn BẰNG VĂN NGUYỄN này qua zal...",
    timeAgo: "2 giờ",
    type: "thread",
    likes: 28,
    comments: 13,
    reposts: 1,
    views: 1,
  },
  {
    id: "2",
    username: "linnybui09",
    displayName: "linnybui09",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    content:
      "tao mới bị con này scam tiền áo cardigan chúng mày ơi cái này viral dùm t cái",
    timeAgo: "10 giờ",
    type: "thread",
    likes: 1100,
    comments: 93,
    reposts: 25,
    views: 10,
  },

  {
    id: "4",
    username: "hanuy_",
    displayName: "hanuy_",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    content: "E cần tìm xe có biển số này ạ , e đưa nhầm bọc hàng cho chú ạ",
    timeAgo: "1 ngày",
    type: "thread",
    likes: 0,
    comments: 1,
    reposts: 0,
    views: 0,
  },
  {
    id: "5",
    username: "dknguyn20",
    displayName: "dknguyn20",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    content: "Về được 1 thằng má như quỷ z á",
    timeAgo: "2 ngày",
    type: "thread",
    likes: 2,
    comments: 3,
    reposts: 0,
    views: 1,
  },
  {
    id: "6",
    username: "nnthuytiens",
    displayName: "nnthuytiens",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    content: "Động đất à nhà bé g7",
    timeAgo: "2 ngày",
    type: "thread",
    likes: 8,
    comments: 0,
    reposts: 0,
    views: 0,
  },
  {
    id: "7",
    username: "h05g.dwghz_",
    displayName: "h05g.dwghz_",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    content: "Tao là người đầu tiên like bài này",
    timeAgo: "3 ngày",
    type: "thread",
    likes: 0,
    comments: 0,
    reposts: 0,
    views: 0,
  },
];
export default function ActivityPage() {
  return (
    <div className="h-full min-h-screen bg-primary-foreground">
      <ActivityList activities={mockActivities} />
    </div>
  );
}
