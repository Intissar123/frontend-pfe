import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import orderService from "../services/orderService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Button } from "bootstrap";
import { toast } from "react-toastify";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState({});
 
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    fetch(`http://localhost:5000/coupon?code=${code}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false && data.message) {
          toast.error(data.message);
        } else if (data.coupon) {
          const coupon = data.coupon;
          const usedCount = data.usedCount;
          const usageLimit = data.usageLimit;

          console.log("usedCount:", usedCount);
          console.log("usageLimit:", usageLimit);

          if (usedCount >= usageLimit) {
            toast.error("Coupon has reached its usage limit.");
          } else {
            setDiscount(coupon.discount);
            toast.success("Coupon applied successfully!");
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to apply the coupon.");
      });
  };


  useEffect(() => {
    const existCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(existCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.total, 0);
  };

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const cmd = {
    status: "en cours",
    totalAmount: calculateTotal(),
    location: data.location,
    city: data.city,
    address: data.address,
    phoneNumber: data.phone,
    delivery: "7",
    cartItems: cartItems,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    orderService
      .create(cmd)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
   
  return (
    <div>
      <Header />

      <div>
        {/* Start All Title Box */}
        <div className="all-title-box">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Cart</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Shop</Link>
                  </li>
                  <li className="breadcrumb-item active">Cart</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End All Title Box */}
        {/* Start Cart  */}
        <div className="cart-box-main">
          <div className="container">
            <div className="row">
              <form onSubmit={onSubmitHandler}>
                <div className="col-lg-12">
                  <div className="table-main table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Images</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <Link
                              to={`/details/${item.id}`}
                              style={{ color: "green", textDecoration: "none" }}
                            >
                              <td className="thumbnail-img">
                                <a href="#">
                                  <img
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                    }}
                                    src={`http://localhost:5000/file/articles/${item.image.replace(
                                      /"/g,
                                      ""
                                    )}`}
                                    alt={item.nomP || "Product Image"}
                                  />
                                </a>
                              </td>
                            </Link>
                            <td className="price-pr">
                              <p>{item.nomP} </p>
                            </td>

                            <td className="price-pr">
                              <p>{item.prix} DT</p>
                            </td>
                            <td className="quantity-box">
                              <input
                                type="number"
                                size={4}
                                defaultValue={item.qte}
                                min={0}
                                step={1}
                                className="c-input-text qty text"
                                readOnly
                              />
                            </td>
                            <td className="total-pr">
                              <p>{item.total} DT</p>
                            </td>
                            <td className="remove-pr">
                              <button onClick={() => removeFromCart(index)}>
                                <i className="fas fa-times" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td
                            colSpan="3"
                            scope="col"
                            style={{ textAlign: "right" }}
                          >
                            Total :
                          </td>
                          <td>{calculateTotal()} DTN</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="section-top-border"
                  style={{ marginLeft: "5%" }}
                >
                  <div className="row my-5">
                    <div className="col-lg-6 col-sm-6">
                      <div className="coupon-box">
                        <div className="input-group input-group-sm">
                          <input
                            className="form-control"
                            placeholder="Enter your coupon code"
                            aria-label="Coupon code"
                            type="text"
                            name="coupon_code"
                            id="coupon_code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-theme"
                              type="button"
                              name="apply_coupon"
                              value="Apply coupon"
                              onClick={applyCoupon}
                            >
                              Apply Coupon
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-6"></div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 col-md-8">
                      <h3 className="mb-30 title_color">Adresse</h3>
                      <form onSubmit={onSubmitHandler}>
                        <fieldset>
                          <div className="form-group mt-10">
                            <label htmlFor="location"></label>
                            <input
                              type="text"
                              id="location"
                              name="location"
                              placeholder="Gouvernorat"
                              required
                              className="form-control"
                              onChange={onChangeHandler}
                            />
                          </div>
                          <div className="form-group mt-10">
                            <label htmlFor="city"></label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              placeholder="Ville"
                              required
                              className="form-control"
                              onChange={onChangeHandler}
                            />
                          </div>
                          <div className="form-group mt-10">
                            <label htmlFor="address"></label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              placeholder="Adresse"
                              required
                              className="form-control"
                              onChange={onChangeHandler}
                            />
                          </div>
                          <div className="form-group mt-10">
                            <label htmlFor="postalCode"></label>
                            <input
                              type="number"
                              id="postalCode"
                              name="postalCode"
                              placeholder="Code postal"
                              required
                              className="form-control"
                              onChange={onChangeHandler}
                            />
                          </div>
                          <div className="form-group mt-10">
                            <label htmlFor="phone"></label>
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              placeholder="Téléphone"
                              required
                              className="form-control"
                              onChange={onChangeHandler}
                            />
                          </div>
                        </fieldset>
                      </form>
                    </div>
                    <div className="col-lg-3 col-md-4 mt-sm-30 element-wrap">
                      <div className="single-element-widget">
                        <h3 className="mb-30 title_color">
                          Méthode de livraison :
                        </h3>
                        <div className="form-group">
                          <label htmlFor="delivery-select"></label>
                          <select
                            id="delivery-select"
                            name="modelivraision"
                            className="form-control"
                            onChange={onChangeHandler}
                          >
                            <option value="A domicile" selected>
                              A domicile
                            </option>
                            <option value="Ramassage en magasin">
                              Ramassage en magasin
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="single-element-widget">
                        <h3 className="mb-30 title_color">
                          Méthode de paiement :
                        </h3>
                        <div className="form-group">
                          <label htmlFor="payment-select"></label>
                          <select
                            id="payment-select"
                            name="modepaiement"
                            className="form-control"
                            onChange={onChangeHandler}
                          >
                            <option value="Carte bancaire" selected>
                              Carte bancaire
                            </option>
                            <option value="chèque">Chèque</option>
                            <option value="Espèce">Espèces</option>
                            <option value="livraison">A la livraison</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="main_btn"
                          style={{
                            marginTop: "47%",
                            marginLeft: "40%",
                            height: "56px",
                            width: "119px",
                          }}
                        >
                          Achetez
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* End Cart */}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
