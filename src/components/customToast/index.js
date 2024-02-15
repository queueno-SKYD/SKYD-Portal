import { Bounce, toast } from "react-toastify";

let toastProps = {
  position: "top-right",
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Bounce,
  autoClose: 2000,
};

export const dangerToast = (message) => {
  return toast(message, {
    ...toastProps,
    type: "error",
  });
};
export const infoToast = (message) => {
  return toast(message, {
    ...toastProps,
    type: "info",
  });
};

export const successToast = (message) => {
  return toast(message, {
    ...toastProps,
    type: "success",
  });
};

export const warningToast = (message) => {
  return toast(message, {
    ...toastProps,
    type: "warning",
  });
};
