import { useState } from "react";
import Image from "../../../components/ui/image";
import Modal from "../../../components/ui/modal";
import {
  formatStringWithEndEllipsis,
  formatStringWithMiddleEllipsis,
} from "../../../utils";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/use_auth";

const Payment = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const address = "0x1234ABCD5678EF901234ABCD5678EF901234ABCD";

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("copied to clipboard!");
    });
  };

  return (
    <>
      <Modal
        title="Buy M coins"
        isOpen={isOpen}
        className="flex flex-col items-center w-full gap-y-3"
        onClose={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center w-full gap-y-1">
          <p className=" text-label-xl">Buy M Coins to keep playing and</p>
          <p className=" text-success text-label-xl">unlock more chances.</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Image src="/new_design/icons/usdt_coin.webp" className=" h-[20px]" />
          <p>1</p>
          <p>=</p>
          <Image src="/new_design/icons/usdt_coin.webp" className=" h-[20px]" />
          <p>0.01</p>
        </div>
        <button className="tertiary_bg h-[55px] w-full flex items-center justify-between px-3">
          <div className="flex flex-col items-start gap-y-1">
            <p className="uppercase text-label text-label-lg">wallet address</p>
            <p className=" text-secondary">
              {formatStringWithMiddleEllipsis(address, 6, 6)}
            </p>
          </div>
          <button onClick={() => copyText(address)}>
            <Image
              src="/new_design/icons/copy_referral_icon.webp"
              className="h-[25px]"
            />
          </button>
        </button>
        <button className="tertiary_bg h-[55px] w-full flex items-center justify-between px-3">
          <div className="flex flex-col items-start gap-y-1">
            <p className="uppercase text-label text-label-lg">USER CODE</p>
            <p className=" text-secondary">
              {formatStringWithEndEllipsis(address, 2, 4)}
            </p>
          </div>
          <button onClick={() => copyText(user.code)}>
            <Image
              src="/new_design/icons/copy_referral_icon.webp"
              className="h-[25px]"
            />
          </button>
        </button>
      </Modal>
      <button className="tertiary_bg h-[55px]" onClick={() => setIsOpen(true)}>
        <div className="flex items-center h-full px-3 gap-x-4 text-secondary">
          <Image src="/new_design/icons/shop.webp" className=" h-[30px]" />
          <p className="uppercase text-secondary text-label-xl">
            Buy more usdt
          </p>
        </div>
      </button>
    </>
  );
};

export default Payment;
