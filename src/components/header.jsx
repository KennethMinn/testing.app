import Background from "./ui/background";
import { useGetPoints } from "../hooks/use_data";
import Profile from "../modules/profile/features/profile";
import { formatNumber } from "../utils/index";

const Header = () => {
  const { data: points, isLoading } = useGetPoints();

  return (
    <div className=" border-none px-5 flex items-center h-[70px] justify-between w-full z-30 header_bg sticky top-0">
      <div className="flex items-center gap-x-3">
        <Background
          bgUrl="/new_design/navigation/m_balance.webp"
          className="h-[27px] w-[80px] flex items-center justify-center ps-6 text-label-md"
        >
          {isLoading ? "..." : formatNumber(Number(points?.credit_score))}
        </Background>
        <Background
          bgUrl="/new_design/navigation/airdrop_balance.webp"
          className="h-[27px] w-[80px] flex items-center justify-center ps-6 text-[12px]"
        >
          {isLoading ? "..." : formatNumber(Number(points?.airdrop_point))}
        </Background>
      </div>
      <Profile />
    </div>
  );
};

export default Header;
