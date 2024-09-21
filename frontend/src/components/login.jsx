import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Slide } from "react-toastify";
import "./login.css";
import { usePassword } from "../context/backend";
import Loader from "./loader";

function Loginform() {
  let navigate = useNavigate();
  let { Loginfetch, setcurrentuser, isloading, setisloading } = usePassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("The field should not be empty"),
      password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("The field should not be empty"),
    }),
    onSubmit: async (values) => {
      setisloading(true);
      console.log(values);
      let data = await Loginfetch(values.email, values.password);

      if (data.errorname) {
        console.log(data);
        toast.error(data.message, {
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
      } else {
        console.log(data);
        if (!data.secretkey) {
          localStorage.setItem("token", data.token);
          navigate("/secretkey");
          toast.success("Login successful", {
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
          toast.warning("Please set a secret key", {
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
          setcurrentuser({
            token: data.token,
          });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("secretkey", data.secretkey);
          navigate("/");
          toast.success("Login successful", {
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
          setcurrentuser({
            token: data.token,
            secretkey: data.secretkey,
          });
        }
      }
      setisloading(false);
    },
  });

  return (
    <div className="container">
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button disabled={isloading} type="submit">
          {isloading ? <Loader /> : "Login"}
        </button>
        <p className="register-link">
          Do not have an account?<Link to="/signup">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Loginform;
