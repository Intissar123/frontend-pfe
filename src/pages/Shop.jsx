import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import productService from "../services/productservice";


function Shop() {
  const [product, setProduct] = useState([]);
  const [affiche, setAffiche] = useState(false);

  const [inputText, setInputText] = useState("");

  // Affichage Produit
  const getAllProduct = () => {
    productService
      .GetAll()
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  const filteredData = product?.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.reference.toLowerCase().includes(inputText);
    }
  });

  return (
    <>
      <div>
        <Header />
        <div>
          {/* End Side Menu */}
          {/* End Navigation */}
          {/* End Main Top */}
          {/* Start Top Search */}
          <div className="top-search">
            <div className="container">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={inputText}
                  onChange={handleInputChange}
                />
                <span className="input-group-addon close-search">
                  <i className="fa fa-times" />
                </span>
              </div>
            </div>
          </div>
          {/* End Top Search */}
          {/* Start All Title Box */}
          <div className="all-title-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2>Shop</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Shop</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End All Title Box */}
          {/* Start Shop Page */}
          <div className="shop-box-inner">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-9 col-sm-12 col-xs-12 shop-content-right">
                  <div className="right-product-box">
                    <div className="product-item-filter row">
                      <div className="col-12 col-sm-8 text-center text-sm-left">
                        <p>Showing {filteredData.length} results</p>
                      </div>
                      <div className="col-12 col-sm-4 text-center text-sm-right">
                        <ul className="nav nav-tabs ml-auto">
                          <li>
                            <a
                              className="nav-link active"
                              href="#grid-view"
                              data-toggle="tab"
                            >
                              <i className="fa fa-th" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-categorie-box">
                      <div className="tab-content">
                        <div
                          role="tabpanel"
                          className="tab-pane fade show active"
                          id="grid-view"
                        >
                          <div className="row">
                            {filteredData?.map((item) => {
                              const imageUrl = item.image
                                ? `http://localhost:5000/file/articles/${item.image.replace(
                                    /"/g,
                                    ""
                                  )}`
                                : "path/to/default/image.jpg";

                              return (
                                <div
                                  className="col-sm-6 col-md-6 col-lg-4 col-xl-4"
                                  key={item.id}
                                >
                                  <div className="products-single fix">
                                    <div className="box-img-hover">
                                      <div className="type-lb">
                                        <p className="new">New</p>
                                      </div>
                                      <div>
                                        <img
                                          style={{
                                            width: "150px",
                                            height: "150px",
                                          }}
                                          src={imageUrl}
                                          alt={item.nomP}
                                        />
                                      </div>
                                    </div>
                                    <div className="mask-icon">
                                      <ul>
                                        <li>
                                          <Link
                                            to={`/shopDetail/${item.id}`}
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="View"
                                          >
                                            <i className="fas fa-eye" />
                                          </Link>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="Compare"
                                          >
                                            <i className="fas fa-sync-alt" />
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            href="#"
                                            data-toggle="tooltip"
                                            data-placement="right"
                                            title="Add to Wishlist"
                                          >
                                            <i className="far fa-heart" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="why-text">
                                    <a
                                      href={`/shopDetail/${item.id}`}
                                      className="d-block"
                                    >
                                      <h4>{item.nomP}</h4>
                                    </a>
                                    <h5>{item.prix} $</h5>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uncomment this block if you want to add the sidebar for categories and price filter */}
                {/* <div className="col-xl-3 col-lg-3 col-sm-12 col-xs-12 sidebar-shop-left">
                  <div className="product-categori">
                    <div className="search-product">
                      <form action="#">
                        <input
                          className="form-control"
                          placeholder="Search here..."
                          type="text"
                        />
                        <button type="submit">
                          <i className="fa fa-search" />
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
                        <div className="list-group-collapse sub-men">
                          {filteredData?.map((item) => {
                            return (
                              <>
                                <a
                                  className="list-group-item list-group-item-action"
                                  href="#sub-men1"
                                  data-toggle="collapse"
                                  aria-expanded="true"
                                  aria-controls="sub-men1"
                                >
                                  {item?.name}
                                  <small className="text-muted">(100)</small>
                                </a>
                                <div
                                  className="collapse show"
                                  id="sub-men1"
                                  data-parent="#list-group-men"
                                >
                                  <div className="list-group">
                                    <a
                                      href="#"
                                      className="list-group-item list-group-item-action active"
                                    >
                                      Fruits 1{" "}
                                      <small className="text-muted">
                                        (50)
                                      </small>
                                    </a>
                                    <a
                                      href="#"
                                      className="list-group-item list-group-item-action"
                                    >
                                      Fruits 2{" "}
                                      <small className="text-muted">
                                        (10)
                                      </small>
                                    </a>
                                    <a
                                      href="#"
                                      className="list-group-item list-group-item-action"
                                    >
                                      Fruits 3{" "}
                                      <small className="text-muted">
                                        (10)
                                      </small>
                                    </a>
                                    <a
                                      href="#"
                                      className="list-group-item list-group-item-action"
                                    >
                                      Fruits 4{" "}
                                      <small className="text-muted">
                                        (10)
                                      </small>
                                    </a>
                                    <a
                                      href="#"
                                      className="list-group-item list-group-item-action"
                                    >
                                      Fruits 5{" "}
                                      <small className="text-muted">
                                        (20)
                                      </small>
                                    </a>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="filter-price-left">
                      <div class="title-left">
                        <h3>Price</h3>
                      </div>
                      <div class="price-box-slider">
                        <div id="slider-range"></div>
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Shop;
