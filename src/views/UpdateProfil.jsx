import React, { useEffect, useState } from "react";
import Sidebar from "../dashbord/sidebar";
import { useParams, useNavigate } from "react-router-dom";
import loginservice from "../services/loginservice";
import Swal from "sweetalert2";

function UpdateProfil() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loginservice
      .GetOne(id)
      .then((res) => {
        console.log(res);
        setData(res.data.data || {});
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        loginservice
          .update(id, data)
          .then((res) => {
            console.log(res);
            navigate("/dashbord");
            Swal.fire("Saved!", "", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <div className="app">
        <div className="app-wrapper">
          <div className="app-content pt-3 p-md-3 p-lg-4">
            <div className="container-xl">
              <Sidebar></Sidebar>
              <h1 className="app-page-title">Update profile</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-2">
                  <div className="section-intro"></div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form
                        className="settings-form"
                        onSubmit={onSubmitHandler}
                      >
                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">
                            FirstName
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={data.firstName}
                            onChange={onChangeHandler}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lastName" className="form-label">
                            LastName
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={data.lastName}
                            onChange={onChangeHandler}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={onChangeHandler}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={onChangeHandler}
                            required
                          />
                        </div>
                        <button type="submit" className="btn app-btn-primary">
                          Edit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfil;
