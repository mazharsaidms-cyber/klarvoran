export type ActionState = {
  status: "idle" | "success" | "dev-success" | "error" | "rate-limited";
  message: string;
  fieldErrors?: Record<string, string>;
  delivered?: boolean;
};

export const initialActionState: ActionState = {
  status: "idle",
  message: "",
};
