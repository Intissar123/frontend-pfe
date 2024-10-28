import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import subcategoryservice from "../services/subcategoryservice";
import Swal from "sweetalert2";
import Sidebar from "../dashbord/sidebar";
import categoryservice from "../services/categoryservice";

const UpdateSubCategory = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const [list, setList] = useState([]); // Initialize as an empty array
  const [affiche, setAffiche] = useState(false);

  const getAllCategory = () => {
    categoryservice
      .GetAll()
      .then((res) => {
        console.log(res);
        setList(res.data.data);
        setAffiche(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    subcategoryservice
      .GetOne(id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      if (result.isConfirmed) {
        subcategoryservice
          .update(id, data)
          .then((res) => {
            console.log(res);
            navigate("/dashbord/subcategory");
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
    <div>
      <div class="app">
        <div class="app-wrapper">
          <div class="app-content pt-3 p-md-3 p-lg-4">
            <div class="container-xl">
              <Sidebar></Sidebar>
              <h1 className="app-page-title">Update Sub-Category</h1>
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
                            id="setting-input-2"
                            placeholder="description"
                            required
                            rows={5}
                            defaultValue={data?.description}
                            name="description"
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div class="mb-3">
                          <select
                            class="form-control"
                            onChange={onChangeHandler}
                            name="categoryId"
                          >
                            {list?.map((item) => {
                              return (
                                <option value={item?.id}>{item?.name}</option>
                              );
                            })}
                          </select>
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

export default UpdateSubCategory;
