export type PromiseHandlers = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};
export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};
