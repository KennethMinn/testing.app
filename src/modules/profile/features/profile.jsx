import { useState } from "react";
import Background from "../../../components/ui/background";
import { useGetPoints } from "../../../hooks/use_data";
import ProfileModal from "../components/profile_modal";
import { t } from "i18next";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: points, isLoading } = useGetPoints();

  return (
    <>
      <ProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        points={points}
      />
      <Background
        onClick={() => setIsOpen(true)}
        bgUrl="/new_design/navigation/profile.webp"
        className="h-[40px] w-[50px] flex items-center justify-center ps-6 text-[12px] relative"
      >
        <p className="absolute left-[7.1px] uppercase bottom-[1px] text-label-sm">
          {t('profile')}
        </p>
      </Background>
    </>
  );
};

export default Profile;
