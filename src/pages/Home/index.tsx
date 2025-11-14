import FeedTabs from "@/components/FeedTabs";
import AddColumnIcon from "@/components/Icon/AddColIcon";
import Post from "@/components/Post";
import PostForm from "@/components/Post/PostForm";
import MenuAddContent from "@/pages/Home/MenuAddContent";
import iivCognAvatar from "public/images/Avatariiv_cogn.jpg";
import iivCogn1 from "public/images/iiv_cogn1.jpg";
import iivCogn2 from "public/images/iiv_cogn2.jpg";
import iivCogn3 from "public/images/iiv_cogn3.jpg";
import avatar from "public/images/test1.jpg";
import test5 from "public/images/ts5.jpg";
import tes6 from "public/images/ts6.jpg";
import tes7 from "public/images/ts7.jpg";
import tes8 from "public/images/ts8.jpg";
import tes9 from "public/images/ts9.jpg";

const Home = () => {
  return (
    <>
      <div className="hidden md:block">
        <PostForm />
      </div>
      <div className="block md:hidden">
        <FeedTabs />
      </div>
      <Post
        username="haphuong.135"
        time="19 giờ trước"
        content="Màu đỏ chứng tỏ chưa chồng"
        avatar={avatar}
        like={211}
        message={43}
        repost={17}
        share={5}
        images={[tes9, tes7]}
      />
      <Post
        username="iiv_cogn"
        time="20 giờ trước"
        content="Như này đúng gu a ch?"
        avatar={iivCognAvatar}
        like={89}
        message={12}
        repost={8}
        share={3}
        images={[iivCogn1, iivCogn2, iivCogn3]}
      />
      <Post
        username="caimewgivay._"
        time="18 giờ trước"
        content="Xinh nhất thế giới"
        avatar="https://i.pravatar.cc/150?img=33"
        like={512}
        message={77}
        repost={35}
        share={14}
        images={[tes8, tes6, test5]}
      />

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
  );
};

export default Home;

//  {Array.from({ length: 10 }).map((_, index) => (
//         <SkeletonPost key={index} />
//       ))}
// {
