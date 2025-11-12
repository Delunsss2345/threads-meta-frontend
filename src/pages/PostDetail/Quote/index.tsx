interface QuoteCardProps {
  title: string;
  content: string;
}

const QuoteCard = ({ title, content }: QuoteCardProps) => (
  <div className="p-8 mb-4 text-center text-white ">
    <h2 className="mb-6 text-xl font-medium">{title}</h2>
    <p className="text-lg leading-relaxed">{content}</p>
  </div>
);

export default QuoteCard;
