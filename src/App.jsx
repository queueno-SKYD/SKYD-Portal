import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "./theme/style.css";
import { AppContextProvider } from "./context/app.context";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../src/theme/theme";
import "./global.css";

function App() {
  return (
    <section
      className="vh-100 d-flex flex-column"
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <ToastContainer />
          </AppContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </section>
  );
}

export default App;
