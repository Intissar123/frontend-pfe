import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import categoryservice from "../services/categoryservice";
import Swal from "sweetalert2";
import Sidebar from "../dashbord/sidebar";

const UpdateCategory = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    categoryservice
      .GetOne(id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  }, []);
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //consomation d'API
        categoryservice
          .update(id, data)
          .then((res) => {
            console.log(res);
            //yarja3 lil liste ba3ed update
            navigate("/dashbord/category");
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
    <div>
      <div class="app">
        <div class="app-wrapper">
          <div class="app-content pt-3 p-md-3 p-lg-4">
            <div class="container-xl">
              <Sidebar></Sidebar>
              <h1 className="app-page-title">Update Category</h1>
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
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Name
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="name"
                            required
                            name="name"
                            defaultValue={data?.name}
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Description
                          </label>

                          <textarea
                            type="text"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="description"
                            required
                            rows={5}
                            name="description"
                            defaultValue={data?.description}
                            onChange={onChangeHandler}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn app-btn-primary"
                          onClick={onSubmitHandler}
                        >
                          Edit
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
};

export default UpdateCategory;
