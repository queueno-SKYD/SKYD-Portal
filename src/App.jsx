import Login from "./pages/login";
import ChatList from "./pages/chatList";
import DocumentList from "./pages/documentList";
import UserList from "./pages/userList";
import RegisterSuccessFully from "./pages/registerSuccessFully";
import Register from "./pages/register";
import Logout from "./pages/logout";
import LoginSuccessFully from "./pages/loginSuccessFully";
import EditList from "./pages/editUser";
import Welcome from "./pages/welcome";

import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import NotFound from "./pages/notFound";
import Navbar from "./navigation/navbar";
import { PathName } from "./helper/constants/pathNames.ts";
import './theme/style.css'
import { LoginProvider } from "./context/login.context";
function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route element={<Navbar />}>
            <Route path={PathName.homePath} element={<ChatList />} />
            <Route path={PathName.documentListPath} element={<DocumentList />} />
            <Route path={PathName.userListPath} element={<UserList />} />
            <Route path={PathName.logoutPath} element={<Logout />} />

            {/* <Route index path={PathName.homePath} element={<Welcome />} /> */}
            <Route path={PathName.loginPath} element={<Login /> } loader={<p>loading....</p>} />
            <Route path={PathName.registerPath} element={<Register  />} />
            <Route
              path={PathName.registerSuccessPath}
              element={<RegisterSuccessFully />}
            />
            <Route path={PathName.loginSuccessPath} element={<LoginSuccessFully />} />
            <Route path={PathName.notFoundPath} element={<NotFound />} />
          </Route>
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App;
