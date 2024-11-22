import ConnectWallet from "./connect_wallet";
import Transfer from "./transfer";
import Audio from "./audio";
import Language from "./language";
import Payment from "./payment";

const AccountWallet = () => {
  return (
    <div className="px-4">
      <div className="relative ">
        <div className="bg-secondary w-[140px] flex items-center justify-center rounded-t-[10px] h-[35px] absolute top-[-30px] left-[20px] uppercase whitespace-nowrap text-label-lg">
          Account & Wallet
        </div>
        <div className=" bg-secondary border-[3px] border-secondary-border w-full py-5 rounded-[8px] px-4 flex flex-col gap-y-4">
          <ConnectWallet />
          <Payment />
          <Transfer />
          <div className=" h-[1px] bg-secondary-border w-full" />
          <Audio />
          <div className=" h-[1px] bg-secondary-border w-full" />
          <Language />
        </div>
      </div>
    </div>
  );
};

export default AccountWallet;
