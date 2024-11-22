import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import LayoutBackground from "../components/ui/layout_background";
import { freeRoutes } from "../constants";
import WelcomeLayout from "./welcome_layout";
import { useShowGif} from "../hooks/use_store";

const RootLayout = () => {
  const { pathname } = useLocation();
  const isFree = freeRoutes.includes(pathname);
  const{isShowGif,setIsShowGif} = useShowGif();

  return (
    <>
      {
        isShowGif ? <WelcomeLayout /> : 
          <LayoutBackground>
            <Header />
            <main className=" sm:min-h-screen md:h-screen px-[25px] pt-5 sm:pb-28 md:pb-5 overflow-y-auto ">
              <Outlet />
            </main>
            {!isFree && <Footer />}
          </LayoutBackground> 
      }
    </>
  );
};

export default RootLayout;
