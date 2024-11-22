import Background from "./background";

const LayoutBackground = ({ children }) => {
  return (
    <Background
      bgUrl="/new_design/background/stars_bg.webp"
      className="w-full h-screen overflow-y-auto "
    >
      {/* <Image
        src="/new_design/background/planet_1.webp"
        className=" fixed top-[-14px] left-[-15px] w-[95px] h-[90px]"
      /> */}
      {/* <Image
        src="/new_design/background/floating_rock.webp"
        className=" fixed  top-[-30px] right-[-13px] w-[95%]"
      /> */}
      {/* <Image
        src="/new_design/background/planet_2.webp"
        className=" fixed bottom-[-36px] right-[-35px] h-[154px] "
      /> */}
      {children}
    </Background>
  );
};

export default LayoutBackground;
