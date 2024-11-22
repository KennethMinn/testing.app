import useHashNavigate from "../../hooks/use_hash_navigate";
import Image from "./image";

const BackButton = () => {
  const navigate = useHashNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <Image
      onClick={handleNavigate}
      src="/new_design/icons/back_arrow.webp"
      className=" w-[30px] h-[28px]"
    />
  );
};

export default BackButton;
