import { useContext } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { CartContext } from "./context/Cart";
import CartButton from "./buttons/CartButton";
import DefaultProductImg from "../assets/images/Mens/five.jpg";

const Cart = () => {
  // ✅ THE FIX 1: Destructure your state setters and action methods from CartContext cleanly
  const { cartData, setCartData, grandTotal, subTotal, shipping, removeFromCart } = useContext(CartContext);

  return (
    <Layout>
      <div className="container product-detail py-4">
        <div className="row">
          {/* Breadcrumb row tracking */}
          <div className="col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Cart</li>
              </ol>
            </nav>
          </div>
          
          {/* Main Ledger Core Workspace */}
          <div className="col-md-12">
            <h2 className="border-bottom pb-3 fw-bold text-dark">Shopping Cart</h2>
            
            {/* Handle Empty State Gracefully */}
            {!cartData || cartData.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p className="fs-5 mb-3">Your shopping cart is currently empty.</p>
                <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
              </div>
            ) : (
              <table className="table align-middle">
                <thead>
                  <tr className="table-light text-secondary small">
                    <th scope="col">Product info</th>
                    <th scope="col">Details</th>
                    <th scope="col" className="text-center">Quantity</th>
                    <th scope="col" className="text-end pe-3">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item) => (
                    <tr key={item.id} className="border-bottom">
                      {/* Product Image Cover Cell */}
                      <td width={110}>
                        <div className="border rounded overflow-hidden p-1 bg-white" style={{ width: "90px", height: "90px" }}>
                          <img 
                            src={item.image_url || DefaultProductImg} 
                            alt={item.title} 
                            className="w-100 h-100 object-fit-cover"
                            onError={(e) => { e.target.src = DefaultProductImg; }}
                          />
                        </div>
                      </td>
                      
                      {/* Meta Information Cell */}
                      <td>
                        <h5 className="fw-semibold text-dark mb-1">{item.title || item.name}</h5>
                        <div className="d-flex align-items-center gap-3 mt-1 small">
                          <span className="text-dark fw-bold">${parseFloat(item.price).toFixed(2)}</span>
                          {item.size && (
                            <div className="d-flex align-items-center">
                              <span className="text-muted">Size:</span>
                              <span className="badge bg-light text-dark border ms-1 fw-semibold px-2 py-1">{item.size}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      {/* ✅ THE FIX 2: Removed double-nested <td> structures and passed reference state hooks */}
                      <td className="text-center">
                        <CartButton
                          item={item}
                          cartData={cartData}
                          setCartData={setCartData}
                        />
                      </td>
                      
                      {/* ✅ THE FIX 3: Fully Functional Trash Trigger Event Handler mapping context loops */}
                      <td className="text-end pe-3">
                        <button
                          type="button"
                          className="btn btn-link text-danger p-2 shadow-none border-0 rounded-circle"
                          onClick={() => {
                            if (removeFromCart) {
                              removeFromCart(item.id);
                            } else {
                              // Direct state mutation fallback layer tracking if method doesn't exist in local context
                              const updatedCart = cartData.filter(p => p.id !== item.id);
                              setCartData(updatedCart);
                              localStorage.setItem("cart", JSON.stringify(updatedCart));
                            }
                          }}
                          style={{ transition: "0.2s", backgroundColor: "transparent" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(220, 53, 69, 0.08)"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                          title="Remove item from cart"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Totals Summary Panel Card */}
        {cartData && cartData.length > 0 && (
          <div className="row justify-content-end mt-4">
            <div className="col-md-4 col-lg-3">
              <div className="card border-0 shadow-sm bg-light p-3 rounded">
                <div className="d-flex justify-content-between py-2 border-bottom border-white">
                  <div className="text-secondary small">Subtotal</div>
                  <div className="fw-semibold text-dark">${subTotal}</div>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom border-white">
                  <div className="text-secondary small">Shipping Cost</div>
                  <div className="fw-semibold text-dark">${shipping}</div>
                </div>
                <div className="d-flex justify-content-between py-3">
                  <div><strong className="text-dark">Grand Total</strong></div>
                  <div><strong className="text-primary fs-5">${grandTotal}</strong></div>
                </div>
                <div className="pt-2">
                  <Link to="/checkout" className="btn btn-primary w-100 py-2 fw-semibold shadow-sm text-center d-block">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
