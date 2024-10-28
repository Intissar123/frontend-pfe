import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginservice from "../services/loginservice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "firstName is required." }),
  lastName: z.string().min(1, { message: "lastName is required." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "password is required." }),
});

function Signup() {
  const [data, SetData] = useState({
    firstName: "",
    lastName:"",email: "",
    password: "",
  });
   const [errors, setErrors] = useState({});
   const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    SetData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
 const validationResult = schema.safeParse(data);

 if (!validationResult.success) {
   const newErrors = validationResult.error.errors.reduce((acc, err) => {
     acc[err.path[0]] = err.message;
     return acc;
   }, {});
   setErrors(newErrors);
   return;
 } else {
   setErrors({});
 }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        const userdata = { ...data, role: "user" };
        loginservice
          .singup(userdata)
          .then((res) => {
            console.log(res);
           alert("User registered successfully!");
           navigate("/login");
          })
          .catch((erreur) => {
            console.log(erreur);
          });

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Header />
      <div
        className="row g-0 app-auth-wrapper"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5"
          style={{ marginTop: "-5%"}}
        >
          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <a className="app-logo" href="index.html"></a>
              </div>
              <h2 className="auth-heading text-center mb-4">Sign up</h2>
              <div className="auth-form-container text-start mx-auto">
                <form
                  className="auth-form auth-signup-form"
                  onSubmit={onSubmitHandler}
                >
                  <div className="mb-3">
                    <label className="sr-only" htmlFor="firstName">
                      Your First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="form-control signup-name"
                      placeholder="First Name"
                      required
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="sr-only" htmlFor="lastName">
                      Your Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="form-control signup-name"
                      placeholder="Last Name"
                      required
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="sr-only" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control signup-email"
                      placeholder="Email"
                      required
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="sr-only" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="form-control signin-password"
                      placeholder="Password"
                      required
                      onChange={onChangeHandler}
                    />
                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="RememberPassword"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="RememberPassword"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <Link to="/reset-password">Forgot password?</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="extra mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="AgreeTerms"
                      />
                      <label className="form-check-label" htmlFor="AgreeTerms">
                        I agree to Portal's{" "}
                        <a href="#" className="app-link">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="app-link">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn app-btn-primary w-100 theme-btn mx-auto"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="auth-option text-center pt-5">
                  Already have an account?{" "}
                  <Link className="text-link" to="/login">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
            <footer className="app-auth-footer" style={{ marginTop: "auto" }}>
              <div className="container text-center py-3"></div>
            </footer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
