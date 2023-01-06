import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./providers/UserData";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./assets/style/GlobalStyle";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import TimelinePage from "./pages/TimelinePage/TimelinePage";
import HashtagPage from "./pages/TimelinePage/HashtagPage";

export default function App(){
  return(
    <UserProvider>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegistrationPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </UserProvider>
  )
}
