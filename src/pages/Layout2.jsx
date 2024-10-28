import React, { useEffect, useState } from 'react'
import productservice from '../services/productservice';
import { Link } from 'react-router-dom';

function Layout2() {
  const [product, setProduct] = useState([]);
  const [affiche, setAffiche] = useState(false);
  const getAllProduct = () => {
    productservice
      .GetAll()
      .then((res) => {
        setProduct(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log();
      });
  };
  useEffect(() => {
    getAllProduct();
  }, []);

   const [currentIndex, setCurrentIndex] = useState(0);

   const slides = [
     { id: 1, src: "images/carousel-1.jpg" },
     { id: 2, src: "images/carousel-2.jpg" },
   ];

   const showSlide = (index) => {
     if (index >= slides.length) {
       setCurrentIndex(0);
     } else if (index < 0) {
       setCurrentIndex(slides.length - 1);
     } else {
       setCurrentIndex(index);
     }
   };

   const handleNext = () => {
     showSlide(currentIndex + 1);
   };

   const handlePrev = () => {
     showSlide(currentIndex - 1);
   };

  return (
    <div>
      {/* Start Slider */}
      <div id="slides-shop" className="cover-slides">
        <ul className="slides-container">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className={`text-center ${
                index === currentIndex ? "active" : ""
              }`}
              style={{ display: index === currentIndex ? "block" : "none" }}
            >
              <img src={slide.src} alt="" />
              <div className="container">
                <div className="row">
                  <div className="col-md-12"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="slides-navigation">
          <button className="prev" onClick={handlePrev}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </button>
          <button className="next" onClick={handleNext}>
            <i className="fa fa-angle-right" aria-hidden="true" />
          </button>
        </div>
       
      </div>
      {/* End Slider */}
      <section className="blog-area section-gap">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="main_title"
                style={{ marginTop: "-100%", marginBottom: "10%" }}
              >
                <h2
                  style={{
                    fontSize: "40px",
                    fontFamily: "Courier New",
                    color: "white",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    Bienvenue chez{" "}
                  </span>
                  <span
                    style={{
                      fontSize: "40px",
                      color: "white",
                      fontFamily: "VotrePoliceSpeciale",
                    }}
                  >
                    &nbsp; VIP Cleaning &nbsp;
                  </span>
                  <span
                    style={{
                      fontSize: "40px",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    {" "}
                  </span>
                </h2>{" "}
                <p style={{ fontSize: "20px", color: "white" }}>
                  Solution écologique complète de nettoyage à la vapeur sèche
                </p>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "-20%" }}>
            <div className="title-all text-center">
              <h1> Nos Services</h1>
              <p></p>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog">
                <div className="thumb">
                  <img
                    style={{ width: "350px", height: "350px" }}
                    className="img-fluid"
                    src="images/service1.jpg"
                    alt
                  />
                </div>
                <div className="short_details">
                  <h4>NETTOYAGE TAPIS ET MOQUETTE</h4>
                  <div className="text-wrap">
                    <p>
                      Désinfecter, nettoyer en profondeur, éliminer les
                      mauvaises odeurs, raviver les couleurs, retarder
                      l'encrassement et prolonger la durée de vie de tapis et
                      moquettes{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog">
                <div className="thumb">
                  <img
                    className="img-fluid"
                    style={{ width: "350px", height: "350px" }}
                    src="images/service2.jpg"
                    alt
                  />
                </div>
                <div className="short_details">
                  <h4> NETTOYAGE SALON,CANAPÉ ET CHAIS</h4>
                  <div className="text-wrap">
                    <p>
                      Le nettoyage et la rénovation de vos canapés, chaises,
                      pouffes, fauteuils, quel que soit leur type de textures
                      (tissu, cuir, velours…){" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog">
                <div className="thumb">
                  <img
                    className="img-fluid"
                    style={{ width: "350px", height: "350px" }}
                    src="images/service3.jpg"
                    alt
                  />{" "}
                </div>
                <div className="short_details">
                  <h4> NETTOYAGE RIDEAUX ET LUSTRES</h4>
                  <div className="text-wrap">
                    <p>
                      Le nettoyage à la vapeur est la solution idéale pour
                      nettoyer les rideaux et lustres sans les décrocher.{" "}
                    </p>
                  </div>
                  <Link to="/service" className="main_btn mt-40 ">
                    Tous les service
                    <span className="lnr lnr-arrow-right"></span>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start Products  */}
      <div className="products-box">
        <div className="container">
          <div className="title-all text-center">
            <h1> Nos Produits</h1>
            <p></p>
          </div>

          <div className="row special-list">
            {product.length > 0 &&
              product?.map((item) => {
                return (
                  <div className="col-lg-3 col-md-6 special-grid best-seller">
                    <div className="products-single fix">
                      <div className="box-img-hover">
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                          }}
                          src={`http://localhost:5000/file/articles/${item.image.replace(
                            /"/g,
                            ""
                          )}`}
                          alt=""
                        />
                      </div>
                      <div className="why-text">
                        <h4>{item.nomP}</h4>
                        <h5> {item.prix}DT</h5>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* End Products  */}
      {/* Start Blog  */}
      <div className="latest-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-all text-center">
                <h1> Nos Fonctionnalités</h1>
                <p></p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="blog-box">
                <div className="blog-img">
                  <img className="img-fluid" src="images/project-1.jpg" alt />
                </div>
                <div className="blog-content">
                  <div className="title-blog">
                    <h3>Réservoir Détachable</h3>
                    <p>
                      Réservoir Détachable permet de remplir facilement le
                      réservoir d'eau et, dans certains cas, de le retirer pour
                      le nettoyer.
                    </p>
                  </div>
                  <ul className="option-blog">
                    <li>
                      <a href="#">
                        <i className="far fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-comments" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="blog-box">
                <div className="blog-img">
                  <img className="img-fluid" src="images/project-2.jpg" alt />
                </div>
                <div className="blog-content">
                  <div className="title-blog">
                    <h3>Élimination des Allergènes</h3>
                    <p>
                      La vapeur chaude tue les acariens, les bactéries et les
                      moisissures, offrant ainsi une solution de nettoyage
                      idéale pour les personnes allergiques.
                    </p>
                  </div>
                  <ul className="option-blog">
                    <li>
                      <a href="#">
                        <i className="far fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-comments" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-4">
              <div className="blog-box">
                <div className="blog-img">
                  <img className="img-fluid" src="images/project-3.jpg" alt />
                </div>
                <div className="blog-content">
                  <div className="title-blog">
                    <h3>Utilisation Polyvalente</h3>
                    <p>
                      Peut être utilisé sur une variété de surfaces telles que
                      les sols, les tapis, les tissus d'ameublement, les
                      fenêtres, les carreaux, etc.
                    </p>
                  </div>
                  <ul className="option-blog">
                    <li>
                      <a href="#">
                        <i className="far fa-heart" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fas fa-eye" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-comments" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Blog  */}
      <section id="facility-content-section" class="ht-section">
        <div class="overlay">
          <div class="container">
            <div class="facilitybox">
              <div class="facility-box">
                <div class="clearfix"></div>
                <div class="facilityrightbox">
                  <div class="facility-post-wrap">
                    <div class="row facility-post-boxes">
                      <div class="col-md-3 col-sm-6 facspace">
                        <div class="facility-post wow zoomIn">
                          <div class="facility-icon">
                            <i class="fa-solid actions fa-pen-to-square"></i>
                          </div>
                          <div class="facilityborder"></div>
                          <div class="facility-num">Innovation </div>

                          <h5>Continue </h5>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div class="col-md-3 col-sm-6 facspace">
                        <div class="facility-post wow zoomIn">
                          <div class="facility-icon">
                            <i class="fa-solid actions fa-shield-halved"></i>
                          </div>
                          <div class="facilityborder"></div>
                          <div class="facility-num">Assurance </div>

                          <h5>100%</h5>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div class="col-md-3 col-sm-6 facspace">
                        <div class="facility-post wow zoomIn">
                          <div class="facility-icon">
                            <i class="fa-solid actions fa-circle-check"></i>
                          </div>
                          <div class="facilityborder"></div>
                          <div class="facility-num">Qualité du Service </div>

                          <h5>Impeccable</h5>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div class="col-md-3 col-sm-6 facspace">
                        <div class="facility-post wow zoomIn">
                          <div class="facility-icon">
                            <span class="fa fa-calendar actions"></span>
                          </div>
                          <div class="facilityborder"></div>
                          <div class="facility-num">Disponibilité </div>

                          <h5> 24/24h - 7/7j</h5>

                          <div class="clearfix"></div>
                        </div>
                      </div>

                      <div class="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </section>
    </div>
  );
}

export default Layout2