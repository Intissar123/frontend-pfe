import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productservice from "../services/productservice";
import subcategoryservice from "../services/subcategoryservice";
import Swal from "sweetalert2";
import Sidebar from "../dashbord/sidebar";

function CreateProduct() {
  const [Data, SetData] = useState({});
  const [image, SetImage] = useState([]);
  const [list, setList] = useState([]);
const getAllSubCategory = () => {
  subcategoryservice
    .GetAll()
    .then((res) => {
      setList(res.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

useEffect(() => {
  getAllSubCategory();
}, []);

  const onChangeHandler = (e) => {
    SetData({ ...Data, [e.target.name]: e.target.value });
     console.log(Data);
  };

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
     const formdata = new FormData();

    formdata.append("nomP", Data.nomP);

    formdata.append("prix", Data.prix);
    formdata.append("subcategoryId", Data.subcategoryId);
    formdata.append("qte", Data.qte);

    for (let i = 0; i < image.length; i++) {
      formdata.append("image", image[i]);
    }
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
        productservice
          .create(formdata)

          .then((res) => {
            console.log(res);
            //yarja3 lil liste ba3ed update
            navigate("/dashbord/product");
          })
          .catch((erreur) => {
            console.log(erreur);
          });

        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    // const [data,setData] =useState({})
  };
  const HandleImage = (e) => {
    SetImage(e.target.files);
  };

  
  return (
    <div>
      <div className="app">
        <div className="app-wrapper">
          <div className="app-content pt-3 p-md-3 p-lg-4">
            <div className="container-xl">
              <Sidebar />
              <h1 className="app-page-title">Add Product :</h1>
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
                        <div className="mb-1">
                          <label
                            htmlFor="setting-input-1"
                            className="form-label"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nomP"
                            placeholder="title"
                            name="nomP"
                            required
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="prix"
                            placeholder="price"
                            name="prix"
                            required
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-3"
                            className="form-label"
                          >
                            Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="image"
                            placeholder="image"
                            name="image"
                            multiple
                            required
                            onChange={HandleImage}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-4"
                            className="form-label"
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="qte"
                            placeholder="quantity"
                            name="qte"
                            required
                            onChange={onChangeHandler}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-5"
                            className="form-label"
                          >
                            Category
                          </label>
                          <select
                            className="form-control"
                            id="subcategoryId"
                            name="subcategoryId"
                            required
                            onChange={onChangeHandler}
                          >
                            <option>Selectionner un category</option>
                            {list?.map((item) => (
                              <option key={item?.id} value={item?.id}>
                                {item?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button type="submit" className="btn app-btn-primary">
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

export default CreateProduct;
