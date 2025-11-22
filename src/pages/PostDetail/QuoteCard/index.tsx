import SwiperImage from "@/components/SwiperImage";

interface QuoteCardProps {
  content: string;
  media_urls?: string[];
}

const QuoteCard = ({ content, media_urls }: QuoteCardProps) => (
  <div className="text-primary-foreground">
    {content && (
      <p className="text-foreground text-sm leading-relaxed">{content}</p>
    )}
    {media_urls && media_urls?.length > 0 && (
      <SwiperImage images={media_urls} className="mt-3" />
    )}
  </div>
);

export default QuoteCard;
