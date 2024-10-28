import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import productservice from "../services/productservice";
import depotservice from "../services/depotservice";
import Sidebar from "../dashbord/sidebar";


function Adddepot() {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [affiche, setAffiche] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

  const getAllProduct = () => {
    productservice
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
    getAllProduct();
  }, []);

 const onChangeHandler = (e) => {
   setData({ ...data, [e.target.name]: e.target.value });
 };

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
        depotservice
          .create(data)
          .then((res) => {
            navigate("/dashbord/listdepot");
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
      <div class="app">
        <div class="app-wrapper">
          <div class="app-content pt-3 p-md-3 p-lg-4">
            <div class="container-xl">
              <Sidebar></Sidebar>
              <h1 className="app-page-title">Add depot</h1>
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
                            Quantité Stock
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="QuantiteStock"
                            name="QuantiteStock"
                            onChange={onChangeHandler}
                            required
                          />
                          {errors.QuantiteStock && (
                            <span className="text-danger">
                              {errors.QuantiteStock}
                            </span>
                          )}
                        </div>

                        <div class="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            Product
                          </label>
                          <select
                            class="form-control"
                            onChange={onChangeHandler}
                            name="articleId"
                          >
                            <option>Product</option>

                            {list?.map((item) => {
                              return (
                                <option value={item?.id}>
                                  {item?.nomP}
                                </option>
                              );
                            })}
                          </select>
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
    );
  }


export default Adddepot;
