import { Unity, useUnityContext } from "react-unity-webgl";
import { baseURL } from "../../../constants";
import { useEffect } from "react";
import useHashNavigate from "../../../hooks/use_hash_navigate";
import GameLoading from "../../../components/ui/game_loading";

const Airdrop = () => {
  const navigate = useHashNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: "/TapGame/Build/TapGameOptimized.loader.js",
    dataUrl: "/TapGame/Build/TapGameOptimized.data",
    frameworkUrl: "/TapGame/Build/TapGameOptimized.framework.js",
    codeUrl: "/TapGame/Build/TapGameOptimized.wasm",
  });

  const sendTokenToUnity = () => {
    sendMessage("MessageReceiver", "SetToken", accessToken);
  };
  const sendExternalServerUrlToUnity = () => {
    sendMessage("MessageReceiver", "SetUri", baseURL);
  };

  useEffect(() => {
    if (isLoaded) {
      sendTokenToUnity();
      sendExternalServerUrlToUnity();
    }
  }, [isLoaded]);

  useEffect(() => {
    const openLeague = () => {
      navigate("/league");
    };

    window.addEventListener("OpenLeague", openLeague);

    return () => {
      window.removeEventListener("OpenLeague", openLeague);
    };
  }, [addEventListener, removeEventListener, navigate]);

  return (
    <>
      {!isLoaded && <GameLoading loadingProgression={loadingProgression} />}
      <div className="absolute inset-0">
        <Unity
          unityProvider={unityProvider}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
          devicePixelRatio={3}
        />
      </div>
    </>
  );
};

export default Airdrop;
