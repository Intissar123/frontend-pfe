import React, { useState } from "react";
import Sidebar from "../../dashbord/sidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import servicecategoryservice from "../../services/servicecategoryservice";

function AddServiceCategory() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when a field is modified
  };

  const validateName = (name) => {
    return name.trim() !== "";
  };

  const validateDescription = (description) => {
    return description.trim() !== "";
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!data.name || !validateName(data.name)) {
      validationErrors.name = "Name is required.";
    }

    if (!data.description || !validateDescription(data.description)) {
      validationErrors.description = "Description is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    servicecategoryservice
      .create(data)
      .then((res) => {
        navigate("/dashbord/listservicecategory");
        Swal.fire("Saved!", "", "success");
      })
      .catch((erreur) => {
        console.log(erreur);
        Swal.fire("Error!", "Failed to save the service category.", "error");
      });
  };

  return (
    <div>
      <div class="app">
        <div class="app-wrapper">
          <div class="app-content pt-3 p-md-3 p-lg-4">
            <div class="container-xl">
              <Sidebar />
              <h1 className="app-page-title">Add Service Category</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-2">
                  <div className="section-intro"></div>{" "}
                </div>
                <div className="col-12 col-md-8">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form className="settings-form">
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-1"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="name"
                            name="name"
                            onChange={onChangeHandler}
                            required
                          />
                          {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            Description
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="setting-input-2"
                            placeholder="description"
                            required
                            rows={5}
                            name="description"
                            onChange={onChangeHandler}
                          />
                          {errors.description && (
                            <span className="text-danger">
                              {errors.description}
                            </span>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn app-btn-primary"
                          onClick={onSubmitHandler}
                        >
                          Save
                        </button>
                      </form>
                    </div>
                    {/*//app-card-body*/}
                  </div>
                  {/*//app-card*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddServiceCategory;
