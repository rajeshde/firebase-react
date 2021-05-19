import { toast } from "react-toastify";

const showToastMessage = (message, type) => {
  if (typeof message !== "string") {
    return;
  }
  switch (type) {
    case "warn":
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
  }
};

export default showToastMessage;
