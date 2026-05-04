import React from "react";
import LogoWhite from "../../assets/images/logo-white.png";

const Footer = () => {
  return (
    <footer className="text-white p-4">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-3">
            <img src={LogoWhite} alt="" height="50px" />
            <div className="pt-3 pe-4">
              <p className="mb-0">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <h2 className="mb-3">Categories</h2>
            <ul>
              <li>
                <a href="">Kids</a>
              </li>
              <li>
                <a href="">Men</a>
              </li>
              <li>
                <a href="">Women</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h2 className="mb-3">Quick Link</h2>
            <ul>
              <li>
                <a href="">Login</a>
              </li>
              <li>
                <a href="">Registration</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h2 className="mb-3">Follow Us</h2>
            <ul>
              <li className="mb-3">
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 3.583 2.901 6.49 6.611 7.008v-4.93H3.283V8.05h2.328V6.025c0-2.303 1.407-3.581 3.463-3.581 1.02 0 2.142.192 2.142.192v2.364H9.55c-1.076 0-1.425.654-1.425 1.34v1.84h2.672l-.354 2.328h-2.328v4.93c3.71.519 6.611 2.43 6.611 7.008" />
                  </svg>{" "}
                  Facebook
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  className="text-decoration-none d-flex align-items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0zm0 1.441c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.844.047 1.097.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm0 2.446a4.113 4.113 0 1 0 0 8.227 4.113 4.113 0 0 0 0-8.227zm0 6.786a2.673 2.673 0 1 1 0-5.346 2.673 2.673 0 0 1 0 5.346zm4.103-7.917a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92z" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="#"
                  className="text-decoration-none d-flex align-items-center gap-2"
                >
                  <svg
                    xmlns="http://w3.org"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row spotlight py-5 mt-5">
          <div className="col-md-4">
            <div className="flex justify-content-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-truck"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
              </svg>
              <h3 className="text-white">Free Delivery</h3>
              <p className="text-white fs-6">On Orders Over $50</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="flex justify-content-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cash"
                viewBox="0 0 16 16"
              >
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path>
              </svg>
              <h3 className="text-white">Money Back Guarantee</h3>
              <p className="text-white">30 Days Money Back</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="flex justify-content-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-credit-card-2-back"
                viewBox="0 0 16 16"
              >
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path>
              </svg>
              <h3 className="text-white">Online Support</h3>
              <p className="text-white">24/7 Online Support</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <p className="text-white mb-0 small">
              © 2026 All rights reserved. Developed by <a href=""></a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
