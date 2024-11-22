import { useNavigate } from "react-router-dom";

const useHashNavigate = () => {
  const navigate = useNavigate();

  const push = (path, state) => {
    if (path === -1) {
      navigate(-1, state);
    } else {
      navigate(path + window.location.hash, state);
    }
  };

  return push;
};

export default useHashNavigate;
