import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Navbarcomponent from "./components/navbar";
import Loginform from "./components/login";
import Signup from "./components/signup";
import SecretKeyForm from "./components/secretkey";
import { PasswordProvider, usePassword } from "./context/backend"; // Import usePassword
import Edit from "./components/edit";
import Alert from "./components/alert";
import ChangeSecretKey from "./components/changesecret";

function App() {
  return (
    <PasswordProvider>
      <AppRoutes />
    </PasswordProvider>
  );
}

function AppRoutes() {
  const { currentuser } = usePassword();
  console.log(currentuser);
  return (
    <BrowserRouter>
      <Navbarcomponent />
      <Alert type="error" message="This is an error alert" />
      <Alert type="success" message="This is a success alert" />
      <Routes>
        <Route
          path="/"
          element={currentuser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Loginform />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changesecretkey" element={<ChangeSecretKey />} />
        <Route
          path="/secretkey"
          element={
            currentuser && currentuser.secretkey ? (
              <Navigate to="/" />
            ) : (
              <SecretKeyForm />
            )
          }
        />
        <Route path="/edit/:id" element={<Edit />} />
        <Route
          path="*"
          element={currentuser ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
