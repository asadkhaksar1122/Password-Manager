import { useState, useContext, createContext } from "react";
import {
  addpaswordfetch,
  allpasswordfetch,
  deletepasswordfetch,
  fetchonepassword,
  Loginfetch,
  secretkeyfetch,
  signupfetch,
  updatepassword,
} from "../fetchdata/fetch";

let allpassword = createContext();

let PasswordProvider = ({ children }) => {
  const [isupdate, setisupdate] = useState(false);
  let [alert, setalert] = useState(null);
  const [currentuser, setCurrentuser] = useState(null);
  if (!currentuser && localStorage.getItem("token")) {
    setCurrentuser({
      token: localStorage.getItem("token"),
      secretkey: localStorage.getItem("secretkey") || undefined,
    });
  }
  function showalert(type, message) {
    setalert({
      type,
      message,
    });
    setTimeout(() => {
      setalert(null);
    }, 3000);
  }
  const [isloading, setisloading] = useState(false);
  let allvalue = {
    currentuser,
    setcurrentuser: setCurrentuser,
    Loginfetch,
    secretkeyfetch,
    signupfetch,
    isloading,
    setisloading,
    allpasswordfetch,
    addpaswordfetch,
    isupdate,
    setisupdate,
    deletepasswordfetch,
    fetchonepassword,
    updatepassword,
    alert,
    setalert,
    showalert,
  };
  return (
    <allpassword.Provider value={allvalue}>{children}</allpassword.Provider>
  );
};

let usePassword = () => {
  let context = useContext(allpassword);
  return context;
};
export { PasswordProvider, usePassword };
