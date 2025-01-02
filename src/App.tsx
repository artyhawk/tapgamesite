import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import "./styles/theme.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
