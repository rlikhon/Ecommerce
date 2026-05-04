import React, { useContext } from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { adminLogin as loginService} from "../../services/AuthServices";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuth";

const Login = () => {
  const {login} = useContext(AdminAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginService(data);
      // Success toast is still handled in component for specific feedback
      toast.success(res.data.message || "Login Successful!");
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.data));
      

      login(res.data.data);
      navigate("/admin/dashboard");
    } catch (error) {
      //toast.error(error.response?.data?.message || "Login Failed!");
      // The interceptor already showed the toast!
      // You don't need toast.error() here unless you want a special message.
    }
  };
  //console.log(errors);

  return (
    <Layout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="login bg-white shadow-sm p-5 rounded-4">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className="mb-4 text-center fw-bold">Admin Login</h3>

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
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
