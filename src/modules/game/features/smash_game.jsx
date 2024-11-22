import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { adsBlockId, baseURL } from "../../../constants";
import { useCurrentProfile } from "../../home/hooks/use_store";
import useHashNavigate from "../../../hooks/use_hash_navigate";
import { useLocation } from "react-router-dom";
import GameLoading from "../../../components/ui/game_loading";

const SmashGame = () => {
  const { state } = useLocation();
  const userGameEntry = state.userGameEntry;
  const navigate = useHashNavigate();
  const version = 1;
  const isPremium = false;
  const isFunMode = state.isFunMode;
  const { profile } = useCurrentProfile();
  const accessToken = localStorage.getItem("accessToken");
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    sendMessage,
    unload,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: `/SmashWebLow/Build/SmashWebLow.loader.js?version=${version}`,
    dataUrl: `/SmashWebLow/Build/SmashWebLow.data.unityweb?version=${version}`,
    frameworkUrl: `/SmashWebLow/Build/SmashWebLow.framework.js.unityweb?version=${version}`,
    codeUrl: `/SmashWebLow/Build/SmashWebLow.wasm.unityweb?version=${version}`,
  });

  useEffect(() => {
    if (isLoaded) {
      sendTokenToUnity();
      sendBlockIdToUnity();
      sendExternalServerUrlToUnity();
      sendProfileIdToUnity();
      sendIsFunModeToUnity();
      sendIsPremiumToUnity();
      sendFeesToUnity();
      sendGameEntryIdToUnity();
      sendWhichAdsToUnity();
    }
  }, [isLoaded]);

  const sendTokenToUnity = () => {
    sendMessage("MessageReceiver", "SetToken", accessToken);
  };
  const sendExternalServerUrlToUnity = () => {
    sendMessage("MessageReceiver", "SetUri", baseURL);
  };
  const sendBlockIdToUnity = () => {
    sendMessage("MessageReceiver", "SetBlockID", adsBlockId);
  };
  const sendProfileIdToUnity = () => {
    sendMessage("MessageReceiver", "SetProfileID", profile?.id);
  };
  const sendIsFunModeToUnity = () => {
    sendMessage("MessageReceiver", "SetFunMode", isFunMode ? "true" : "false");
  };
  const sendIsPremiumToUnity = () => {
    sendMessage("MessageReceiver", "SetPremium", isPremium ? "true" : "false");
  };
  const sendFeesToUnity = () => {
    sendMessage("MessageReceiver", "SetRespinFee", profile?.respin_fee);
    sendMessage(
      "MessageReceiver",
      "SetReviveFee",
      profile?.paid_revive.toString()
    );
  };

  //currentUserGameEntry
  const sendGameEntryIdToUnity = () => {
    sendMessage("MessageReceiver", "SetEntryID", userGameEntry?.id);
  };

  const sendWhichAdsToUnity = () => {
    if (isPremium) return;
    sendMessage("MessageReceiver", "AdsGram");
  };

  useEffect(() => {
    const handleGameOverEvent = async () => {
      await unload().then(() => {
        navigate(-1);
      });
    };

    const handleRespinEvent = (id) => {
      try {
        sendMessage("MessageReceiver", "PlayerRespinSuccess");
      } catch (error) {
        sendMessage("MessageReceiver", "PlayerRespinFailed");
      }
    };

    const handleReviveEvent = (id) => {
      try {
        sendMessage("MessageReceiver", "PlayerReviveSuccess");
      } catch (error) {
        sendMessage("MessageReceiver", "PlayerReviveFailed");
      }
    };

    window.addEventListener("GameOver", handleGameOverEvent);
    addEventListener("Respin", handleRespinEvent);
    addEventListener("Revive", handleReviveEvent);

    return () => {
      window.removeEventListener("GameOver", handleGameOverEvent);
      removeEventListener("Respin", handleRespinEvent);
      removeEventListener("Revive", handleReviveEvent);
    };
  }, [unload, addEventListener, removeEventListener, navigate]);

  return (
    <>
      {!isLoaded && <GameLoading loadingProgression={loadingProgression} />}
      <div className="absolute inset-0 z-[9999]">
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

export default SmashGame;
