import Background from "../../../components/ui/background";
import Image from "../../../components/ui/image";

const PrizeType = ({ handleChangeType, gameType }) => {
  return (
    <div className="flex items-center gap-x-5">
      <Image
        src="/new_design/icons/tabs_arrow_left.webp"
        className=" h-[25px]"
        onClick={() => handleChangeType("prev")}
      />
      <Background
        bgUrl="/new_design/components_base/entry_dropdown.webp"
        className=" w-[150px] flex justify-center items-center h-[50px]"
      >
        {gameType}
      </Background>
      <Image
        src="/new_design/icons/tabs_arrow_right.webp"
        className=" h-[25px]"
        onClick={() => handleChangeType("next")}
      />
    </div>
  );
};

export default PrizeType;
