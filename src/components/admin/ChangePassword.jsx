import React from "react";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Lock, Save, ArrowLeft } from "lucide-react";
import { updateAdminPasswordService } from "../../services/AuthServices";

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

  // Watch the new password field dynamically to perform real-time verification mapping
  const newPasswordValue = watch("new_password");

  // Handle asynchronous secure form submit pipelines
  const onPasswordUpdate = async (data) => {
    try {
      const res = await updateAdminPasswordService(data);
      if (res.status === 200) {
        toast.success(res.data.message || "Password credentials updated successfully!");
        reset(); // Wipe inputs clean for data isolation safety
        navigate("/admin/dashboard");
      }
    } catch (error) {
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) {
        // Hydrate Laravel's explicit validation error objects back down to form inputs dynamically
        Object.keys(serverErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: serverErrors[field][0],
          });
        });
      } else {
        toast.error(error.response?.data?.message || "An unexpected security validation failure occurred.");
      }
    }
  };

  return (
    <Layout>
      <div className="container">
        {/* ✅ FIXED: Corrected header contextual alignments and routing targets */}
        <div className="d-flex justify-content-between align-items-center mt-5 pb-3 border-bottom">
          <div>
            <h4 className="h4 mb-1 fw-bold text-dark">Security Credentials</h4>
            <p className="text-muted small mb-0">Modify your administrative backend panel encryption keys.</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        <div className="row mt-4">
          {/* Navigation Sidebar Layout Wrapper */}
          <div className="col-md-3 col-lg-3 mb-4">
            <Sidebar />
          </div>

          {/* Secure Modification View Area Column */}
          <div className="col-md-9 col-lg-9">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4 p-md-5">
                <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                  <Lock size={18} className="text-muted" /> Access Parameter Configuration
                </h5>

                <div className="row">
                  <div className="col-md-7 col-lg-6">
                    <form onSubmit={handleSubmit(onPasswordUpdate)} className="d-flex flex-column gap-3">
                      
                      {/* Field 1: Current Password */}
                      <div>
                        <label htmlFor="current_password" className="form-label small fw-semibold text-secondary mb-1">
                          Current Security Password
                        </label>
                        <input
                          {...register("current_password", { required: "Current account password is required" })}
                          id="current_password"
                          type="password"
                          className={`form-control ${errors.current_password ? "is-invalid" : ""}`}
                          placeholder="Enter your current password"
                        />
                        {errors.current_password && (
                          <div className="invalid-feedback">{errors.current_password.message?.toString()}</div>
                        )}
                      </div>

                      {/* Field 2: New Password */}
                      <div>
                        <label htmlFor="new_password" className="form-label small fw-semibold text-secondary mb-1">
                          New Secure Password
                        </label>
                        <input
                          {...register("new_password", { 
                            required: "A fresh password value is required",
                            minLength: { value: 8, message: "New credentials must register at least 8 characters long" }
                          })}
                          id="new_password"
                          type="password"
                          className={`form-control ${errors.new_password ? "is-invalid" : ""}`}
                          placeholder="Enter your new password"
                        />
                        <div className="d-flex justify-content-between mt-1">
                          <span className="text-danger small">{errors.new_password?.message?.toString()}</span>
                          <span className="text-muted xsmall">Requires letters & numbers mix.</span>
                        </div>
                      </div>

                      {/* Field 3: Confirm New Password with Custom Cross-Field Checker */}
                      <div>
                        <label htmlFor="new_password_confirmation" className="form-label small fw-semibold text-secondary mb-1">
                          Confirm New Encryption Key
                        </label>
                        <input
                          {...register("new_password_confirmation", { 
                            required: "Please re-type your chosen password to verify accuracy",
                            validate: (value) => value === newPasswordValue || "The security confirmation password strings do not match."
                          })}
                          id="new_password_confirmation"
                          type="password"
                          className={`form-control ${errors.new_password_confirmation ? "is-invalid" : ""}`}
                          placeholder="Confirm your new password"
                        />
                        {errors.new_password_confirmation && (
                          <div className="invalid-feedback">{errors.new_password_confirmation.message?.toString()}</div>
                        )}
                      </div>

                      {/* Actions Commit Trigger Button Line */}
                      <div className="pt-3 border-top mt-2 d-flex justify-content-start">
                        <Button 
                          type="submit" 
                          variant="primary" 
                          disabled={isSubmitting} 
                          className="d-flex align-items-center gap-2 px-4"
                        >
                          {isSubmitting ? (
                            <>
                              <Spinner animation="border" size="sm" /> <span>Encrypting...</span>
                            </>
                          ) : (
                            <>
                              <Save size={16} /> <span>Commit Access Key Changes</span>
                            </>
                          )}
                        </Button>
                      </div>

                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
