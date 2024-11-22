export const cdnURL = import.meta.env.VITE_CDN_URL;
export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const botURL = import.meta.env.VITE_TELEGRAM_BOT_URL;
export const botToken = import.meta.env.VITE_BOT_TOKEN;
export const adsBlockId = import.meta.env.VITE_ADS_BLOCK_ID;

export const photoKey = "3";

export const freeRoutes = [
  "/prize",
  "/race",
  "/winner-history",
  "/winner-list",
  "/airdrop",
  "/task",
  "/referral",
];

export const winnerTitleList = [
  {
    label: "Rank",
    col: 2,
  },
  {
    label: "Participants",
    col: 4,
  },
  {
    label: "Race Points",
    col: 3,
  },
  {
    label: "Prize",
    col: 3,
  },
];

export const leaderboard = {
  leaderboards: [
    {
      user_name: "Renbuhector",
      entry_name: "FREE ENTRY",
      rank: 1,
      total: 9622,
      referral_point: 0,
      credit_score: "1000",
      airdrop_point: "5000000",
      is_valid: true,
    },
    {
      user_name: "Kazisheikh",
      entry_name: "FREE ENTRY",
      rank: 2,
      total: 9580,
      referral_point: 0,
      credit_score: "500",
      airdrop_point: "4000000",
      is_valid: true,
    },
    {
      user_name: "ruok0110",
      entry_name: "ENTRY 1",
      rank: 3,
      total: 9312,
      referral_point: 0,
      credit_score: "250",
      airdrop_point: "3000000",
      is_valid: true,
    },
    {
      user_name: "shahadat006",
      entry_name: "ENTRY 1",
      rank: 4,
      total: 9280,
      referral_point: 0,
      credit_score: "150",
      airdrop_point: "2500000",
      is_valid: true,
    },
    {
      user_name: "xxsagor",
      entry_name: "ENTRY 1",
      rank: 5,
      total: 9154,
      referral_point: 0,
      credit_score: "50",
      airdrop_point: "2000000",
      is_valid: true,
    },
  ],
  player_ranks: [
    {
      user_name: "Renbuhector",
      entry_name: "FREE ENTRY",
      rank: 1,
      total: 9622,
      referral_point: 0,
      credit_score: "1000",
      airdrop_point: "5000000",
      is_valid: true,
    },
  ],
};
