import { useState } from "react";
import "hamburgers/dist/hamburgers.css";
import "./navbar.css";
import { ToastContainer, Slide, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { usePassword } from "../context/backend";

const Navbar = () => {
  let navigate = useNavigate();
  let { currentuser, setcurrentuser } = usePassword();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  function handleopen() {
    console.log("open");
  }
  function handlelogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("secretkey");
    setcurrentuser(null);
    navigate("/login");
    toast.success("you have been logout successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div className="hamburger" onClick={handleopen}>
        <button
          className={`hamburger hamburger--squeeze ${
            isOpen ? "is-active" : ""
          }`}
          type="button"
          onClick={handleToggle}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <nav className={` ${isOpen ? "navbar" : ""}`}>
        <div className="firstcontent">
          <div className="image">
            <img src="logo.png" alt="" />
          </div>
          <div className="logoname">Password Manager</div>
        </div>
        <div className={`secondcontent ${isOpen ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!currentuser && (
              <>
                <li>
                  <NavLink to="/login">Log in</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Sign up</NavLink>
                </li>
              </>
            )}
            {currentuser && (
              <>
                <li>
                  <NavLink to="/changesecretkey">Change Secret</NavLink>
                </li>
                <li className="logout" onClick={handlelogout}>
                  logout
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
