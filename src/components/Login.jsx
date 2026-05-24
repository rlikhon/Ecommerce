import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "./common/Layout";
import { AccountAuthContext } from "./context/AccountAuth";

const Login = () => {
  // ✅ FIXED: Grabs the exact login invocation tracking key from your provider context file
  const { login } = useContext(AccountAuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Logged in successfully!");
        const userInfo = {
            token: result.token,
            id: result.user.id,
            name: result.user.name, 
            email: result.user.email,
            role: result.user.role,
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        login(userInfo);
        
        // ✅ ROUTING RESOLUTION: Diverts user to a protected path registered in your system architecture.
        // Change this route identifier to your target customer dashboard if it gets declared inside App.jsx
        navigate("/account/profile");
      } else {
        const formErrors = result.errors;
        if (formErrors) {
          Object.keys(formErrors).forEach((field) => {
            setError(field, {
              message: formErrors[field][0],
            });
          });
        } else {
          toast.error(result.message || "Invalid account login inputs.");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="login bg-white shadow-sm p-5 rounded-4">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className="mb-4 text-center fw-bold">Account Login</h3>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="mt-3 text-center">
                  <span className="text-muted">Don't have an account?</span>
                  <Link to="/account/register" className="text-decoration-none fw-semibold">
                    &nbsp;Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
