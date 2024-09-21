import { useEffect, useState } from "react";
import "./Table.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePassword } from "../context/backend";
import { decrypt } from "./helper";
import { Link } from "react-router-dom";
import Loader from "./loader";

const Table = ({
  setshow,
  passwordVisible,
  setvisibleid,
  setisedit,
  seteditid,
}) => {
  const [data, setData] = useState([]);
  const {
    allpasswordfetch,
    currentuser,
    isupdate,
    setisupdate,
    deletepasswordfetch,
    isloading,
    setisloading,
  } = usePassword();

  const togglePasswordVisibility = (index) => {
    setshow(true);
    setvisibleid(index);
  };

  async function fetchallpassword() {
    try {
      setisloading(true);
      const data = await allpasswordfetch(currentuser.token);
      setData(data);
      setisloading(false);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      setisloading(false);
    }
  }

  useEffect(() => {
    fetchallpassword();
    setisupdate(false);
  }, [isupdate]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard", {
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
  };

  async function handledelete(id) {
    try {
      setisloading(true);
      const data = await deletepasswordfetch(currentuser.token, id);
      if (data.error) {
        console.error("Error deleting password:", data.error);
      } else {
        toast.success("Password deleted successfully", {
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
        setisupdate(true);
      }
      setisloading(false);
    } catch (error) {
      console.error("Error deleting password:", error);
      setisloading(false);
    }
  }

  const secret = "my super duper secret";

  return (
    <div className="table-container">
      {isloading ? (
        <Loader />
      ) : data.length !== 0 ? (
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Website URL</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td onClick={() => copyToClipboard(row.websiteurl)}>
                  {row.websiteurl}
                </td>
                <td onClick={() => copyToClipboard(row.username)}>
                  {row.username}
                </td>
                <td>
                  <input
                    type={passwordVisible[index] ? "text" : "password"}
                    value={decrypt(row.password, secret)}
                    readOnly
                  />
                  <button onClick={() => togglePasswordVisibility(index)}>
                    {passwordVisible[index] ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => copyToClipboard(row.password)}>
                    Copy
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      togglePasswordVisibility(row._id);
                      setisedit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handledelete(row._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No passwords to show</h1>
      )}
    </div>
  );
};

export default Table;
