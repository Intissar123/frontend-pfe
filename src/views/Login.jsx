import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginservice from "../services/loginservice";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { z } from "zod";

const schema = z.object({
  
  email:z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "password is required." }),
});
function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
     setErrors({ ...errors, [e.target.name]: "" });
    console.log(data);
  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   return password.trim() !== "";
  // };
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

    //  const validationErrors = {};

    //  if (!data.email || !validateEmail(data.email)) {
    //    validationErrors.email = "Please enter a valid email address.";
    //  }

    //  if (!data.password || !validatePassword(data.password)) {
    //    validationErrors.password = "Password is required.";
    //  }

    //  if (Object.keys(validationErrors).length > 0) {
    //    setErrors(validationErrors);
    //    return;
    //  }
    loginservice
      .signeIn(data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.access_token);

        if (res.data.role === "admin") {
          navigate("/dashbord");
        } else {
          navigate("/home");
        }
      })
      .catch((erreur) => {
        setError("Invalid email or password. Please try again.");
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-7 col-lg-6 text-center">
              <div className="app-auth-body mx-auto">
                <h2 className="auth-heading text-center mb-5">Log in</h2>
                <div className="auth-form-container text-start">
                  <form
                    className="auth-form login-form"
                    method="post"
                    onSubmit={onSubmitHandler}
                  >
                    <div className="email mb-3">
                      <label className="sr-only" htmlFor="signin-email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control signin-email"
                        placeholder="Email address"
                        required
                        onChange={onChangeHandler}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </div>
                    <div className="password mb-3">
                      <label className="sr-only" htmlFor="signin-password">
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
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
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
                    <div className="text-center">
                      {error && <div className="text-danger mb-3">{error}</div>}
                      <button
                        type="submit"
                        className="btn app-btn-primary w-100 theme-btn mx-auto"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                  <div className="auth-option text-center pt-5">
                    No Account? Sign up{" "}
                    <Link className="text-link" to="/">
                      here
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
