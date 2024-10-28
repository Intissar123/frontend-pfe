
import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { useRef } from "react";
import emailjs from "emailjs-com";

function Contact() {
   const form = useRef();
   const sendEmail = (e) => {
     e.preventDefault();
     emailjs
       .sendForm(
         "service_o5za0kv",
         "template_8cs440t",
         form.current,
         "Z9Y2k-TtekvHZNF_s"
       )
       .then((res) => {
         alert("SweetAlert2 is working!");
         console.log(res);
       })
       .catch((error) => {
         console.log(error);
       });
   };
  return (
    <>
      <Header></Header>
      <div>
        <div>
          {/* Start All Title Box */}
          <div className="all-title-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2>Contact Us</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active"> Contact Us </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End All Title Box */}
          {/* Start Contact Us  */}
          <div className="contact-box-main">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-sm-12">
                  <div className="contact-form-right">
                    
                    <form id="contactForm" ref={form} onSubmit={sendEmail}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="user_name"
                              placeholder="Your Name"
                              required
                              data-error="Please enter your name"
                            />
                            <div className="help-block with-errors" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Your Email"
                              id="email"
                              className="form-control"
                              name="user_email"
                              required
                              data-error="Please enter your email"
                            />
                            <div className="help-block with-errors" />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              id="message"
                              placeholder="Your Message"
                              rows={4}
                              data-error="Write your message"
                              required
                              defaultValue={""}
                            />
                            <div className="help-block with-errors" />
                          </div>
                          <div className="submit-button text-center">
                            <button
                              className="btn hvr-hover"
                              id="submit"
                              type="submit"
                            >
                              Send Message
                            </button>
                            <div
                              id="msgSubmit"
                              className="h3 text-center hidden"
                            />
                            <div className="clearfix" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-12">
                  <div className="contact-info-left">
                    <h2>CONTACT INFO</h2>
                    <p>
                      Cette nouvelle technologie permet de nettoyer, dégraisser
                      et désinfecter surfaces, machines, équipements en
                      préservant l’environnement et la santé. Elle associe de la
                      vapeur d’eau avec/sans détergent sous haute pression et
                      haute température. Le pouvoir désinfectant de la vapeur
                      est très élevé. Elle supprime le bio film laissé par les
                      actions manuelles de nettoyage et de désinfection chimique
                      ainsi que les salissures. La méthode permet également
                      d’obtenir un séchage très rapide des surfaces.
                    </p>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Cart */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Contact