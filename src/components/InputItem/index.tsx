import { Input } from "@/components/ui/input";

interface InputItemProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export const InputItem = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
}: InputItemProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-90
        bg-[#121212]
        border
        border-[#2e2e2e]
        text-white
        placeholder:text-gray-500
        h-12
        rounded-2xl
        px-4
        focus-visible:ring-1
        focus-visible:ring-gray-600
        focus-visible:border-gray-600
        transition
      "
    />
  );
};
