import { cdnURL, photoKey } from "../../constants";

const Background = ({ bgUrl, children, className, ...props }) => {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${cdnURL + bgUrl + `?key=${photoKey}`})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Background;
