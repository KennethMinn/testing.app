import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import Image from "../../../components/ui/image";
import { formatStringWithMiddleEllipsis } from "../../../utils";
import { t } from "i18next";

const ConnectWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const { open } = useTonConnectModal();

  return (
    <div className="tertiary_bg h-[55px]">
      {userFriendlyAddress ? (
        <div className="flex items-center justify-between h-full px-3">
          <div className="flex flex-col gap-y-1">
            <p className=" text-label-md text-label">wallet address</p>
            <p className=" text-secondary text-label-xl">
              {formatStringWithMiddleEllipsis(userFriendlyAddress, 6, 6)}
            </p>
          </div>
          <button
            className=" text-error"
            onClick={() => tonConnectUI.disconnect()}
          >
            {t('disconnect')}
          </button>
        </div>
      ) : (
        <button
          className="flex items-center h-full px-3 gap-x-4"
          onClick={() => open()}
        >
          <Image
            src="/new_design/icons/wallet_icon.webp"
            className=" h-[28px]"
          />
          <p className="uppercase text-secondary text-label-xl">
            {t('connect_wallet')}
          </p>
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
