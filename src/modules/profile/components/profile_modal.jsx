import toast from "react-hot-toast";
import Modal from "../../../components/ui/modal";
import { useAuth } from "../../../hooks/use_auth";
import ProfileHeader from "./profile_header";
import RecentReward from "./recent_reward";
import AccountWallet from "./account_wallet";

const ProfileModal = ({ isOpen, setIsOpen, points, isLoading }) => {
  const { user } = useAuth();
  console.log("User ", user);

  const creditScore = Number(points?.credit_score);
  const airdroppingCreditScore = Number(points?.airdropping_credit_score);
  const isAirdropping = airdroppingCreditScore || false;

  const copyCode = () => {
    navigator.clipboard.writeText(user.code).then(() => {
      toast.success("code copied to clipboard!");
    });
  };

  return (
    <Modal
      px="px-0"
      pt="pt-0"
      title="profile"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className=" sm:h-[500px] md:h-[700px] w-full "
    >
      <div className="flex flex-col h-full overflow-y-scroll gap-y-12">
        <ProfileHeader
          copyCode={copyCode}
          airdroppingCreditScore={airdroppingCreditScore}
          user={user}
          isLoading={isLoading}
        />
        <RecentReward
          creditScore={creditScore}
          isAirdropping={isAirdropping}
          isLoading={isLoading}
        />
        <div className="mt-7">
          <AccountWallet />
        </div>
      </div>
      
    </Modal>
  );
};

export default ProfileModal;
