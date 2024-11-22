import Background from "./background";

const Toggle = ({ isToggled, onToggle, onLabel = "ON", offLabel = "OFF" }) => {
  return (
    <Background
      bgUrl="/new_design/toggle/toggle_on_off_base.webp"
      onClick={onToggle}
      className=" flex items-center w-[70px] h-[35px] relative"
    >
      <div
        className={`w-[23px] h-[23px] transform transition-transform duration-300 ${
          isToggled
            ? "toggle_on_bg translate-x-[36px]"
            : "toggle_off_bg translate-x-[12px]"
        }`}
      ></div>
      <p
        className={`absolute transition-transform duration-300 text-label-sm ${
          isToggled ? "translate-x-[12px]" : "translate-x-[41px]"
        }`}
      >
        {isToggled ? onLabel : offLabel}
      </p>
    </Background>
  );
};

export default Toggle;
