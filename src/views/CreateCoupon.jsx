import React, { useState } from "react";
import Sidebar from "../dashbord/sidebar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import couponservice from "../services/couponservice";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1, { message: "code is required." }),
  discount: z.string().min(1, { message: "discount is required." }),
});

function CreateCoupon() {
  const [data, setData] = useState({ code: "", discount: "" });
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
        couponservice
          .create(data)
          .then((res) => {
            navigate("/dashbord/listcoupon");
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
            <h1 className="app-page-title">Add Coupon</h1>
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
                        <label htmlFor="code" className="form-label">
                          Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          name="code"
                          placeholder="code"
                          onChange={onChangeHandler}
                        />
                        {errors.code && (
                          <span className="text-danger">{errors.code}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="discount" className="form-label">
                          Discount
                        </label>
                        <input
                          className="form-control"
                          id="discount"
                          placeholder="discount"
                          rows={5}
                          name="discount"
                          onChange={onChangeHandler}
                        />
                        {errors.discount && (
                          <span className="text-danger">{errors.discount}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="code" className="form-label">
                          Usage Limit
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="usageLimit"
                          name="usageLimit"
                          placeholder="usageLimit"
                          onChange={onChangeHandler}
                        />
                        {errors.usageLimit && (
                          <span className="text-danger">
                            {errors.usageLimit}
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="code" className="form-label">
                          used Count
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="usedCount"
                          name="usedCount"
                          placeholder="usedCount"
                          onChange={onChangeHandler}
                        />
                        {errors.usedCount && (
                          <span className="text-danger">
                            {errors.usedCount}
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

export default CreateCoupon;
