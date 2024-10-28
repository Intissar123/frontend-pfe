import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import serviceService from '../services/serviceService';
import { useNavigate, useParams } from 'react-router-dom';
import categoryservice from '../services/categoryservice';
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import devisService from '../services/devisService';
import servicecategoryservice from '../services/servicecategoryservice';

function Devis() {
  const form = useRef();
  const navigate = useNavigate();
 
  const [data, setData] = useState({});
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_o5za0kv",
        "template_uyyev6v",
        form.current,
        "Z9Y2k-TtekvHZNF_s"
      )
      .then((res) => {
        // Envoyer l'e-mail réussi, créer le devis
        devisService
          .create(data)
          .then((res) => {
            console.log(res);
            navigate("/devis");
            Swal.fire("Message envoyé et devis créé avec succès !");
          })
          .catch((erreur) => {
            console.log(erreur);
            Swal.fire("Erreur lors de la création du devis !");
          });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Erreur lors de l'envoi du message !");
      });
  };



  const [service, setservice] = useState([]);
    const [affiche, setAffiche] = useState(false);

    const getAllservice = () => {
      serviceService
        .GetAll()
        .then((res) => {
          console.log(res);
          setservice(res.data.data);
          setAffiche(true);
        })
        .catch((erreur) => {
          console.log(erreur);
        });
    };

    useEffect(() => {
      getAllservice();
    }, []);
  
  const [serviceCategory, setserviceCategory] = useState([]);
const getAllserviceCatgeory = () => {
  servicecategoryservice
    .GetAll()
    .then((res) => {
      setserviceCategory(res.data.data);
    })
    .catch((erreur) => {
      console.log(erreur);
    });
};

useEffect(() => {
  getAllserviceCatgeory();
}, []);

    return (
      <div>
        <Header />
        {/* Start All Title Box */}
        <div className="all-title-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Devis</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active"> Demande un Devis en ligne </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/*================End Home Banner Area =================*/}
        {/* ================ contact section start ================= */}
        <section className="section_gap" style={{ marginLeft: "20%" }}>
          <div className="container">
            <div className="row">
             
              <div className="col-lg-8 mb-4 mb-lg-0">
                <form
                  className="form-contact contact_form"
                  action=""
                  method="post"
                  id="contactForm"
                  noValidate="novalidate"
                  ref={form}
                  onSubmit={sendEmail}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <span style={{ fontSize: "20px" }}>Service </span>
                        <span style={{ color: "lightgreen", fontSize: "20px" }}>
                          *
                        </span>
                        <select
                          className="form-control"
                          onChange={onChangeHandler}
                          name="name"
                          style={{
                            fontSize: "16px",
                            backgroundColor: "#fff",
                            color: "#000",
                            padding: "8px 12px",
                          }}
                        >
                          <option>Sélectionnez votre choix</option>
                          {service?.map((item) => (
                            <option key={item?.id} value={item?.id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <span style={{ fontSize: "20px" }}>Demande </span>
                        <span style={{ color: "lightgreen", fontSize: "20px" }}>
                          *
                        </span>
                        <select
                          className="form-control"
                          name="my_order"
                          style={{
                            fontSize: "16px",
                            backgroundColor: "#fff",
                            color: "#000",
                            padding: "8px 12px",
                          }}
                        >
                          <option>Sélectionnez votre choix</option>
                          {serviceCategory?.map((item) => (
                            <option key={item?.id} value={item?.name}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <span style={{ fontSize: "20px" }}>Nom </span>
                        <span style={{ color: "lightgreen", fontSize: "20px" }}>
                          *
                        </span>
                        <input
                          className="form-control"
                          name="from_name"
                          id="name"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <span style={{ fontSize: "20px" }}>Email </span>
                        <span style={{ color: "lightgreen", fontSize: "20px" }}>
                          *
                        </span>
                        <input
                          className="form-control"
                          onChange={onChangeHandler}
                          name="email"
                          id="email"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <span style={{ fontSize: "20px" }}>Sujet </span>
                        <span style={{ color: "lightgreen", fontSize: "20px" }}>
                          *
                        </span>
                        <input
                          className="form-control"
                          name="subject"
                          id="subject"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <span style={{ fontSize: "20px" }}>Message </span>
                      <span style={{ color: "lightgreen", fontSize: "20px" }}>
                        *
                      </span>
                      <textarea
                        className="form-control w-100"
                        onChange={onChangeHandler}
                        name="message"
                        id="message"
                        cols={30}
                        rows={9}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-lg-3">
                    <button type="submit" className="main_btn">
                      Envoyer la demande
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }


export default Devis