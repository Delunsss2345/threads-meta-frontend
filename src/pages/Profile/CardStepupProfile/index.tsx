import { Button } from "@/components/ui/button"; // nhớ import đúng
import { Check, Edit, Image, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
const CardStepupProfile = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: "follow",
      icon: <Users className="w-6 h-6 text-white" />,
      title: t("profileSetup.follow10Profiles"),
      desc: t("profileSetup.follow10ProfilesDesc"),
      buttonClick: t("profileSetup.button.follow"),
    },
    {
      id: "story",
      icon: <Edit className="w-6 h-6 text-white" />,
      title: t("profileSetup.addBio"),
      desc: t("profileSetup.addBioDesc"),
      buttonClick: t("profileSetup.button.addBio"),
    },
    {
      id: "createThread",
      icon: <Check className="w-6 h-6 text-white" />,
      title: t("profileSetup.createThread"),
      desc: t("profileSetup.createThreadDesc"),
      buttonClick: t("profileSetup.button.postThread"),
    },
    {
      id: "addAvatar",
      icon: <Image className="w-6 h-6 text-white" />,
      title: t("profileSetup.addAvatar"),
      desc: t("profileSetup.addAvatarDesc"),
      buttonClick: t("profileSetup.button.uploadAvatar"),
    },
  ];
  return (
    <div className="mt-6">
      <Swiper
        spaceBetween={8}
        slidesPerView={1.1}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="relative p-5 pb-10 text-center border select-none bg-card border-border rounded-2xl cursor-grab">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-accent">
                {card.icon}
              </div>
              <h3 className="mb-1 text-base font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mb-4 text-[12px] text-muted-foreground">
                {card.desc}
              </p>
            </div>
            <Button className="absolute text-white -translate-x-1/2 bottom-3 left-1/2 bg-accent-foreground">
              {card.buttonClick}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardStepupProfile;
