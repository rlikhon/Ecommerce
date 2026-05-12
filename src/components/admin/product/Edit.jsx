import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  editProductService,
  showEditProductService,
  saveProductImagesService,
  deleteProductImageService,
  makeDefaultProductImageService,
} from "../../../services/ProductServices";
import { useCategories } from "../../../hooks/useCategories";
import { useBrands } from "../../../hooks/useBrands";
import { useSizes } from "../../../hooks/useSizes";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [productImages, setProductImages] = useState([]);

  // Use the hook to get categories and loading state
  const { categories, categoryLoading } = useCategories();
  const { brands, brandLoading } = useBrands();
  const { sizes, sizesLoading } = useSizes();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "",
    }),
    [placeholder],
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      try {
        const res = await showEditProductService(id);
        const updatedProduct = res.data.data;
        setProductImages(updatedProduct.product_images);
        setContent(updatedProduct.description);        
        const activeSizes = updatedProduct.size_ids
          ? updatedProduct.size_ids.map(String)
          : [];

        return {
          title: updatedProduct.title,
          barcode: updatedProduct.barcode,
          status: updatedProduct.status,
          category_id: updatedProduct.category_id,
          brand_id: updatedProduct.brand_id,
          sizes: activeSizes,
          price: updatedProduct.price,
          compare_price: updatedProduct.compare_price,
          is_featured: updatedProduct.is_featured,
          qty: updatedProduct.qty,
          sku: updatedProduct.sku,
          image_url: updatedProduct.image_url || "",
          image: updatedProduct.image || "",
          description: updatedProduct.description || "",
          short_description: updatedProduct.short_description || "",          
        };
      } catch (error) {
        // Handled by interceptor
      }
    },
  });

  const saveProduct = async (data) => {
    const formData = { ...data, description: content };
    console.log(formData);
    try {
      const res = await editProductService(id, formData);
      toast.success(res.data.message || "Product updated");
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

  const handleFile = async (e) => {
    const file = e.target.files[0]; // Get the first file object
    if (!file || !id) return; // Exit if id is missing

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("product_id", id); // Must match 'product_id' in Laravel validation
    //console.log("FormData Entries:", Array.from(formData.entries()));
    try {
      const res = await saveProductImagesService(formData);
      if (res.status === 200) {
        setProductImages((prev) => [...prev, res.data.data]);
        toast.success("Image uploaded!");
      }
    } catch (error) {
      console.error("Upload failed", error.response?.data);
    } finally {
      e.target.value = ""; // Clear input for next select
    }
  };

  const deleteImage = async (image) => {
    // 1. Safety first - Large actions need confirmation
    const result = await Swal.fire({
      title: "Delete Image?",
      text: "This will permanently remove the image from the server.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    // 2. Early Return: Exit if user cancels
    if (!result.isConfirmed) return;

    try {
      const res = await deleteProductImageService(image.id);

      // 3. Early Return: Exit if API fails
      if (res.status !== 200) {
        toast.error(res.data?.message || "Failed to delete image");
        return;
      }

      // 4. Success logic: Flat and clean
      setProductImages((prev) => prev.filter((img) => img.id !== image.id));
      toast.success("Image removed successfully");
    } catch (error) {
      // 5. Centralized Error Handling
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      console.error("Delete failed:", error);
    }
  };

  const changeDefaultImage = async (image) => {
    const result = await Swal.fire({
      title: "Change as default product Image?",
      text: "This will be default product image.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    });

    // 2. Early Return: Exit if user cancels
    if (!result.isConfirmed) return;

    try {
      const res = await makeDefaultProductImageService(id, image);
      if (res.status === 200) {
        toast.success("Image made default successfully");
      }
    } catch (error) {
      console.error("Failed to make default image", error.response?.data);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Update Product</h4>
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
                            <option key={`brand-${brand.id}`} value={brand.id}>
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
                            {...register("compare_price")}
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
                              required: "Qty is required",
                            })}
                            type="text"
                            className={`form-control ${errors.qty && "is-invalid"}`}
                            placeholder="Qty"
                          />
                          {errors.qty && (
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

                    <h3 className="py-3 border-bottom mb-3">Gallary</h3>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <input
                        {...register("image")}
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className={`form-control`}
                        placeholder="Image"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <div className="row">
                        {productImages &&
                          productImages.map((productImage, index) => {
                            return (
                              <div
                                key={`image-${index}`}
                                className="col-md-3 col-lg-3"
                              >
                                <div className="card shadow position-relative">
                                  <img
                                    src={productImage.image_url}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="width-full mt-1">
                                    <Button
                                      variant="danger"
                                      className="w-100"
                                      onClick={() => deleteImage(productImage)}
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      className="w-100"
                                      onClick={() =>
                                        changeDefaultImage(productImage.image)
                                      }
                                    >
                                      Make Default Image
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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

export default Edit;
