import { cdnURL, photoKey } from "../../constants/index";

const Image = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={cdnURL + src + `?key=${photoKey}`}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default Image;
