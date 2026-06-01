import { ThemeProvider } from "styled-components";
import { theme } from "./styles/tokens";
import { GlobalStyle } from "./styles/global";
import { ToastProvider } from "./components/toast/toast.context";
import { DashboardContainer } from "./pages/dashboard-display/display.container";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastProvider>
        <DashboardContainer />
      </ToastProvider>
    </ThemeProvider>
  );
}
