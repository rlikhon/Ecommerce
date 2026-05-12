import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createProductService,
  uploadImageService,
} from "../../../services/ProductServices";
import { useCategories } from "../../../hooks/useCategories";
import { useBrands } from "../../../hooks/useBrands";
import { useSizes } from "../../../hooks/useSizes";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [gallary, setGallary] = useState([]);
  const [gallaryImages, setGallaryImages] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    watch, // Add watch here
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      status: 1,
      is_featured: "no",
    },
  });

  // Use the hook to get categories and loading state
  const { categories, categoryLoading } = useCategories();
  const { brands, brandLoading } = useBrands();
  const { sizes, sizesLoading } = useSizes();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder],
  );

  const navigate = useNavigate();

  // Watch prices to calculate margin/discount in real-time
  const price = watch("price");
  const comparePrice = watch("compare_price");

  const calculateDiscount = () => {
    if (
      !price ||
      !comparePrice ||
      parseFloat(price) >= parseFloat(comparePrice)
    )
      return null;
    const savings = ((comparePrice - price) / comparePrice) * 100;
    return savings.toFixed(0);
  };

  const saveProduct = async (data) => {
    const formData = { ...data, description: content, gallary: gallary };
    console.log(formData);

    try {
      const res = await createProductService(formData);
      toast.success(res.data.message || "Product created");
      navigate("/admin/products");
    } catch (error) {
      //toast.error(error.response.data.message || "Something went wrong");
      const formErrors = error.response.data.errors;
      Object.keys(formErrors).forEach((field) => {
        setError(field, {
          message: formErrors[field][0],
        });
      });
    }
  };

  const handleFile2 = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    const res = await uploadImageService(formData);
    //const { id, image_url } = res.data.data;
    const previewUrl = URL.createObjectURL(file);
    gallary.push(res.data.data.id);
    setGallary(gallary);
    //setGallary((prev) => [...prev, res.data.data.id]);

    gallaryImages.push(res.data.data.image_url);
    setGallaryImages(gallaryImages);
    //setGallaryImages((prev) =>
    //    prev.map((img) => (img === previewUrl ? res.data.data.image_url : img)),
    //  );
    console.log(gallaryImages);
  };

  const deleteImage2 = (image) => {
    const newGallary = gallaryImages.filter((gallary) => gallary !== image);
    setGallaryImages(newGallary);
  };

  const [isUploading, setIsUploading] = useState(false);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Create a local preview instantly
    const previewUrl = URL.createObjectURL(file);

    // 2. Optimistically update UI (Senior practice: never use .push on state)
    setGallaryImages((prev) => [...prev, previewUrl]);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadImageService(formData);
      const { id, image_url } = res.data.data;

      // 3. Sync with actual server data
      setGallary((prev) => [...prev, id]);

      // Replace the blob preview with the permanent server URL
      setGallaryImages((prev) =>
        prev.map((img) => (img === previewUrl ? image_url : img)),
      );

      toast.success("Image uploaded");
    } catch (error) {
      // 4. Rollback UI on failure
      setGallaryImages((prev) => prev.filter((img) => img !== previewUrl));
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setGallaryImages((prev) => prev.filter((_, i) => i !== index));
        setGallary((prev) => prev.filter((_, i) => i !== index));
        toast.success("Image deleted");
      }
    });
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
                    <div className="product-information-block">
                      <h3 className="py-3 border-bottom mb-3">
                        Product Information
                      </h3>

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
                              <option key={`category-${cat.id}`} value={cat.id}>
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
                              <option
                                key={`brand-${brand.id}`}
                                value={brand.id}
                              >
                                {brand.name}
                              </option>
                            ))}
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
                        <JoditEditor
                          ref={editor}
                          value={content}
                          config={config}
                          tabIndex={1} // tabIndex of textarea
                          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        />
                      </div>
                    </div>
                    <div className="pricing-block">
                      <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Price</label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              {...register("price", {
                                required: "Price is required",
                              })}
                              type="number"
                              step="0.01"
                              className={`form-control ${errors.price && "is-invalid"}`}
                              placeholder="0.00"
                            />
                          </div>
                          {errors.price && (
                            <div className="text-danger small mt-1">
                              {errors.price.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">Compare at Price</label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              {...register("compare_price")}
                              type="number"
                              step="0.01"
                              className="form-control"
                              placeholder="0.00"
                            />
                          </div>
                          {calculateDiscount() && (
                            <small className="text-success fw-bold">
                              Save {calculateDiscount()}% off!
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="inventory-block">
                      <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">
                            SKU (Stock Keeping Unit)
                          </label>
                          <input
                            {...register("sku", {
                              required: "SKU is required",
                            })}
                            type="text"
                            className={`form-control ${errors.sku && "is-invalid"}`}
                            placeholder="e.g. MS-SHOE-001"
                          />
                          {errors.sku && (
                            <div className="invalid-feedback">
                              {errors.sku.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">
                            Barcode (ISBN, UPC, etc.)
                          </label>
                          <input
                            {...register("barcode")}
                            type="text"
                            className="form-control"
                            placeholder="Barcode number"
                          />
                        </div>
                      </div>

                      <div className="row">                        
                        <div className="col-md-6 col-lg-6">
                          <div className="mb-4 mt-3">
                            <label className="form-label d-block fw-semibold">
                              Product Sizes
                            </label>
                            {sizesLoading ? (
                              <div className="d-flex align-items-center gap-2 text-muted">
                                <Spinner animation="border" size="sm" /> Loading
                                sizes...
                              </div>
                            ) : (
                              <div className="d-flex flex-wrap gap-3">
                                {sizes?.map((size) => (
                                  <div
                                    key={`size-wrapper-${size.id}`}
                                    className="form-check"
                                  >
                                    <input
                                      // ✅ Bind checkboxes to the exact same form array register name
                                      {...register("sizes")}
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`size-${size.id}`}
                                      value={String(size.id)} // Forces string mapping match
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`size-${size.id}`}
                                    >
                                      {size.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
  
                          {errors.sizes && (
                            <div className="invalid-feedback">
                              {errors.sizes?.message}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 col-lg-6">
                          <label htmlFor="" className="form-label">
                            Featured
                          </label>
                          <select
                            {...register("is_featured", {
                              required: "Featured is required",
                            })}
                            className={`form-select ${errors.is_featured && "is-invalid"}`}
                          >
                            <option value="">Select Featured Status</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          {errors.is_featured && (
                            <div className="invalid-feedback">
                              {errors.is_featured?.message}
                            </div>
                          )}
                        </div>                            
                      </div>                       

                      <div className="row">
                        <div className=" col-md-6 col-lg-6">
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
                        <div className="col-md-6 col-lg-6">
                          <label className="form-label">Quantity</label>
                          <div className="input-group">
                            <input
                              {...register("qty", {
                                required: "Quantity is required",
                                min: {
                                  value: 0,
                                  message: "Quantity cannot be negative",
                                },
                              })}
                              type="number"
                              className={`form-control ${errors.qty && "is-invalid"}`}
                              placeholder="0"
                            />
                          </div>
                          {errors.qty && (
                            <div className="text-danger small mt-1">
                              {errors.qty.message}
                            </div>
                          )}
                        </div>
                      </div>                      
                    </div>
                    
                    <div className="image-block">
                      <h3 className="py-3 border-bottom mb-3">Gallary</h3>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Image
                        </label>
                        <input
                          {...register("image")}
                          type="file"
                          onChange={handleFile}
                          className={`form-control`}
                          placeholder="Image"
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <Spinner animation="border" size="sm" />
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Image Gallary
                        </label>
                        <div className="row">
                          <div className="d-flex flex-wrap gap-3 mt-3">
                            {gallaryImages.map((img, index) => {
                              const isProcessing =
                                isUploading &&
                                index === gallaryImages.length - 1;

                              return (
                                <div
                                  key={index}
                                  className="position-relative shadow-sm border rounded"
                                  style={{ width: "120px", height: "120px" }}
                                >
                                  {/* Image Preview */}
                                  <img
                                    src={img}
                                    alt="product"
                                    className={`w-100 h-100 object-fit-cover rounded ${isProcessing ? "opacity-25" : ""}`}
                                  />

                                  {/* Center Spinner */}
                                  {isProcessing && (
                                    <div className="position-absolute top-50 start-50 translate-middle">
                                      <Spinner
                                        animation="border"
                                        size="sm"
                                        variant="primary"
                                      />
                                    </div>
                                  )}

                                  {/* Delete Button (Hidden during upload) */}
                                  {!isProcessing && (
                                    <button
                                      type="button"
                                      onClick={() => deleteImage(index)}
                                      className="btn btn-danger btn-sm position-absolute"
                                      style={{
                                        top: "-10px",
                                        right: "-10px",
                                        borderRadius: "50%",
                                      }}
                                    >
                                      &times;
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
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
