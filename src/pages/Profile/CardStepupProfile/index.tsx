import { Button } from "@/components/ui/button";
import { Check, Edit, Image, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const CardStepupProfile = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: "follow",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      title: t("profileSetup.follow10Profiles"),
      desc: t("profileSetup.follow10ProfilesDesc"),
      buttonClick: t("profileSetup.button.follow"),
    },
    {
      id: "story",
      icon: <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      title: t("profileSetup.addBio"),
      desc: t("profileSetup.addBioDesc"),
      buttonClick: t("profileSetup.button.addBio"),
    },
    {
      id: "createThread",
      icon: <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      title: t("profileSetup.createThread"),
      desc: t("profileSetup.createThreadDesc"),
      buttonClick: t("profileSetup.button.postThread"),
    },
    {
      id: "addAvatar",
      icon: <Image className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      title: t("profileSetup.addAvatar"),
      desc: t("profileSetup.addAvatarDesc"),
      buttonClick: t("profileSetup.button.uploadAvatar"),
    },
  ];

  return (
    <div>
      <Swiper
        style={{ padding: 10 }}
        spaceBetween={10}
        grabCursor
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1.2 },
          640: { slidesPerView: 1.4 },
          1024: { slidesPerView: 2.2 },
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className="h-fit relative pt-4 px-4 sm:p-5 pb-4 lg:pb-10 text-center border bg-card border-border rounded-2xl cursor-grab select-none">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-full bg-accent">
                {card.icon}
              </div>

              <h3 className="mb-1 text-sm sm:text-base font-semibold text-foreground">
                {card.title}
              </h3>

              <p className="mb-4 sm:text-[13px] text-muted-foreground leading-tight">
                {card.desc}
              </p>

              <Button className="absolute text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 text-white -bottom-2 left-1/2  -translate-x-1/2 bg-primary z-10">
                {card.buttonClick}
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardStepupProfile;
