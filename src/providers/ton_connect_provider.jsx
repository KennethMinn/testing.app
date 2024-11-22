import { TonConnectUIProvider } from "@tonconnect/ui-react";

const TonConnectProvider = ({ children }) => {
  return (
    <TonConnectUIProvider manifestUrl="https://test-youtube.s3.amazonaws.com/manifest.json">
      {children}
    </TonConnectUIProvider>
  );
};

export default TonConnectProvider;
