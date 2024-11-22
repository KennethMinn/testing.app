import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TelegramProvider from "./providers/telegram_provider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { Toaster } from "react-hot-toast";
import TonConnectProvider from "./providers/ton_connect_provider.jsx";
import MusicProvider from "./providers/music_provider.jsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./languages/translate.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SDKProvider acceptCustomStyles debug>
        <TelegramProvider>
          <TonConnectProvider>
            <I18nextProvider i18n={i18n}>
              <App />
              <Toaster
                toastOptions={{
                  success: {
                    icon: <img src="/copied.svg" />,
                  },
                  error: {
                    icon: "❌",
                  },
                  // icon: <img src="/copied.svg" />,
                  style: {
                    backgroundColor: "#060d21",
                    color: "#23f2ff",
                    borderRadius: "5px",
                  },
                }}
              />
            </I18nextProvider>
            <MusicProvider></MusicProvider>
          </TonConnectProvider>
        </TelegramProvider>
      </SDKProvider>
    </QueryClientProvider>
  </StrictMode>
);
