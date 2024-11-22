import { useState } from "react";
import Image from "../../../components/ui/image";
import Modal from "../../../components/ui/modal";
import CommonInput from "../../../components/ui/common_input";
import { useGetPoints } from "../../../hooks/use_data";
import { formatNumber } from "../../../utils";
import {
  useResend,
  useTransferCreditScore,
  useVerify,
} from "../hooks/use_data";
import { useAuth } from "../../../hooks/use_auth";
import OtpInput from "../../../components/ui/otp_input";
import Countdown from "../components/countdown";
import toast from "react-hot-toast";

const Transfer = () => {
  const { user } = useAuth();
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [resetCountdown, setResetCountdown] = useState(false); // Control countdown reset
  const [isOpen, setIsOpen] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState(0);
  const [generatedId, setGeneratedId] = useState("");
  const { data: points, isLoading } = useGetPoints();
  const [verified, setVerified] = useState(false);
  const { mutate: transferCreditScore, isPending: isTransferring } =
    useTransferCreditScore();
  const { mutate: verify, isPending: isVerifying } = useVerify();
  const { mutate: resend, isPending: isResending } = useResend();

  const handleTimeout = () => {
    setIsCountdownFinished(true); // Countdown has finished
  };

  const handleResetCountdown = () => {
    setIsCountdownFinished(false); // Reset the flag
    setResetCountdown(true); // Trigger reset in Countdown component
    setTimeout(() => {
      onResend();
      setResetCountdown(false); // After reset, stop triggering reset
    }, 100); // Ensure reset is only triggered once
  };

  const onTransfer = () => {
    if (!code || amount < 1) return;
    transferCreditScore(
      {
        transfer_amount: amount.toString(),
      },
      {
        onSuccess: (data) => {
          setGeneratedId(data?.data?.generated_id);
          setAmount(0);
          setCode("");
          setIsOtp(true);
        },
      }
    );
  };

  const onResend = () => {
    resend(
      {
        generated_id: generatedId,
      },
      {
        onSuccess: (data) => {
          setGeneratedId(data?.data?.generated_id);
          toast.success("Resent code successfully");
        },
      }
    );
  };

  const handleOTPChange = (otp) => {
    if (otp.length > 5) {
      verify(
        {
          generated_id: generatedId,
          otp: otp,
        },
        {
          onSuccess: (data) => {
            if (data.status === 400) {
              toast.error(data.message);
            } else {
              setVerified(true);
              setGeneratedId("");
              setTimeout(() => {
                toast.success("transferred successfully");
                setIsOpen(false);
              }, 1000);
            }
          },
        }
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="p2p transfer"
        className="flex flex-col gap-y-3 "
      >
        {isOtp ? (
          <div className="flex flex-col items-center w-full gap-y-3">
            <p className="uppercase text-heading-md">otp</p>
            <div className="flex flex-col items-center gap-y-1">
              <p className="text-label-lg">
                A 6-digit code sent to Telegram user
              </p>
              <p className="text-label-lg text-success">{user.username}</p>
            </div>
            <OtpInput
              length={6}
              onChangeOTP={handleOTPChange}
              verified={verified}
            />
            <Countdown onTimeout={handleTimeout} reset={resetCountdown} />
            <p className=" opacity-60 text-label-xl">
              Didn&apos;t receive the OTP?
            </p>
            <p
              className="uppercase text-airdrop text-label-xl"
              onClick={() => {
                if (isCountdownFinished) {
                  handleResetCountdown();
                } else {
                  toast.error("please wait for the countdown to finish");
                }
              }}
            >
              Resend code
            </p>
            {/* <button
              disabled={!otp || isVerifying}
              className={`tertiary_bg h-[55px] w-full text-secondary text-heading-md mt-2 ${
                otp.length < 6 && "opacity-60"
              }`}
              onClick={() => {}}
            >
              Verify
            </button> */}
          </div>
        ) : (
          <>
            <CommonInput
              label="user Code"
              placeholder="Enter User Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full"
            />
            <div className="relative">
              <Image
                src="/new_design/icons/usdt_coin.webp"
                className="h-[17px] absolute top-[38px] left-[8px]"
              />
              <CommonInput
                label="Amount"
                placeholder="Enter Amount"
                type="number"
                value={amount}
                onChange={(e) => {
                  if (e.target.valueAsNumber < 0) return;
                  setAmount(e.target.valueAsNumber);
                }}
                className="w-full ps-7"
              />
              <p className="mt-2 uppercase text-label-md">
                your balance:{" "}
                <span className=" text-legend text-label-md">
                  {isLoading
                    ? "..."
                    : formatNumber(Number(points?.credit_score))}
                </span>
              </p>
            </div>
            <button
              disabled={isTransferring}
              className={`tertiary_bg h-[55px] text-secondary text-heading-md mt-2 ${
                isTransferring && "opacity-60"
              }`}
              onClick={onTransfer}
            >
              Transfer
            </button>
          </>
        )}
      </Modal>
      <button className="tertiary_bg h-[55px]" onClick={() => setIsOpen(true)}>
        <div className="flex items-center h-full px-3 gap-x-4 text-secondary">
          <Image src="/new_design/icons/p2p_icon.webp" className=" h-[30px]" />
          <p className="uppercase text-secondary text-label-xl">P2P Transfer</p>
        </div>
      </button>
    </>
  );
};

export default Transfer;
