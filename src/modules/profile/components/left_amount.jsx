import { useState } from "react";
import Image from "../../../components/ui/image";
import Modal from "../../../components/ui/modal";
import CommonInput from "../../../components/ui/common_input";
import { formatNumber } from "../../../utils";
import { useGetPoints } from "../../../hooks/use_data";
import { useLimitCreditScore } from "../hooks/use_data";
import toast from "react-hot-toast";

const LeftAmount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const { data: points, isLoading } = useGetPoints();
  const { mutate: limit, isPending } = useLimitCreditScore();

  const handleChange = (e) => {
    if (e.target.valueAsNumber < 0) return;
    setAmount(e.target.valueAsNumber);
  };

  const onSave = () => {
    if (amount < 1) return;
    limit(
      {
        limit: amount.toString(),
      },
      {
        onSuccess: () => {
          setAmount(0);
          setIsOpen(false);
          toast.success("Saved successfully");
        },
      }
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="z-[9999] flex flex-col items-center gap-y-3"
        title="keep in account"
      >
        <p className="text-center text-label-lg">
          Enter the amount you’d like to{" "}
          <span className=" text-label-lg text-success">
            save in your account
          </span>{" "}
          for upcoming reward transaction.
        </p>
        <div className="relative w-full">
          <Image
            src="/new_design/icons/usdt_coin.webp"
            className="h-[17px] absolute top-[38px] left-[8px]"
          />
          <CommonInput
            label="Amount"
            placeholder="Enter Amount"
            type="number"
            value={amount}
            onChange={handleChange}
            className="w-full ps-7"
          />
          <p className="mt-2 uppercase text-label-md">
            your balance:{" "}
            <span className=" text-legend text-label-md">
              {isLoading ? "..." : formatNumber(Number(points?.credit_score))}
            </span>
          </p>
        </div>
        <p
          className="underline uppercase text-airdrop"
          onClick={() => setAmount(0)}
        >
          reset balance
        </p>
        <button
          disabled={isPending}
          className={`tertiary_bg h-[55px] text-secondary text-heading-md mt-2 w-full ${
            isPending && "opacity-60"
          }`}
          onClick={onSave}
        >
          Save
        </button>
        <p className=" text-label-lg">
          Any extra will be airdropped to your wallet.
        </p>
      </Modal>
      <div className="flex flex-col items-end gap-y-1">
        <p className="uppercase opacity-60 text-label-lg">MIN BALANCE:</p>
        <p
          className="underline uppercase underline-offset-4 text-legend text-label-xl"
          onClick={() => setIsOpen(true)}
        >
          {isLoading
            ? "..."
            : formatNumber(Number(points?.credit_score_airdrop_limit))}{" "}
          coins
        </p>
      </div>
    </>
  );
};

export default LeftAmount;
