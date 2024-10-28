import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import productService from "../services/productservice";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

function ShopDetail() {
  const [Data, SetData] = useState();
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const [affiche, setAffiche] = useState(false);
  const [addToCartDisabled, setAddToCartDisabled] = useState(false);

  useEffect(() => {
    productService
      .GetOne(id)
      .then((res) => {
        console.log(res);
        SetData(res.data.data);
        setAffiche(true);
      })
      .catch((erreur) => {
        console.log(erreur);
      });
  }, [id]);
  console.log(Data);
  const isConnected = localStorage.getItem("token");
  const total = quantity * (Data?.prix || 0);
  const imageUrl = Data?.image
    ? `http://localhost:5000/file/articles/${Data.image.replace(/"/g, "")}`
    : "path/to/default/image.jpg"; // Provide a fallback image URL

  const addItem = () => {
    const cartItems = {
      id: Data.id,
      nomP: Data.nomP,
      prix: Data.prix,
      qte: quantity,
      total: total,
      image: Data.image,
    };

    let existCart = JSON.parse(localStorage.getItem("cart"));

    if (!existCart || !Array.isArray(existCart)) {
      existCart = [];
    }
  alert("produit ajouté");
    const newItem = [...existCart, cartItems];
    console.log(newItem);

    localStorage.setItem("cart", JSON.stringify(newItem));
  };
  if (affiche) {
    const stockClass = Data?.stock > 1 ? "text-success" : "text-danger";

    return (
      <div>
        <Header />
        <div>
          {/* Start All Title Box */}
          <div className="all-title-box">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h2>Shop Detail</h2>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li className="breadcrumb-item active">Shop Detail</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End All Title Box */}
          {/* Start Shop Detail */}
          <div className="shop-detail-box-main">
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-6">
                  <div
                    id="carousel-example-1"
                    className="single-product-slider carousel slide"
                    Data-ride="carousel"
                  >
                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item active">
                        <img
                          style={{
                            width: "150px",
                            height: "150px",
                          }}
                          src={imageUrl}
                          alt={Data?.nomP || "Product Image"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-6">
                  <div className="single-product-details">
                    <h2>{Data?.nomP}</h2>
                    <h5>
                      <h2>{Data?.prix} DT</h2>
                    </h5>
                    <span className={stockClass}>
                      {Data?.quantity > 0 ? "disponible" : ""}
                    </span>

                    <li>
                      <div className="product_count">
                        <label htmlFor="qty">Quantité:</label>
                        <input
                          type="number"
                          name="quantity"
                          id="qte"
                          maxLength={10}
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value))
                          }
                          className="input-text qty"
                        />
                        {quantity > 10 ? (
                          <p style={{ color: "red" }}>
                            Quantité non disponible en stock
                          </p>
                        ) : (
                          <p style={{ color: "green" }}>Quantité disponible</p>
                        )}
                      </div>
                    </li>

                    <div className="price-box-bar">
                      <div className="cart-and-bay-btn">
                        {isConnected ? (
                          <Button
                            className="btn hvr-hover"
                            data-fancybox-close
                            onClick={addItem}
                            disabled={Data?.quantity < quantity}
                          >
                            Add to cart
                          </Button>
                        ) : (
                          <Button className="btn hvr-hover" to="/login">
                            Add to cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Cart */}
        </div>
        <Footer />
      </div>
    );
  }
}
export default ShopDetail;
