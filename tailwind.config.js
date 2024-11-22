/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "350px",
      md: "400px",
    },
    extend: {
      fontFamily: {
        primary: ["Changa One", "sans-serif"],
        coiny: ["Coiny", "sans-serif"],
        sfgalaxy: ['"SF Distant Galaxy"', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to left, #5B6FA1,#465992 )",
        "gradient-tertiary": "linear-gradient(to bottom, #F7FFEC , #B2F1E8)",
        "gradient-focus": "linear-gradient(to bottom, #47C8FE, #2A4EBF)",
      },
      colors: {
        primary: "#f3edf7",
        secondary: "#20244C",
        airdrop: "#FFE522",
        race: "#DB4EFF",
        error: "#FF2020",
        info: "#49CEFE",
        success: "#3FE45E",
        legend: "#2EE7AC",
        "primary-border": "#6285D9",
        "secondary-border": "#343B77",
        "focus-border": "#ABD5F5",
        label: "#848494",
      },
      fontSize: {
        "heading-xl": ["28px"],
        "heading-lg": ["22px"],
        "heading-md": ["20px"],
        "heading-sm ": ["18px"],
        "label-xl": ["16px"],
        "label-lg": ["14px"],
        "label-md": ["12px"],
        "label-sm": ["10px"],
        "label-xs": ["8px"],
      },
    },
  },
  plugins: [],
};
