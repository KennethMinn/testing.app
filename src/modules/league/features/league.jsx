import {
  useGetAirdropLeagueMembers,
  useGetAirdropLeagues,
} from "../hooks/use_data";
import CommonLayout from "../../../layout/common_layout";
import { useState } from "react";
import Image from "../../../components/ui/image";
import { formatNumber } from "../../../utils";
import Loading from "../../../components/ui/loading";

const League = () => {
  const { data: airdropLeagues = [], isLoading: isLeagueLoading } =
    useGetAirdropLeagues();
  const [leagueIndex, setLeagueIndex] = useState(0);

  // Ensure that `airdropLeagues` is an array and has elements before accessing
  const showNext =
    airdropLeagues.length > 0 && leagueIndex < airdropLeagues.length - 1;
  const showPrevious = leagueIndex > 0;

  // Safely access `airdropLeagues` by checking its length and using optional chaining
  const title =
    airdropLeagues.length > 0 ? airdropLeagues[leagueIndex]?.name || "" : "";

  // Construct `leagueSrc` safely
  const leagueSrc = title
    ? `/new_design/icons/${title.toLowerCase()}_badge.webp`
    : "";

  // Ensure `data` exists and is an object
  const { data = {}, isLoading: isMemberLoading } = useGetAirdropLeagueMembers({
    league_name: title,
  });

  // Safely handle `handleNext` and `handlePrevious` logic
  const handleNext = () => {
    if (showNext) {
      setLeagueIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (showPrevious) {
      setLeagueIndex((prev) => prev - 1);
    }
  };

  // Construct `fromImage` safely
  const fromImage = title
    ? `/new_design/icons/${title.toLowerCase()}_badge.webp`
    : "";

  // Use conditional logic for `toImage` with a safe fallback
  const toImage =
    title === "Newbie"
      ? "/new_design/icons/warrior_badge.webp"
      : title === "Warrior"
      ? "/new_design/icons/master_badge.webp"
      : title === "Master"
      ? "/new_design/icons/elite_badge.webp"
      : title === "Elite"
      ? "/new_design/icons/legend_badge.webp"
      : null;

  const percent =
    data?.user && airdropLeagues.length > 0 && airdropLeagues[leagueIndex]
      ? Math.min(
          100,
          Math.max(
            0,
            Math.floor(
              ((Number(data.user.airdrop_points) -
                airdropLeagues[leagueIndex].from_range) /
                (airdropLeagues[leagueIndex].to_range -
                  airdropLeagues[leagueIndex].from_range)) *
                100
            )
          )
        )
      : 0;

  console.log(percent);

  console.log(airdropLeagues);
  console.log(data);

  if (isLeagueLoading || isMemberLoading)
    return (
      <div className="flex items-center justify-center h-screen mt-[-60px]">
        <Loading />
      </div>
    );

  return (
    <CommonLayout className="w-full min-h-screen">
      <CommonLayout.Header />
      <div className="flex items-center justify-between w-full">
        {showPrevious ? (
          <Image
            onClick={handlePrevious}
            src="/new_design/icons/league_arrow_left.webp"
            className="h-[40px] w-[40px]"
          />
        ) : (
          <div className=" w-[40px]" />
        )}
        <Image className="h-[100px] mb-[-17px]" src={leagueSrc} />
        {showNext ? (
          <Image
            onClick={handleNext}
            src="/new_design/icons/league_arrow_right.webp"
            className="h-[40px] w-[40px]"
          />
        ) : (
          <div className=" w-[40px]" />
        )}
      </div>
      <div className="flex flex-col items-center w-full gap-y-2">
        <p className="uppercase text-heading-lg">{title}</p>
        <p className=" text-label-lg">
          Receive
          <span className=" text-label-xl text-success">
            {" "}
            {data?.league?.coin_factor * 100}%{" "}
          </span>
          of the total points
        </p>
        {data.user.airdrop_points > airdropLeagues[leagueIndex].from_range ? (
          <div className="flex flex-col items-center w-full mt-4 gap-y-1">
            {data.user.airdrop_points > airdropLeagues[leagueIndex].to_range ? (
              <div className="flex items-center gap-x-1">
                <Image
                  src="/new_design/icons/check.webp"
                  className=" h-[15px]"
                />
                <p className="uppercase text-label-lg">Completed</p>
              </div>
            ) : (
              <p className="text-nowrap text-label-lg opacity-60">
                {" "}
                {formatNumber(Number(data.user.airdrop_points)) +
                  " / " +
                  formatNumber(Number(airdropLeagues[leagueIndex].to_range)) +
                  " Airdrop Points"}
              </p>
            )}
            <div className="  w-[300px] relative">
              <Image
                src={fromImage}
                className="h-[60px] absolute left-[-20px] top-[-7px] z-20"
              />
              <div className=" bg-gradient-primary h-[30px] w-full z-10 flex items-center relative">
                <div
                  className="bg-success h-[60%] z-20 absolute top-[5px] left-0 rounded-full"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
              {toImage && (
                <Image
                  src={toImage}
                  className="h-[60px] absolute right-[-20px] top-[-7px] z-20"
                />
              )}
            </div>

            <div className="flex flex-col w-full mt-5 gap-y-2">
              {data.user && (
                <div className=" bg-gradient-focus w-full h-[60px] rounded-[8px] flex items-center justify-between px-3">
                  <div className="flex items-center">
                    <p className=" text-label-lg w-[40px]">-</p>
                    <p className=" text-label-lg">{data.user.name}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src="/new_design/icons/airdrop_coin.webp"
                      className="h-[20px]"
                    />
                    <p className=" text-label-lg">
                      {formatNumber(Number(data.user.airdrop_points))}
                    </p>
                  </div>
                </div>
              )}
              {data.league_members.map((member, i) => (
                <div
                  key={i}
                  className=" bg-gradient-primary w-full h-[60px] rounded-[8px] flex items-center justify-between px-3"
                >
                  <div className="flex items-center">
                    <p className=" text-label-lg  w-[40px]">{i + 1}</p>
                    <p className=" text-label-lg">{member.name}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src="/new_design/icons/airdrop_coin.webp"
                      className="h-[20px]"
                    />
                    <p className=" text-label-lg">
                      {formatNumber(Number(member.airdrop_points))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className=" mt-[130px] gap-y-1 flex items-center flex-col">
            <p>lock image</p>
            <p className=" opacity-60 text-label-xl">
              Need {formatNumber(Number(airdropLeagues[leagueIndex].to_range))}{" "}
              points to unlock this trier
            </p>
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default League;
