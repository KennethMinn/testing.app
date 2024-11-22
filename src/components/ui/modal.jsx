import Background from "./background";
import Image from "./image";

const Modal = ({
  label,
  title,
  isOpen,
  onClose,
  url,
  className,
  children,
  px = "px-4",
  pt = "pt-10",
  withoutClose = false,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 flex items-center w-full h-screen bg-black bg-opacity-30 justify-self-center backdrop-blur-sm z-[9999999]">
      <Background
        bgUrl={url}
        className={`relative w-full mx-[30px] ${px} pb-5 ${pt} border-[5px] border-primary-border bg-[#465992] rounded-[12px] ${className}`}
        {...props}
      >
        <Background
          className="absolute left-1/2 transform -translate-x-1/2 top-[-29px] w-[190px] h-[50px] z-50 flex flex-col ga p-y-0 items-center justify-center"
          bgUrl="/new_design/components_base/modal_title.webp"
        >
          {label && (
            <p className="uppercase text-label text-label-md">{label}</p>
          )}
          <p className="text-black uppercase text-heading-md">{title}</p>
        </Background>
        {!withoutClose && (
          <Image
            onClick={onClose}
            className="absolute z-40 right-[-20px] top-[-29px] h-[60px]"
            src="/new_design/icons/close_btn.webp"
          />
        )}
        {children}
      </Background>
    </div>
  );
};

export default Modal;
