import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { usePassword } from "../context/backend";
import Loader from "./loader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Signup() {
  let navigate = useNavigate();
  let { signupfetch, isloading, setisloading } = usePassword();

  async function handlesubmit(values, { setSubmitting }) {
    setisloading(true);
    let data = await signupfetch(values.name, values.email, values.password);

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
      localStorage.setItem("token", data.token);
      navigate("/secretkey");

      toast.success("Sign up sucessfully", {
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
      toast.warning("please set the verification token", {
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
    setisloading(false);
    setSubmitting(false);
  }

  return (
    <div className="container">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={handlesubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h1>Sign up</h1>
            <div className="input-group">
              <label htmlFor="Name">Name</label>
              <Field
                type="text"
                id="Name"
                placeholder="Enter your Name"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button disabled={isloading || isSubmitting} type="submit">
              {isloading ? <Loader /> : "Sign up"}
            </button>
            <p className="register-link">
              Already have account?<Link to="/login">Register here</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
