import { usePassword } from "../context/backend";
import "./addform.css";
import { toast, Slide } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "./loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddForm() {
  let navigate = useNavigate();
  let { addpaswordfetch, currentuser, setisupdate } = usePassword();
  let [isloading, setisloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      websiteurl: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      websiteurl: Yup.string().required("The field should not be empty"),
      username: Yup.string().min(3).required("The field should not be empty"),
      password: Yup.string().min(6).required("The field should not be empty"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (currentuser.secretkey) {
        setisloading(true);
        let currentdata = await addpaswordfetch(
          currentuser.token,
          values.websiteurl,
          values.username,
          values.password
        );
        setisupdate(true);
        console.log(currentdata);
        resetForm();
        toast.success("Password added successfully", {
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
        setisloading(false);
        setSubmitting(false);
      } else {
        navigate("/secretkey");
        toast.warning("Please generate a secret key first", {
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
        setisloading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="form">
      <div className="heading">
        <h3>Add Password</h3>
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
              {isloading ? <Loader /> : "Add Password"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddForm;
