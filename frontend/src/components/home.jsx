import AddForm from "./form";
import Modal from "./modal";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "./table";
import { usePassword } from "../context/backend";
import { useNavigate } from "react-router-dom";
export default function Home() {
  let navigate = useNavigate();
  let { currentuser } = usePassword();
  let [isedit, setisedit] = useState(false);
  let [secretKey, setSecretKey] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({});
  const [visibleid, setvisibleid] = useState(null);
  const [show, setshow] = useState(false);

  function handleCloseModal() {
    setshow(false);
  }
  function showpassword(index) {
    if (isedit) {
      navigate(`/edit/${index}`);
      setisedit(false);
      return;
    }
    setPasswordVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    toast.success("Password is visible", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  }

  const [password, setPassword] = useState([]);
  async function handlesubmit() {
    if (currentuser.secretkey) {
      console.log("form submitted");
      let secretkey = localStorage.getItem("secretkey");
      let ismatch = await bcrypt.compare(secretKey, secretkey);
      if (ismatch) {
        showpassword(visibleid);
        setshow(false);
        setSecretKey("");
      } else {
        toast.error("Wrong Secretkey", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        console.log("wrong secret code");
      }
    } else {
      navigate("/secretkey");
      toast.warning("Please set a secret key first", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      console.log("No secret key set");
    }
  }
  return (
    <>
      <div className="App">
        <Modal
          secretKey={secretKey}
          setSecretKey={setSecretKey}
          show={show}
          handleClose={handleCloseModal}
          handlesubmit={handlesubmit}
        />
      </div>
      <AddForm password={password} setPassword={setPassword} />
      <Table
        setshow={setshow}
        setvisibleid={setvisibleid}
        passwordVisible={passwordVisible}
        password={password}
        setPassword={setPassword}
        setisedit={setisedit}
      />
    </>
  );
}
