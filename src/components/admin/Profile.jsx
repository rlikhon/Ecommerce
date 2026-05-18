import React, { useState, useEffect, useContext, useRef } from "react";
import Layout from "../common/Layout";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Camera, Save, ArrowLeft, User } from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuth";
import { updateAdminProfileService, updateAdminAvatarService } from "../../services/AuthServices";

const Profile = () => {
  const { user, setUser } = useContext(AdminAuthContext);
  const fileInputRef = useRef(null);
  
  const [avatarUploading, setAvatarUploading] = useState(false);

  // ✅ FIX 1: Read localStorage directly during state initialization to stop cascading renders
  const [avatarPreview, setAvatarPreview] = useState(() => {
    const rawAdminInfo = localStorage.getItem("adminInfo");
    if (rawAdminInfo) {
      try {
        const parsedAdmin = JSON.parse(rawAdminInfo);
        return parsedAdmin.avatar_url || "";
      } catch (e) {
        console.error(e);
      }
    }
    return "";
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Hydrate only text inputs on mount
  useEffect(() => {
    const rawAdminInfo = localStorage.getItem("adminInfo");
    if (rawAdminInfo) {
      try {
        const parsedAdmin = JSON.parse(rawAdminInfo);
        setValue("fullName", parsedAdmin.name || "");
        setValue("email", parsedAdmin.email || "");
        setValue("bio", parsedAdmin.bio || "");
        setValue("location", parsedAdmin.location || "");
      } catch (error) {
        console.error("Error parsing local storage adminInfo:", error);
      }
    }
  }, [setValue]);

  const onProfileSave = async (data) => {
    try {
      const res = await updateAdminProfileService(data);
      if (res.status === 200) {
        const currentAdminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");
        const updatedAdminInfo = {
          ...currentAdminInfo,
          name: data.fullName,
          bio: data.bio,
          location: data.location
        };

        localStorage.setItem("adminInfo", JSON.stringify(updatedAdminInfo));
        setUser(updatedAdminInfo);
        toast.success(res.data.message || "Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile values.");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);
    setAvatarPreview(localPreviewUrl);
    setAvatarUploading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await updateAdminAvatarService(formData);
      if (res.status === 200) {
        const currentAdminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");
        const updatedAdminInfo = {
          ...currentAdminInfo,
          avatar_url: res.data.data.avatar_url
        };

        localStorage.setItem("adminInfo", JSON.stringify(updatedAdminInfo));
        setUser(updatedAdminInfo);
        toast.success("Avatar image updated!");
      }
    } catch (error) {
      toast.error("Avatar image upload failed.");
      console.error(error);
    } finally {
      setAvatarUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mt-5 pb-3 border-bottom">
          <div>
            <h4 className="h4 mb-1 fw-bold text-dark">Profile Information</h4>
            <p className="text-muted small mb-0">Manage your administrative identities and profile options.</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>

        <div className="row mt-4">
          <div className="col-md-3 col-lg-3 mb-4">
            <Sidebar />
          </div>

          <div className="col-md-9 col-lg-9">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4 p-md-5">
                <div className="row g-4 align-items-start">
                  
                  {/* ✅ FIX 2: Defensively structured placeholder frame grid alignment mapping */}
                  <div className="col-md-4 text-center">
                    <div className="position-relative d-inline-block mx-auto mb-3" style={{ width: "160px", height: "160px" }}>
                      {avatarPreview && avatarPreview.trim() !== "" ? (
                        <img
                          src={avatarPreview}
                          alt="Profile"
                          className={`rounded-circle w-100 h-100 object-fit-cover shadow-sm border ${avatarUploading ? "opacity-25" : ""}`}
                          onError={(e) => { 
                            e.target.style.display = "none";
                            setAvatarPreview(""); 
                          }}
                        />
                      ) : (
                        <div className="w-100 h-100 rounded-circle bg-light border d-flex align-items-center justify-content-center text-secondary shadow-sm">
                          <div className="text-center">
                            <User size={36} className="text-muted mb-1 opacity-50" />
                            <div className="small text-muted" style={{ fontSize: "11px" }}>No Avatar</div>
                          </div>
                        </div>
                      )}

                      <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="d-none" />
                      
                      <button 
                        type="button"
                        onClick={triggerFileSelect}
                        disabled={avatarUploading}
                        className="position-absolute btn btn-white rounded-circle shadow-sm border p-0 d-flex align-items-center justify-content-center"
                        style={{ 
                          bottom: "5px", 
                          right: "5px", 
                          zIndex: 5,
                          backgroundColor: "#ffffff",
                          width: "38px",
                          height: "38px"
                        }}
                      >
                        {avatarUploading ? <Spinner animation="border" size="sm" variant="primary" /> : <Camera size={16} className="text-muted" />}
                      </button>
                    </div>
                    <p className="small text-muted mb-0 mt-1">Click camera to upload</p>
                  </div>

                  <div className="col-md-8">
                    <form onSubmit={handleSubmit(onProfileSave)} className="d-flex flex-column gap-3">
                      <div>
                        <label className="form-label small fw-semibold text-secondary mb-1">Full Name</label>
                        <input
                          {...register("fullName", { required: "Full name is required" })}
                          type="text"
                          className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName.message?.toString()}</div>}
                      </div>

                      <div>
                        <label className="form-label small fw-semibold text-secondary mb-1">Email Address</label>
                        <input {...register("email")} type="email" className="form-control bg-light text-muted" disabled />
                      </div>

                      <div>
                        <label className="form-label small fw-semibold text-secondary mb-1">Bio Summary Description</label>
                        <textarea
                          {...register("bio", { maxLength: { value: 250, message: "Bio cannot exceed 250 characters" } })}
                          rows={3}
                          className={`form-control ${errors.bio ? "is-invalid" : ""}`}
                          placeholder="Write a brief description summary about yourself..."
                        />
                        {errors.bio && <div className="text-danger small mt-1">{errors.bio.message?.toString()}</div>}
                      </div>

                      <div>
                        <label className="form-label small fw-semibold text-secondary mb-1">Operational Base Location</label>
                        <input 
                          {...register("location")} 
                          type="text" 
                          className="form-control" 
                          placeholder="e.g. Dhaka, Bangladesh" 
                        />
                      </div>

                      <div className="pt-3 border-top mt-2 d-flex justify-content-end">
                        <Button type="submit" variant="primary" disabled={isSubmitting} className="d-flex align-items-center gap-2 px-4">
                          {isSubmitting ? (
                            <><Spinner animation="border" size="sm" /> <span>Saving...</span></>
                          ) : (
                            <><Save size={16} /> <span>Save Changes</span></>
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

export default Profile;
