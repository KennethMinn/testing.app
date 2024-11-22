import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layout/root_layout";
import HomePage from "../../modules/home/pages/home_page";
import RacePage from "../../modules/race/page/race_page";
import Prize from "../../modules/prize/features/prize";
import WinnerHistoryPage from "../../modules/prize/pages/winner_history_page";
import WinnerListPage from "../../modules/prize/pages/winner_list_page";
import SmashGamePage from "../../modules/game/pages/smash_game_page";
import AirdropPage from "../../modules/airdrop/pages/airdrop_page";
import LeaguePage from "../../modules/league/pages/league_page";
import TaskPage from "../../modules/task/pages/task_page";
import ReferralPage from "../../modules/referral/pages/referral_page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "race/:id",
        element: <RacePage />,
      },
      {
        path: "winner-history",
        element: <WinnerHistoryPage />,
      },
      {
        path: "winner-list",
        element: <WinnerListPage />,
      },
      {
        path: "game",
        element: <SmashGamePage />,
      },
      {
        path: "prize",
        element: <Prize />,
      },
      {
        path: "airdrop",
        element: <AirdropPage />,
      },
      {
        path: "league",
        element: <LeaguePage />,
      },
      {
        path: "task",
        element: <TaskPage />,
      },
      {
        path: "referral",
        element: <ReferralPage />,
      },
    ],
  },
]);
