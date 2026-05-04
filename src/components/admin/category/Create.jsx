import React, { useEffect } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCategoryService } from "../../../services/CategoryServices";

const Create = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  // Watch the "name" field for changes
  const categoryName = watch("name");

  // Helper function to create the slug
  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")     // Remove special characters
      .replace(/[\s_-]+/g, "-")     // Replace spaces with hyphens
      .replace(/^-+|-+$/g, "");     // Trim hyphens
  };

  // Automatically update slug when name changes
  useEffect(() => {
    if (categoryName) {
      setValue("slug", slugify(categoryName), { shouldValidate: true });
    }
  }, [categoryName, setValue]);

  const saveCategory = async (data) => {
    try {
      const res = await createCategoryService(data);
      toast.success(res.data.message || "Category created");
      navigate("/admin/categories");
    } catch (error) {
      // Handled by interceptor
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Create category</h4>
            <Link to="/admin/categories" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3 col-lg-3">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-9">
            <div className="row">
              <div className="card shadow">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit(saveCategory)}>
                    <div className="card shadow">
                      <div className="card-body p-4">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Name
                          </label>
                          <input
                            {...register("name", {
                              required: "Name is required",
                            })}
                            type="text"
                            className={`form-control ${errors.name && "is-invalid"}`}
                            placeholder="Name"
                          />
                          {errors.name && (
                            <div className="invalid-feedback">
                              {errors.name?.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Slug
                          </label>
                          <input
                            {...register("slug", {
                              required: "Slug is required",
                            })}
                            type="text"
                            className={`form-control ${errors.slug && "is-invalid"}`}
                            placeholder="Name"
                          />
                          {errors.slug && (
                            <div className="invalid-feedback">
                              {errors.slug?.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Status
                          </label>
                          <select
                            {...register("status", {
                              required: "Status is required",
                            })}
                            className={`form-select ${errors.status && "is-invalid"}`}
                          >
                            <option value="">Select status</option>
                            <option value="1">Active</option>
                            <option value="0">Block</option>
                          </select>
                          {errors.status && (
                            <div className="invalid-feedback">
                              {errors.status?.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-3 p-2 ">
                      <button
                        className="btn btn-primary py-2 fw-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
