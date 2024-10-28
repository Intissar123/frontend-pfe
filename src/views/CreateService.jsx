import React, { useEffect, useState } from 'react'
import Sidebar from '../dashbord/sidebar';
import serviceService from '../services/serviceService';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import servicecategoryservice from '../services/servicecategoryservice';
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "name is required." }),
  description: z.string().min(1, { message: "description is required." }),
  serviceCategoryId: z
    .string()
    .min(1, { message: "serviceCategory is required." }),
  cost: z.string().min(1, { message: "cost is required." }),
});
function CreateService() {
  const [data, setData] = useState({
    name: "",
    description: "",
    serviceCategoryId: "",
    cost:"",
  });
  const [errors, setErrors] = useState({});
  const [list, setList] = useState([]);
   const [affiche, setAffiche] = useState(false);

   const getAllServiceCategory = () => {
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
     getAllServiceCategory();
   }, []);

   const onChangeHandler = (e) => {
     setData({ ...data, [e.target.name]: e.target.value });
     console.log(data);
   };
 const navigate = useNavigate();

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
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         //consomation d'API
        serviceService
           .create(data)
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
    <div class="app">
      <div class="app-wrapper">
        <div class="app-content pt-3 p-md-3 p-lg-4">
          <div class="container-xl">
            <Sidebar />
            <h1 className="app-page-title">Add Service</h1>
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
                        <label htmlFor="setting-input-1" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          onChange={onChangeHandler}
                          required
                        />
                        {errors.name && (
                          <span className="text-danger">{errors.name}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="setting-input-2" className="form-label">
                          Description
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="description"
                          name="description"
                          onChange={onChangeHandler}
                          required
                        />
                        {errors.description && (
                          <span className="text-danger">
                            {errors.description}
                          </span>
                        )}
                      </div>
                      <div class="mb-3">
                        <label
                          htmlFor="service-category"
                          className="form-label"
                        >
                          ServiceCategory
                        </label>
                        <select
                          class="form-control"
                          id="serviceCategoryId"
                          onChange={onChangeHandler}
                          name="serviceCategoryId"
                        >
                          <option value="">Select Service Category</option>
                          {list?.map((item) => (
                            <option key={item?.id} value={item?.id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                        {errors.serviceCategoryId && (
                          <span className="text-danger">
                            {errors.serviceCategoryId}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="setting-input-3" className="form-label">
                          Cost
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="cost"
                          name="cost"
                          onChange={onChangeHandler}
                          required
                        />
                        {errors.cost && (
                          <span className="text-danger">{errors.cost}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateService