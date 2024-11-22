import Background from "./background";

const GameLoading = ({ loadingProgression = 0 }) => {
  const totalSteps = 13; // Total number of SVGs
  const activeSteps = Math.ceil(loadingProgression * totalSteps);

  return (
    <div className="fixed left-0 right-0 flex justify-center top-1/2">
      <div className="flex flex-col items-center w-full h-full gap-y-2">
        <Background
          bgUrl="/new_design/components_base/loading_frame.webp"
          className="w-[305px] h-[70px] relative"
        >
          <div className="absolute bottom-[9px] left-[13px] flex items-center gap-x-[2px]">
            {[...Array(totalSteps)].map((_, i) =>
              i < activeSteps ? (
                // SVG for the loaded portion
                <svg
                  key={`loaded-${i}`}
                  width="20"
                  height="22"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.0148926"
                    y="0.851562"
                    width="12.2985"
                    height="12.2985"
                    rx="4.61194"
                    fill="url(#paint0_linear_1)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1"
                      x1="6.16415"
                      y1="15.3167"
                      x2="6.16415"
                      y2="-0.970392"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#21CF46" />
                      <stop offset="1" stopColor="#67FF7D" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <svg
                  key={`unloaded-${i}`}
                  width="20"
                  height="22"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.0148926"
                    y="0.851562"
                    width="12.2985"
                    height="12.2985"
                    rx="4.61194"
                    fill="#20244C"
                  />
                </svg>
              )
            )}
          </div>
        </Background>
        <p> {Math.round(loadingProgression * 100)}%</p>
      </div>
    </div>
  );
};

export default GameLoading;
