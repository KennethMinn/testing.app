import Background from "../../../components/ui/background";
import Image from "../../../components/ui/image";
import { formatStringWithEndEllipsis } from "../../../utils";
import { t } from "i18next";

const ProfileHeader = ({
  user,
  copyCode,
  isLoading,
  airdroppingCreditScore,
}) => {
  console.log("UserCode ", user.code)
  return (
    <div>
      <Background
        bgUrl="/new_design/background/profile_bg.webp"
        className=" w-full h-[130px] rounded-t-[12px] flex items-center px-5"
      >
        <div className="flex items-center mt-5 gap-x-3">
          <Image
            src="/new_design/icons/profile_photo.webp"
            className=" h-[70px]"
          />
          <div className="flex flex-col gap-y-0">
            <p className=" text-heading-md">{user.username}</p>
            <div className="flex items-center gap-x-2">
              <p className=" text-label-lg">
                {t('user_code')}: {formatStringWithEndEllipsis(user.code, 2, 4)}
              </p>
              <button onClick={copyCode}>
                <Image
                  src="/new_design/icons/copy_icon.webp"
                  className="h-[25px]"
                />
              </button>
            </div>
          </div>
        </div>
      </Background>
      <Background
        bgUrl="/new_design/components_base/gradient_floor.webp"
        className=" gap-x-2 w-full h-[35px] flex items-center justify-center"
      >
        <p className="uppercase text-heading-sm text">
          total reward paid :
          <span className=" text-legend ms-2">
            {isLoading ? "..." : `$${airdroppingCreditScore}`}
          </span>
        </p>
      </Background>
    </div>
  );
};

export default ProfileHeader;
