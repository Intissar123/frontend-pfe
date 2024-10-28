import React from "react";

function Footer() {
  return (
    <footer
      style={{
        padding: "10px 0",
        fontSize: "small",
        backgroundColor: "black",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="footer-link-contact">
              <h4>Contact Us</h4>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                <li>
                  <p style={{ margin: 0 }}>
                    <i className="fas fa-map-marker-alt" /> Address: Tunis,
                    Sousse. <br />
                  </p>
                </li>
                <li>
                  <p style={{ margin: 0 }}>
                    <i className="fas fa-phone-square" /> Phone:{" "}
                    <a href="tel:+1-888705770">+216 98564231</a>
                  </p>
                </li>
                <li>
                  <p style={{ margin: 0 }}>
                    <i className="fas fa-envelope" /> Email:{" "}
                    <a href="mailto:contactinfo@gmail.com">
                      vipcleaning@gmail.com
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
