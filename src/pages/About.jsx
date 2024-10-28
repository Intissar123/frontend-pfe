import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <div>
      <Header></Header>
      <div>
        {/* Start All Title Box */}
        <div className="all-title-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>ABOUT US</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">ABOUT US</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End All Title Box */}
        {/* Start About Page  */}
        <div className="about-box-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner-frame">
                  {" "}
                  <img className="img-fluid" src="images/about-img.jpg" alt />
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="noo-sh-title-top">Qui Somme Nous ?</h2>
                <div>
                  <p>
                    La société VIP Cleaning est une entreprise de nettoyage à la
                    vapeur, pour particuliers et professionnels en Tunisie.
                    Proposant de nombreux services de qualité professionnelle,
                    un devis gratuit et une intervention rapide. Ont vous
                    conseillons sur l’entretien de votre habitat et proposons le
                    nettoyage de bureaux, le nettoyage d’appartements, maisons
                    et tous locaux professionnels ou privés. <br />
                    <em>
                      Selon vos besoins, nous proposons des prestations de
                      nettoyage et d’entretien ponctuelles ou régulières, pour
                      un travail sur mesure. Et nous mettons à votre disposition
                      des personnels compétents pour vous assurer la qualité de
                      service et la rapidité d’exécution.
                    </em>
                  </p>
                  <em></em>
                </div>

                <a className="btn hvr-hover" href="#">
                  Read More
                </a>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-sm-6 col-lg-4">
                <div className="service-block-inner">
                  <h3>Innovation</h3>
                  <p>
                    Notre équipe cherche à innover nos services et à améliorer
                    nos modes de fonctionnement pour apporter toujours plus de
                    qualité de service et de valeur ajoutée à nos clients.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="service-block-inner">
                  <h3>Confiance</h3>
                  <p>
                    Nous croyons en la responsabilité personnelle et
                    professionnelle. Nous nous soucions de la façon dont notre
                    travail peut affecter nos clients et nous cherchons à faire
                    une différence.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4">
                <div className="service-block-inner">
                  <h3>Qualité</h3>
                  <p>
                    Parce que la qualité est notre priorité, nous offrons les
                    meilleurs services à nos clients afin de toujours mieux
                    répondre à leurs attentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default About