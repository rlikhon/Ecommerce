import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { createProductService } from "../../../services/ProductServices";
import { useCategories } from "../../../hooks/useCategories";
import { useBrands } from "../../../hooks/useBrands";
import JoditEditor from "jodit-react";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Use the hook to get categories and loading state
  const { categories, categoryLoading } = useCategories();
  const { brands, brandLoading } = useBrands();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder],
  );

  const navigate = useNavigate();

  const saveProduct = async (data) => {
    try {
      const res = await createProductService(data);
      toast.success(res.data.message || "Product created");
      navigate("/admin/products");
    } catch (error) {
      // Handled by interceptor
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Create Product</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3 col-lg-3">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-9">
            <div className="row">
              <form onSubmit={handleSubmit(saveProduct)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Title
                      </label>
                      <input
                        {...register("title", {
                          required: "Title is required",
                        })}
                        type="text"
                        className={`form-control ${errors.title && "is-invalid"}`}
                        placeholder="Title"
                      />
                      {errors.title && (
                        <div className="invalid-feedback">
                          {errors.title?.message}
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <label htmlFor="" className="form-label">
                          Category
                        </label>
                        <select
                          {...register("category_id", {
                            required: "Please select a category",
                          })}
                          className={`form-select ${errors.category_id ? "is-invalid" : ""}`}
                          disabled={categoryLoading}
                        >
                          <option value="">
                            {categoryLoading
                              ? "Loading categories..."
                              : "Select Category"}
                          </option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        {errors.category_id && (
                          <div className="invalid-feedback">
                            {errors.category_id.message?.toString()}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <label htmlFor="" className="form-label">
                          Brand
                        </label>
                        <select
                          {...register("brand_id", {
                            required: "Please select a brand",
                          })}
                          className={`form-select ${errors.brand_id && "is-invalid"}`}
                          disabled={brandLoading}
                        >
                          <option value="">
                            {brandLoading
                              ? "Loading brands..."
                              : "Select Brand"}
                          </option>
                          {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.name}
                            </option>
                          ))}
                          <option value="0">Y</option>
                        </select>
                        {errors.brand_id && (
                          <div className="invalid-feedback">
                            {errors.brand_id?.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Short Description
                      </label>
                      <textarea
                        {...register("short_description")}
                        className={`form-control`}
                        placeholder="Short description"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Description
                      </label>
                      <textarea
                        {...register("description")}
                        className={`form-control`}
                        placeholder="Description"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Description
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      />
                    </div>
                    <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Price
                          </label>
                          <input
                            {...register("price", {
                              required: "Price is required",
                            })}
                            type="text"
                            className={`form-control ${errors.price && "is-invalid"}`}
                            placeholder="Price"
                          />
                          {errors.title && (
                            <div className="invalid-feedback">
                              {errors.price?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Discounted Price
                          </label>
                          <input
                            {...register("discounted_price")}
                            type="text"
                            className={`form-control`}
                            placeholder="Discounted Price"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            SKU
                          </label>
                          <input
                            {...register("sku", {
                              required: "sku is required",
                            })}
                            type="text"
                            className={`form-control ${errors.sku && "is-invalid"}`}
                            placeholder="SKU"
                          />
                          {errors.sku && (
                            <div className="invalid-feedback">
                              {errors.sku?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Barcode
                          </label>
                          <input
                            {...register("barcode")}
                            type="text"
                            className={`form-control`}
                            placeholder="Barcode"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Qty
                          </label>
                          <input
                            {...register("qty", {
                              required: "qty is required",
                            })}
                            type="text"
                            className={`form-control ${errors.qty && "is-invalid"}`}
                            placeholder="Qty"
                          />
                          {errors.sku && (
                            <div className="invalid-feedback">
                              {errors.qty?.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
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
                      </div>
                    </div>
                    <h3 className="py-3 border-bottom mb-3">Gallary</h3>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <input
                        {...register("image")}
                        type="file"
                        className={`form-control`}
                        placeholder="Image"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-3 p-2 mb-5 ">
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
    </Layout>
  );
};

export default Create;
