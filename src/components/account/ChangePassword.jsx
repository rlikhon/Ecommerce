import React from "react";
import Layout from "./../common/Layout";
import AccountSidebar from "./common/AccountSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { Lock, Save, ArrowLeft } from "lucide-react";
import { updateCustomerPasswordService } from "../../services/AccountAuthServices";

const ChangePassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Watch the new password field dynamically to perform real-time verification matching
  const newPasswordValue = watch("new_password");

  const onPasswordUpdate = async (data) => {
    try {
      const rawUserInfo = localStorage.getItem("userInfo");
      const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

      if (!token) {
        toast.error("Session missing. Please log in again.");
        return;
      }

      const res = await updateCustomerPasswordService(data, token);
      
      if (res.status === 200) {
        toast.success(res.data.message || "Security credentials updated successfully!");
        reset();
        navigate("/account/profile");
      }
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) {
        // Hydrate Laravel's explicit validation error objects back down to form inputs dynamically
        Object.keys(serverErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: Array.isArray(serverErrors[field]) ? serverErrors[field][0] : serverErrors[field],
          });
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to update security parameters.");
      }
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="breadcrumb" className="mt-4 mb-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/account/profile">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Update Password</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Left Column: Customer Navigation Menu Wrapper */}
          <div className="col-md-3 col-lg-3 mb-4">
            <AccountSidebar />
          </div>

          {/* Right Column: Secure Form Interface */}
          <div className="col-md-9 col-lg-9">
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4 p-md-5">
                <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <Lock size={18} className="text-muted" /> Access Parameter Configuration
                </h5>

                <Row>
                  <Col md={8} lg={6}>
                    <form onSubmit={handleSubmit(onPasswordUpdate)} className="d-flex flex-column gap-3" noValidate>
                      
                      {/* Field 1: Current Password */}
                      <div>
                        <label htmlFor="current_password" className="form-label small fw-semibold text-secondary mb-1">
                          Current Security Password
                        </label>
                        <input
                          {...register("current_password", { required: "Current password is required" })}
                          id="current_password"
                          type="password"
                          className={`form-control ${errors.current_password ? "is-invalid" : ""}`}
                          placeholder="Enter current password"
                        />
                        {errors.current_password && (
                          <div className="invalid-feedback d-block">{errors.current_password.message}</div>
                        )}
                      </div>

                      {/* Field 2: New Password */}
                      <div>
                        <label htmlFor="new_password" className="form-label small fw-semibold text-secondary mb-1">
                          New Secure Password
                        </label>
                        <input
                          {...register("new_password", { 
                            required: "A new password is required",
                            minLength: { value: 8, message: "New credentials must be at least 8 characters long" }
                          })}
                          id="new_password"
                          type="password"
                          className={`form-control ${errors.new_password ? "is-invalid" : ""}`}
                          placeholder="Enter new password"
                        />
                        {errors.new_password ? (
                          <div className="text-danger small mt-1">{errors.new_password.message}</div>
                        ) : (
                          <div className="text-muted small mt-1">Minimum 8 characters required.</div>
                        )}
                      </div>

                      {/* Field 3: Confirm New Password with Custom Match Validation */}
                      <div>
                        <label htmlFor="new_password_confirmation" className="form-label small fw-semibold text-secondary mb-1">
                          Confirm New Encryption Key
                        </label>
                        <input
                          {...register("new_password_confirmation", { 
                            required: "Please confirm your new password",
                            validate: (value) => value === newPasswordValue || "The confirmation password strings do not match."
                          })}
                          id="new_password_confirmation"
                          type="password"
                          className={`form-control ${errors.new_password_confirmation ? "is-invalid" : ""}`}
                          placeholder="Confirm new password"
                        />
                        {errors.new_password_confirmation && (
                          <div className="invalid-feedback d-block">{errors.new_password_confirmation.message}</div>
                        )}
                      </div>

                      {/* Submit Trigger Action Line */}
                      <div className="pt-3 border-top mt-2 d-flex justify-content-end">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          disabled={isSubmitting} 
                          className="d-flex align-items-center gap-2 px-4"
                        >
                          {isSubmitting ? (
                            <>
                              <Spinner animation="border" size="sm" /> <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <Save size={16} /> <span>Commit Access Key Changes</span>
                            </>
                          )}
                        </Button>
                      </div>

                    </form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
