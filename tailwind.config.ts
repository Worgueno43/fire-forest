import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      },
      colors: {
        current: "currentColor",
        transparent: "transparent",
        forest: "#18534F",
        fire: "#E76F51",
        main: "#E8D5CC",
        ash: "#384454"
      }
    }
  },
  plugins: []
} satisfies Config;
