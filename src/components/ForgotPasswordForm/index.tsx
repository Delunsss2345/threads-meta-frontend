// src/components/login/LoginForm.tsx
import { InputItem } from "@/components/InputItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ForgotPasswordProps {
  onForgotPassword?: (username: string) => void;
}

export const ForgotPassword = ({ onForgotPassword }: ForgotPasswordProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 flex flex-col items-center"
    >
      <InputItem
        value={username}
        onChange={setUsername}
        placeholder="Tên người dùng, số điện thoại hoặc email"
      />

      <Button
        type="submit"
        className="w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
      >
        Send Login Link
      </Button>
    </form>
  );
};
