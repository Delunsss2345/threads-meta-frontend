import { Check, Edit, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const CardStepupProfile = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: "follow",
      icon: <Users className="w-6 h-6 text-white" />,
      title: t("profileSetup.follow10Profiles"),
      desc: t("profileSetup.follow10ProfilesDesc"),
    },
    {
      id: "story",
      icon: <Edit className="w-6 h-6 text-white" />,
      title: t("profileSetup.addBio"),
      desc: t("profileSetup.addBioDesc"),
    },
    {
      id: "createThread",
      icon: <Check className="w-6 h-6 text-white" />,
      title: t("profileSetup.createThread"),
      desc: t("profileSetup.createThreadDesc"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-card border border-border rounded-2xl text-center p-5"
        >
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            {card.icon}
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">
            {card.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">{card.desc}</p>
          <button
          // onClick={card.onClick}
          // className={`w-full py-2 rounded-lg transition ${
          //   card.completed
          //     ? "border border-gray-700 bg-transparent text-white hover:bg-gray-800"
          //     : "bg-white text-black hover:bg-gray-200"
          // }`}
          >
            {/* {card.buttonLabel} */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardStepupProfile;
