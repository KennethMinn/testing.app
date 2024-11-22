import BackButton from "../components/ui/back_button";

// Layout.js
const CommonLayout = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col items-center sm:gap-y-6 md:gap-y-8 ${className}`}
    >
      {children}
    </div>
  );
};

const Header = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <BackButton />
      {children}
    </div>
  );
};

CommonLayout.Header = Header;

export default CommonLayout;
