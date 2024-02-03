import { Bounce, toast } from "react-toastify";

export function customToast(
  type = "default",
  message,
  timer = 3000,
  hideProgressBar = true
) {
  return toast(message, {
    position: "top-right",
    autoClose: timer,
    hideProgressBar,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    transition: Bounce,
    type,
  });
}
