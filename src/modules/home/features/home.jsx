import Image from "../../../components/ui/image";
import { useGetSmashGameProfiles } from "../hooks/use_data";
import Profile from "../components/profile";
import Loading from "../../../components/ui/loading";
import { useProfiles } from "../hooks/use_store";
import { useEffect } from "react";

const Home = () => {
  const { setProfiles } = useProfiles();
  const { data: profiles, isLoading } = useGetSmashGameProfiles();

  useEffect(() => {
    if (profiles && profiles?.length > 0) {
      setProfiles(profiles);
    }
  }, [profiles, setProfiles]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-5 md:mt-[-80px]">
      <Image
        src="/new_design/logo/logo_with_underline.webp"
        className="h-[70px]"
      />
      <p className=" text-label-xl">Defeat monsters and claim rewards</p>
      <div className="flex flex-col w-full gap-y-8">
        {isLoading ? (
          <Loading />
        ) : (
          profiles?.map((item, i) => <Profile key={i} index={i} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Home;
