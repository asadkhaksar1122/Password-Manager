import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./secretkey.css";
import { ToastContainer, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePassword } from "../context/backend";

const SecretKeyForm = () => {
  let { secretkeyfetch, currentuser } = usePassword();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      secretKey: "",
    },
    validationSchema: Yup.object({
      secretKey: Yup.string()
        .min(5, "Secret Key must be at least 5 characters")
        .required("Secret Key is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(currentuser);
      let data = await secretkeyfetch(currentuser.token, values.secretKey);
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
        localStorage.setItem("secretkey", data);
        navigate("/");
        toast.success("Secret key has been created", {
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
      setSubmitting(false);
    },
  });

  return (
    <div className="form-container">
      <form id="secret-key-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="secret-key">Secret Key:</label>
        <input
          type="password"
          id="secret-key"
          name="secretKey"
          value={formik.values.secretKey}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.secretKey && formik.errors.secretKey ? (
          <div className="error">{formik.errors.secretKey}</div>
        ) : null}
        <p className="warning">
          Remember the secret key because we will ask again and again for the
          secret key to show password.
        </p>
        <button type="submit" disabled={formik.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SecretKeyForm;
