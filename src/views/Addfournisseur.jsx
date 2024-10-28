import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fournisseurservice from "../services/fournisseurservice";
import Sidebar from "../dashbord/sidebar";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function Addfournisseur() {
  const [phone, setPhone] = useState();
  const [data, setData] = useState({
    nomF: "",
    refF: "",
    numTlp: "",
    adresse: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear errors when a field is modified
  };

  const onChangeHandler = (value) => {
    setPhone(value);
    setData({ ...data, numTlp: value }); // Update numTlp in data state
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber !== undefined; // You can add more specific validation if needed
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhoneNumber(phone)) {
      setErrors({ ...errors, numTlp: "Invalid phone number" });
      return;
    }

    const formdata = new FormData();
    formdata.append("nomF", data.nomF);
    formdata.append("refF", data.refF);
    formdata.append("numTlp", phone); // Ensure phone is appended correctly
    formdata.append("adresse", data.adresse);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        fournisseurservice
          .create(formdata)
          .then((res) => {
            console.log(res);
            navigate("/dashbord/listprovider");
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
    <div className="app">
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <Sidebar />
            <h1 className="app-page-title">Add Provider </h1>
            <hr className="mb-4" />
            <div className="row g-4 settings-section">
              <div className="col-12 col-md-2">
                <div className="section-intro"></div>{" "}
              </div>
              <div className="col-12 col-md-8">
                <div className="app-card app-card-settings shadow-sm p-4">
                  <div className="app-card-body">
                    <form className="settings-form" onSubmit={onSubmitHandler}>
                      <div className="mb-3">
                        <label htmlFor="refF" className="form-label">
                          reférence Fournisseur
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="refF"
                          placeholder="reférence Fournisseur"
                          name="refF"
                          onChange={handleInputChange}
                          required
                        />
                        {errors.refF && (
                          <span className="text-danger">{errors.refF}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nomF" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nomF"
                          placeholder="Name"
                          name="nomF"
                          onChange={handleInputChange}
                          required
                        />
                        {errors.nomF && (
                          <span className="text-danger">{errors.nomF}</span>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="numTlp" className="form-label">
                          Phone
                        </label>
                        <PhoneInput
                          international
                          defaultCountry="TN"
                          value={phone}
                          onChange={onChangeHandler}
                          className="form-control"
                        />
                        {errors.numTlp && (
                          <span className="text-danger">{errors.numTlp}</span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="adresse" className="form-label">
                          Address
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="adresse"
                          placeholder="Address"
                          required
                          rows={5}
                          name="adresse"
                          onChange={handleInputChange}
                        />
                        {errors.adresse && (
                          <span className="text-danger">{errors.adresse}</span>
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

export default Addfournisseur;
