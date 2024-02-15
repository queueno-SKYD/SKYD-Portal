import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
} from "react-router-dom";
import './theme/style.css'
import { LoginProvider } from "./context/login.context";
import "./global.css"
function App() {
  return (
    <div
    style={{
      backgroundImage: `url("./wall.svg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      // Add other styles as needed
    }}>
      <BrowserRouter>
        <LoginProvider>
          <ToastContainer />
        </LoginProvider>
        
      </BrowserRouter>
    </div>
  )
}

export default App;
