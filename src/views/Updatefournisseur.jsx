import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import fournisseurservice from "../services/fournisseurservice";
import Sidebar from "../dashbord/sidebar";

function Updatefournisseur() {
  const [data, setData] = useState({});
  const [phone, setPhone] = useState(""); // Définir l'état du téléphone
  const { id } = useParams();

  useEffect(() => {
    fournisseurservice
      .GetOne(id)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  }, [id]);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onPhoneChange = (value) => {
    setPhone(value); // Mettre à jour l'état du téléphone
  };

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Voulez-vous enregistrer les modifications ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Enregistrer",
      denyButtonText: `Ne pas enregistrer`,
    }).then((result) => {
      if (result.isConfirmed) {
        fournisseurservice
          .update(id, { ...data, phone })
          .then((res) => {
            navigate("/dashbord/listprovider");
          })
          .catch((erreur) => {
            console.log(erreur);
          });

        Swal.fire("Enregistré !", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Les modifications ne sont pas enregistrées", "", "info");
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
              <h1 className="app-page-title">Update Provider</h1>
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
                            reférence Fournisseur
                          </label>

                          <input
                            type="text"
                            className="form-control"
                            id="setting-input-1"
                            placeholder="reférence Fournisseur"
                            required
                            name="refF"
                            defaultValue={data?.refF}
                            onChange={onChangeHandler}
                          />
                        </div>{" "}
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
                            placeholder="Name"
                            required
                            name="nomF"
                            defaultValue={data?.nomF}
                            onChange={onChangeHandler}
                          />
                        </div>{" "}
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Phone
                          </label>
                          <PhoneInput
                            international
                            defaultCountry="TN"
                            value={phone}
                            onChange={onPhoneChange}
                            className="form-control"
                            defaultValue={data?.numTlp}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="setting-input-2"
                            className="form-label"
                          >
                            {" "}
                            Addresse
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="setting-input-2"
                            placeholder="adresse"
                            required
                            rows={5}
                            defaultValue={data?.adresse}
                            name="adresse"
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

export default Updatefournisseur;
