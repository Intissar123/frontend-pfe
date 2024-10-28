import React, { useState } from "react";
import Sidebar from "../dashbord/sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import categoryservice from "../services/categoryservice";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "name is required." }),
  description: z.string().min(1, { message: "description is required." }),
});

function CreateCategory() {
  const [data, setData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
        categoryservice
          .create(data)
          .then((res) => {
            navigate("/dashbord/category");
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="app">
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <Sidebar />
            <h1 className="app-page-title">Add Category</h1>
            <hr className="mb-4" />
            <div className="row g-4 settings-section">
              <div className="col-12 col-md-2">
                <div className="section-intro"></div>
              </div>
              <div className="col-12 col-md-8">
                <div className="app-card app-card-settings shadow-sm p-4">
                  <div className="app-card-body">
                    <form className="settings-form" onSubmit={onSubmitHandler}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Name"
                          onChange={onChangeHandler}
                        />
                        {errors.name && (
                          <span className="text-danger">{errors.name}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          placeholder="description"
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
                      <button type="submit" className="btn app-btn-primary">
                        Save
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
  );
}

export default CreateCategory;
