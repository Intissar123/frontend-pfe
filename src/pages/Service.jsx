import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import serviceService from '../services/serviceService';
import { Link } from 'react-router-dom';

function Service() {
  const [service, setservice] = useState([]);
  const [affiche, setAffiche] = useState(false);
  //const { cartItems, addToCart } = useContext(WrapperContext);

  //Affichage Produit
  const getAllService = () => {
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
    getAllService();
  }, []);
  const [inputText, setInputText] = useState("");

  const filteredData = service?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.reference.toLowerCase().includes(inputText);
    }
  });





    return (
      <div>
        <Header></Header>
        <div>
          {/* Start All Title Box */}
          <div className="all-title-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2>Services</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End All Title Box */}
          {/* Start Shop Page  */}
          <div className="shop-box-inner">
            <div className="container">
              <div className="row">
                <div
                  className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right"
                  style={{ marginLeft: "-30%" }}
                >
                  <div className="right-product-box">
                    <div className="product-categorie-box">
                      <div className="tab-content">
                        {/* les services avec nom et prix et description */}

                        <div className="list-view-box">
                          <div className="row">
                            {filteredData?.map((item) => {
                              return (
                                <>
                                  <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                                    <div className="products-single fix">
                                      <div className="box-img-hover"></div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                                    <div className="why-text full-width">
                                      <h4>{item?.name}</h4>

                                      <h5>{item.cost} DT</h5>

                                      <p>{item?.description}</p>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left"
                  style={{ marginLeft: "21rem", padding: "20px",marginTop: "1rem" }}
                >
                  <div className="product-categori">
                    <div className="search-product">
                      <form action="#">
                        <input
                          className="form-control"
                          placeholder="Search here..."
                          type="text"
                        />
                        <button type="submit">
                          {" "}
                          <i className="fa fa-search" />{" "}
                        </button>
                      </form>
                    </div>
                    <div className="filter-sidebar-left">
                      <div className="title-left">
                        <h3>Categories</h3>
                      </div>
                      <div
                        className="list-group list-group-collapse list-group-sm list-group-tree"
                        id="list-group-men"
                        data-children=".sub-men"
                      >
                        {/*category service */}
                        <div className="list-group-collapse sub-men">
                          <a
                            className="list-group-item list-group-item-action"
                            href="#sub-men2"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="sub-men2"
                          >
                            Canapé
                            <small className="text-muted"></small>
                          </a>
                        </div>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          {" "}
                          Moquette <small className="text-muted"> </small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          {" "}
                          Siège de voiture{" "}
                          <small className="text-muted"></small>
                        </a>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          {" "}
                          Fauteuil <small className="text-muted"></small>
                        </a>
                      </div>
                    </div>
                    <div className="filter-price-left">
                      <div className="title-left">
                        <h3>Price</h3>
                      </div>
                      <div className="price-box-slider">
                        <div id="slider-range" />
                        <p>
                          <input
                            type="text"
                            id="amount"
                            readOnly
                            style={{
                              border: 0,
                              color: "#fbb714",
                              fontWeight: "bold",
                            }}
                          />
                          <button className="btn hvr-hover" type="submit">
                            Filter
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Shop Page */}
        </div>

        <Footer></Footer>
      </div>
    );
  }


export default Service