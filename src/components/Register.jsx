import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Layout from "./common/Layout";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message || "Registration failed");
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
                <h3 className="mb-4 text-center fw-bold">Account Register</h3>

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
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
                    "Register"
                  )}
                </button>
                <div className="mt-3 text-center">
                  <span className="text-muted">Already have an account?</span>
                  <Link to="/login" className="text-decoration-none fw-semibold">
                    &nbsp;Login
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

export default Register;
