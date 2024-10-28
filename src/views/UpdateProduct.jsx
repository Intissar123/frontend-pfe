import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productservice from "../services/productservice";
import subcategoryservice from "../services/subcategoryservice";
import Swal from "sweetalert2";
import Sidebar from "../dashbord/sidebar";

const UpdateProduct = () => {
  const [selectv, setSelectv] = useState("");
  const getSelectedValue = (event) => {
    setSelectv(event.target.value);
  };

  const [updatedData, setUpdatedData] = useState({});
  const [data, setData] = useState({});
  const [image, SetImage] = useState([]);
  const { id } = useParams();

  const [list, setList] = useState([]);
  const [affiche, setAffiche] = useState(false);

 

  useEffect(() => {
    productservice
      .GetOne(id)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


 const getAllSubcategory = () => {
   subcategoryservice
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
   getAllSubcategory();
 }, []);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    console.log(updatedData);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("nomP", updatedData.nomP || data.nomP);
    formdata.append("prix", updatedData.prix || data.prix);
    formdata.append("qte", updatedData.qte || data.qte);
    formdata.append(
      "subcategoryId",
      updatedData.subcategoryId || data.subcategoryId
    );

    for (let i = 0; i < image.length; i++) {
      const cleanedFileName = image[i].name.replace(/\\/g, "");
      formdata.append("image", image[i], cleanedFileName);
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        productservice
          .update(id, formdata)
          .then((res) => {
            console.log(res);
            navigate("/dashbord/product");
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

  const HandleImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      SetImage(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <div class="app">
        <div class="app-wrapper">
          <div class="app-content pt-3 p-md-3 p-lg-4">
            <div class="container-xl">
              <Sidebar></Sidebar>
              <h1 className="app-page-title">Update Product :</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-2">
                  <div className="section-intro"></div>{" "}
                </div>
                <div className="col-12 col-md-8">
                  <div className="app-card app-card-settings shadow-sm p-4">
                    <div className="app-card-body">
                      <form className="settings-form">
                        <div className="mb-1">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Title
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            id="nomP"
                            placeholder="reference"
                            name="nomP"
                            defaultValue={data?.nomP}
                            required
                            onChange={onChangeHandler}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Price
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            id="prix"
                            placeholder="price"
                            name="prix"
                            defaultValue={data?.prix}
                            required
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Image
                          </label>

                          <input
                            type="file"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="image"
                            name="image"
                            defaultValue={data?.image}
                            required
                            onChange={HandleImage}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Quantity
                          </label>

                          <input
                            type="number"
                            className="form-control"
                            id="qte"
                            placeholder="quantity"
                            name="qte"
                            defaultValue={data?.qte}
                            required
                            onChange={onChangeHandler}
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Category
                          </label>
                          <select
                            class="form-control"
                            onChange={onChangeHandler}
                            defaultValue={data?.subcategoryId}
                            name="subcategoryId"
                          >
                            {list?.map((item) => {
                              return (
                                <option value={item?.id}>{item?.id}</option>
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

export default UpdateProduct;
