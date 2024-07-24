import { toast } from "react-hot-toast";

export const notify = (message: string) => {
  toast(message, {
    // position: "top-right",
    duration: 5000,
  });
};
