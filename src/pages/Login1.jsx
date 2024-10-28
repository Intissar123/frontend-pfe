import React, { useEffect, useState } from "react";
import loginservice from "../services/loginservice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Login1 = () => {
  const [data, setData] = useState({});
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginservice
      .signeIn(data)
      .then((res) => {
        console.log(res);
        //yarja3 lil page home
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };

  return (
    <div className="container ">
      {" "}
      <div className="row g-0 app-auth-wrapper text-center ">
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
          <div className="d-flex flex-column align-content-end ">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4">
                <a className="app-logo" href="index.html">
                  <img className="logo-icon me-2" src="images/" alt="logo" />
                </a>
              </div>
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
                      required="required"
                      onChange={onChangeHandler}
                    />
                  </div>
                  {/*//form-group*/}
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
                      required="required"
                      onChange={onChangeHandler}
                    />
                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue
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
                      {/*//col-6*/}
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <a href="reset-password.html">Forgot password?</a>
                        </div>
                      </div>
                      {/*//col-6*/}
                    </div>
                    {/*//extra*/}
                  </div>
                  {/*//form-group*/}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn app-btn-primary w-100 theme-btn mx-auto"
                      onClick={onSubmitHandler}
                    >
                      Log In
                    </button>
                  </div>
                </form>
                <div className="auth-option text-center pt-5">
                  No Account? Sign up{" "}
                  <Link className="text-link" to="/signup">
                    here
                  </Link>
                  .
                </div>
              </div>
              {/*//auth-form-container*/}
            </div>
            {/*//auth-body*/}

            {/*//app-auth-footer*/}
          </div>
          {/*//flex-column*/}
        </div>
        {/*//auth-main-col*/}

        {/*//auth-background-col*/}
      </div>
    </div>
  );
};

export default Login1;
