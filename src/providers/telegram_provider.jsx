import { useInitDataRaw } from "@telegram-apps/sdk-react";
import { useLoginWithTg } from "../hooks/use_login_with_telegram";
import { useEffect } from "react";

const TelegramProvider = ({ children }) => {
  const { mutate: login } = useLoginWithTg();
  const initDataRaw = useInitDataRaw();
  const user = initDataRaw.result.user;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      login({
        telegram_id: user.id.toString(),
        first_name: user.firstName,
        last_name: user.lastName,
        user_name: user.username,
      });
    }
  }, [accessToken]);

  // useEffect(() => {
  //   if (closingBehavior && isProduction) {
  //     closingBehavior.enableConfirmation();
  //   }
  // }, [closingBehavior]);

  // useEffect(() => {
  //   const handleScroll = (event) => {
  //     if (window.scrollY > 0) {
  //       event.preventDefault();
  //       window.scrollTo(0, 0);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return children;
};

export default TelegramProvider;
