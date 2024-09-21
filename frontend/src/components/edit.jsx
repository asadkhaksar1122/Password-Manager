import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { usePassword } from "../context/backend";
import { toast, Slide } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { decrypt } from "./helper";

export default function Edit() {
  const [isuloading, setisuloading] = useState(false);
  let navigate = useNavigate();
  const [isvalidid, setIsvalidid] = useState(true);
  let [initialvalues, setinitialvalues] = useState({
    websiteurl: "",
    username: "",
    password: "",
  });
  let {
    fetchonepassword,
    currentuser,
    isloading,
    setisloading,
    updatepassword,
  } = usePassword();
  let { id } = useParams();

  async function handlefetch() {
    let secret = "my super duber secret";
    setisloading(true);
    let data = await fetchonepassword(currentuser.token, id);
    console.log(data);
    if (data.errorname) {
      setIsvalidid(false);
    } else {
      setinitialvalues({
        websiteurl: data.websiteurl,
        username: data.username,
        password: decrypt(data.password, secret),
      });
    }
    setisloading(false);
  }

  useEffect(() => {
    handlefetch();
  }, []);

  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      websiteurl: Yup.string().required("The field should not be empty"),
      username: Yup.string().min(3).required("The field should not be empty"),
      password: Yup.string().min(6).required("The field should not be empty"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setisuloading(true);
      let data = await updatepassword(
        currentuser.token,
        id,
        values.websiteurl,
        values.username,
        values.password
      );
      console.log(data);

      navigate("/");
      setisuloading(false);
      toast.success("The password has been Updated", {
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
    },
  });

  return (
    <>
      {!isloading ? (
        isvalidid ? (
          <>
            {" "}
            <section className="form">
              <div className="heading">
                <h3>Edit Password</h3>
              </div>
              <div className="addform">
                <form onSubmit={formik.handleSubmit}>
                  <div className="formdiv">
                    <label htmlFor="websiteurl">Website url</label>
                    <input
                      type="text"
                      id="websiteurl"
                      {...formik.getFieldProps("websiteurl")}
                      placeholder="Enter Website url"
                    />
                    {formik.touched.websiteurl && formik.errors.websiteurl ? (
                      <div className="error">{formik.errors.websiteurl}</div>
                    ) : null}
                  </div>
                  <div className="formdiv seconddiv">
                    <div className="usernamediv">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        {...formik.getFieldProps("username")}
                        placeholder="Enter Username"
                      />
                      {formik.touched.username && formik.errors.username ? (
                        <div className="error">{formik.errors.username}</div>
                      ) : null}
                    </div>
                    <div className="passworddiv">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        placeholder="Enter Password"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="formdiv">
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={formik.isSubmitting}
                    >
                      {isuloading ? <Loader></Loader> : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </>
        ) : (
          <h1>There is some problem</h1>
        )
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}
