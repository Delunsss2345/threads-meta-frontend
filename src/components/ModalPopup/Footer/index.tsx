import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

const Footer = ({
  loading = false,
  onSubmit,
  content,
  loadingLabel,
  label = "Đăng bài",
}: {
  loading: boolean;
  onSubmit?: () => void;
  content?: string;
  loadingLabel?: string;
  label?: string;
}) => {
  return (
    <>
      <CardFooter className="flex items-center justify-between p-3">
        <button className="text-muted-foreground/60 hover:text-muted-foreground text-sm flex items-center gap-2 transition-colors">
          Các lựa chọn để kiểm soát câu trả lời
        </button>

        <Button
          disabled={loading}
          onClick={onSubmit}
          type="submit"
          className={`cursor-pointer rounded-full px-5 font-semibold disabled:opacity-30 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black`}
        >
          {loading ? loadingLabel : label}
        </Button>
      </CardFooter>
    </>
  );
};

export default Footer;
