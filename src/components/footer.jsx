import { navMenus } from "../config/routes";
import Image from "./ui/image";
import useHashNavigate from "../hooks/use_hash_navigate";

const Footer = () => {
  const navigate = useHashNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className=" fixed bottom-0 flex justify-evenly w-full h-[70px] z-30 px-5 items-center footer_bg">
      {navMenus.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-y-1 w-[80px]" onClick={() => handleNavigate(item.path)}>
          <Image src={item.imageSrc} className="w-[40px] h-[42px]" />
          <p className=" text-label-md">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Footer;
