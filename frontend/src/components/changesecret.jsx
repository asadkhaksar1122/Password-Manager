import React, { useEffect } from "react";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePassword } from "../context/backend";
import bcryptjs from "bcryptjs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangeSecretKey = () => {
  const { secretkeyfetch, currentuser } = usePassword();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentuser.secretkey) {
      navigate("/secretkey");
      toast.warning("set the secretkey first", {
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
  }, []);
  const validationSchema = Yup.object({
    oldSecretKey: Yup.string().required("Old Secret Key is required").min(5),
    newSecretKey: Yup.string().required("New Secret Key is required").min(5),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { oldSecretKey, newSecretKey } = values;
    let ismatch = await bcryptjs.compare(oldSecretKey, currentuser.secretkey);
    if (ismatch) {
      try {
        const data = await secretkeyfetch(currentuser.token, oldSecretKey);
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
            transition: { Slide },
          });
        } else {
          console.log(data);
          localStorage.setItem("secretkey", data);
          navigate("/");
          toast.success("Secret key has been updated", {
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
      } catch (error) {
        console.error("Error fetching secret key:", error);
        toast.error("An error occurred. Please try again.", {
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
    } else {
      toast.error("Incorrect secret key", {
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
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{ oldSecretKey: "", newSecretKey: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id="secret-key-form">
            <div className="form-group">
              <label htmlFor="old-secret-key">Old Secret Key:</label>
              <Field
                type="password"
                id="old-secret-key"
                name="oldSecretKey"
                required
              />
              <ErrorMessage
                name="oldSecretKey"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-secret-key">New Secret Key:</label>
              <Field
                type="password"
                id="new-secret-key"
                name="newSecretKey"
                required
              />
              <ErrorMessage
                name="newSecretKey"
                component="div"
                className="error"
              />
            </div>
            <p className="warning">
              Remember the secret key because we will ask again and again for
              the secret key to show password.
            </p>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeSecretKey;
