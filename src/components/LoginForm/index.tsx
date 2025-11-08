// src/components/login/LoginForm.tsx
import { InputItem } from "@/components/InputItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(username, password);
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

      <InputItem
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Mật khẩu"
      />

      <Button
        type="submit"
        className="w-90 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl font-semibold"
      >
        Đăng nhập
      </Button>

      <button
        type="button"
        className="w-90 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4 block text-center"
      >
        Quên mật khẩu?
      </button>
    </form>
  );
};
