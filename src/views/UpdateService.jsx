import React, { useEffect, useState } from 'react'
import Sidebar from '../dashbord/sidebar';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import serviceService from "../services/serviceService";
import servicecategoryservice from '../services/servicecategoryservice';

function UpdateService() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    serviceService
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
  const [list, setList] = useState([]);
  const getAllCategory = () => {
    servicecategoryservice
      .GetAll()
      .then((res) => {
        setList(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };
  useEffect(() => {
    getAllCategory();
  }, []);
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
        serviceService
          .update(id, data)
          .then((res) => {
            console.log(res);
            //yarja3 lil liste ba3ed update
            navigate("/dashbord/service");
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
              <h1 className="app-page-title">Update Service</h1>
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
                            name="ServiceCategoryId"
                          >
                            {list?.map((item) => {
                              return (
                                <option value={item?.id}>{item?.name}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Cost
                          </label>

                          <input
                            type="number"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="cost"
                            required
                            name="cost"
                            defaultValue={data?.cost}
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
}

export default UpdateService