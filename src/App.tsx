import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

// Styling
import styled, { ThemeProvider } from "styled-components";

// Components
import AppRouter from "./AppRouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// const HOSTURL = process.env.REACT_APP_API_HOST;
const queryClient = new QueryClient();

const commonTheme = {
  orange: "#FAA125",
};

// Theme
const basicTheme = {
  dark: {
    bg: "#252525",
    text: "#F9F9F9",
  },
  light: {
    bg: "#F9F9F9",
    text: "#252525",
  },
};

const ThemeToggler = styled.button`
  position: fixed;
  z-index: 2;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 50%;
  padding: 4px;
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

function App() {
  const [themeMode, setThemeMode] = React.useState<"dark" | "light">("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{ ...basicTheme[themeMode], ...commonTheme }}>
        <ThemeToggler
          onClick={() =>
            setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))
          }
        >
          <FontAwesomeIcon
            icon={themeMode === "dark" ? faMoon : faSun}
            size="3x"
          />
        </ThemeToggler>
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
