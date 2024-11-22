import { useEffect, useState } from "react";
import { useCurrentProfile } from "../../modules/home/hooks/use_store";
import { useGetGameEntry } from "../../modules/race/hooks/use_data";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios/axios_instance";

//@kenneth_minn_bot - bot at
export const useTransactions = () => {
  const [tg, setTg] = useState(null);
  const { profile } = useCurrentProfile();
  const { data: gameEntry } = useGetGameEntry();

  const openInvoice = async (invoiceUrl) => {
    const status = await new Promise((resolve, reject) => {
      tg.openInvoice(invoiceUrl, (status) => {
        if (status) {
          resolve(status);
        } else {
          reject(new Error("Failed to get invoice status."));
        }
      });
    });
    return status;
  };

  useEffect(() => {
    // Check if the Telegram Web App is available
    if (window.Telegram && window.Telegram.WebApp) {
      const telegram = window.Telegram.WebApp;

      //telegram.expand(); // Optional: Expands the web app to full height
      setTg(telegram);
      console.log("Telegram Web App initialized successfully.");
    } else {
      console.error(
        "Telegram Web App is not available. Make sure you are running this inside the Telegram app."
      );
    }
  }, []);

  const handleEntry = async () => {
    try {
      const res = await axiosInstance.post("createStarInvoiceLink", {
        chat_id: "@hello_for_me_bot",
        title: "New Entry",
        description: "Get a new entry to participate in the app",
        payload: JSON.stringify({
          type: "new_entry",
          data: {
            game_profile_id: profile?.id,
            game_entry_id: gameEntry?.id,
          },
        }),
        provider_token: "", // Add the actual token if needed
        currency: "XTR",
        // photo_url: `${SERVER_URL}/app-icon.png`,
        prices: [
          {
            label: "New Entry",
            amount:
              Number(gameEntry?.discount) > 0
                ? Number(gameEntry?.entry_fee) *
                  (Number(gameEntry?.discount) / 100)
                : gameEntry?.entry_fee,
          },
        ],
      });

      const data = res.data;

      console.log(data);

      if (data.ok) {
        const invoiceUrl = data.result;
        console.log(Boolean(tg));
        if (tg) {
          const status = await openInvoice(invoiceUrl);
          if (status === "cancelled") {
            console.log(status);

            toast.error("Payment Cancelled");
          }
          if (status === "paid") {
            console.log(status);

            toast.success("Payment Successful");
          }
          console.log(status);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return { handleEntry };
};
