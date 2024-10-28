import React from 'react'
import { Link } from "react-router-dom";

function Header() {

  const isConnected = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <div>
      {/* Start Main Top */}
      <header className="main-header">
        {/* Start Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav">
          <div className="container">
            {/* Start Header Navigation */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar-menu"
                aria-controls="navbars-rs-food"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" />
              </button>
              <div className="app-branding">
                <a className="app-logo" href="index.html">
                  <Link to="/">
                    <img
                      className="logo"
                      style={{
                        fontWeight: "bold",
                        marginLeft: "5%",
                        marginTop: "-20%",
                        width: "90px",
                        height: "60px",
                      }}
                      src="images/logo1.png"
                      alt="logo"
                    />
                  </Link>
                </a>
              </div>
            </div>
            {/* End Header Navigation */}
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="navbar-menu">
              <ul
                className="nav navbar-nav ml-auto"
                data-in="fadeInDown"
                data-out="fadeOutUp"
              >
                <li className="nav-item active">
                  <Link className="nav-link" to="/home">
                    Acceuil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    A propos
                  </Link>
                </li>
                <li className="dropdown">
                  <Link
                    to="/shop"
                    className="nav-link dropdown-toggle arrow"
                    data-toggle="dropdown"
                  >
                    Produit
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/shop">Shop</Link>
                    </li>

                    <li>
                      <Link to="/cart">Cart</Link>
                    </li>

                    <li>
                      <Link to="/account">My Account</Link>
                    </li>
                    <li>
                      <Link to="/wishlist">Wishlist</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/service">
                    Service
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/devis">
                    Devis
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  {isConnected ? (
                    <button className="nav-link" onClick={logout}>
                      Logout
                    </button>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            {/* /.navbar-collapse */}
            {/* Start Atribute Navigation */}
            <div className="attr-nav">
              <ul>
                <li className="search">
                  <a href="#">
                    <i className="fa fa-search" />
                  </a>
                </li>
                <li className="side-menu">
                  <a href="#">
                    <i className="fa fa-shopping-bag" />
                    <span className="badge">3</span>
                    <li>
                      <Link to="/cart">Cart</Link>
                    </li>
                  </a>
                </li>
              </ul>
            </div>
            {/* End Atribute Navigation */}
          </div>
          {/* Start Side Menu */}
          <div className="side">
            <a href="#" className="close-side">
              <i className="fa fa-times" />
            </a>
            <li className="cart-box">
              <ul className="cart-list">
                <li>
                  <a href="#" className="photo">
                    <img
                      src="images/img-pro-01.jpg"
                      className="cart-thumb"
                      alt
                    />
                  </a>
                  <h6>
                    <a href="#">Delica omtantur </a>
                  </h6>
                  <p>
                    1x - <span className="price">$80.00</span>
                  </p>
                </li>
                <li>
                  <a href="#" className="photo">
                    <img
                      src="images/img-pro-02.jpg"
                      className="cart-thumb"
                      alt
                    />
                  </a>
                  <h6>
                    <a href="#">Omnes ocurreret</a>
                  </h6>
                  <p>
                    1x - <span className="price">$60.00</span>
                  </p>
                </li>
                <li>
                  <a href="#" className="photo">
                    <img
                      src="images/img-pro-03.jpg"
                      className="cart-thumb"
                      alt
                    />
                  </a>
                  <h6>
                    <a href="#">Agam facilisis</a>
                  </h6>
                  <p>
                    1x - <span className="price">$40.00</span>
                  </p>
                </li>
                <li className="total">
                  <a href="#" className="btn btn-default hvr-hover btn-cart">
                    VIEW CART
                  </a>
                  <span className="float-right">
                    <strong>Total</strong>: $180.00
                  </span>
                </li>
              </ul>
            </li>
          </div>
          {/* End Side Menu */}
        </nav>
        {/* End Navigation */}
      </header>
      {/* End Main Top */}
    </div>
  );
}

export default Header