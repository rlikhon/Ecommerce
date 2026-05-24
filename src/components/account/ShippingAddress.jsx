import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../common/Layout";
import AccountSidebar from "./common/AccountSidebar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner, Card, Button, Row, Col, Collapse } from "react-bootstrap";
import { MapPin, Plus, Trash2, X, Check } from "lucide-react";
import { toast } from "react-toastify";
import { 
  getCustomerAddressesService, 
  storeCustomerAddressService, 
  deleteCustomerAddressService 
} from "../../services/AddressServices";

const ShippingAddress = () => {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchAddressesData = useCallback(async () => {
    setLoading(true);
    try {
      const rawUserInfo = localStorage.getItem("userInfo");
      const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

      if (token) {
        const res = await getCustomerAddressesService(token);
        setAddresses(res?.data?.data || res?.data || []);
      } else {
        // Fallback placeholder dataset matching schema for local mock runs
        setAddresses([
          { id: 1, type: "home", name: "Zahid Hasan", phone: "01712345678", street: "House 45, Road 12", city: "Dhaka", postal_code: "1212" },
          { id: 2, type: "office", name: "Zahid Hasan (Office)", phone: "01987654321", street: "Level 4, Corporate Tower", city: "Dhaka", postal_code: "1215" }
        ]);
      }
    } catch (error) {
      console.error("Failed to sync customer address data registry:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = setTimeout(() => {
      fetchAddressesData();
    }, 0);
    return () => clearTimeout(token);
  }, [fetchAddressesData]);

  const onSubmitAddress = async (data) => {
    const rawUserInfo = localStorage.getItem("userInfo");
    const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

    try {
      if (token) {
        // 1. ✅ Send raw inputs to Laravel first to generate a stable database ID
        const res = await storeCustomerAddressService(data, token);
        
        if (res.status === 200 || res.status === 201) {
          // 2. ✅ Extract the real, permanent ID returned from the database server
          const newSavedAddress = res.data.data;
          
          // 3. ✅ Update state safely with pure, predictable backend parameters
          setAddresses((prev) => [newSavedAddress, ...prev]);
          toast.success("New shipping destination appended successfully!");
        }
      } else {
        // Fallback for offline playground testing: use local array length logic instead of impure timestamps
        const mockId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
        const localMockItem = { id: mockId, ...data };
        
        setAddresses((prev) => [localMockItem, ...prev]);
        toast.success("Mock shipping destination appended!");
      }
      
      setShowForm(false);
      reset();
    } catch (error) {
      console.error("Failed to sync structural address records:", error);
      toast.error("Failed to save shipping location. Please try again.");
    }
  };

  const handleDeleteAddress = async (id) => {
    const rawUserInfo = localStorage.getItem("userInfo");
    const token = rawUserInfo ? JSON.parse(rawUserInfo)?.token : null;

    setAddresses((prev) => prev.filter((item) => item.id !== id));
    toast.info("Shipping address removed successfully.");

    if (token) {
      try {
        await deleteCustomerAddressService(id, token);
      } catch (error) {
        console.error("Failed to execute target endpoint deletion:", error);
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
            <li className="breadcrumb-item active" aria-current="page">Shipping Addresses</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Left Column: Customer Navigation Menu Wrapper */}
          <div className="col-md-3 col-lg-3 mb-4">
            <AccountSidebar />
          </div>

          {/* Right Column: Address Operations Workspace Grid */}
          <div className="col-md-9 col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
              <div className="d-flex align-items-center gap-2">
                <MapPin size={20} className="text-secondary" />
                <h4 className="fw-bold mb-0 text-dark">Saved Delivery Locations</h4>
              </div>
              <Button 
                variant={showForm ? "outline-secondary" : "primary"} 
                size="sm"
                className="d-flex align-items-center gap-1.5 fw-semibold px-3 py-1.5 rounded-3"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Address</>}
              </Button>
            </div>

            {/* Slide Down Form Addition Module Wrapper */}
            <Collapse in={showForm}>
              <div>
                <Card className="border-0 shadow-sm bg-light mb-4 rounded-3">
                  <Card.Body className="p-4">
                    <h6 className="fw-bold text-dark mb-3">Configure New Delivery Destination</h6>
                    <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
                      <Row className="g-3">
                        <Col md={6}>
                          <label className="form-label small fw-semibold text-secondary mb-1">Recipient Name</label>
                          <input 
                            {...register("name", { required: "Name is required" })}
                            type="text" 
                            className={`form-control bg-white ${errors.name ? "is-invalid" : ""}`} 
                            placeholder="Full name of recipient"
                          />
                        </Col>
                        <Col md={6}>
                          <label className="form-label small fw-semibold text-secondary mb-1">Contact Phone</label>
                          <input 
                            {...register("phone", { required: "Phone record is required" })}
                            type="tel" 
                            className={`form-control bg-white ${errors.phone ? "is-invalid" : ""}`} 
                            placeholder="Mobile number"
                          />
                        </Col>
                        <Col md={4}>
                          <label className="form-label small fw-semibold text-secondary mb-1">Address Type Tag</label>
                          <select {...register("type")} className="form-select bg-white">
                            <option value="home">Home Delivery</option>
                            <option value="office">Office Workplace</option>
                            <option value="other">Other Boundary</option>
                          </select>
                        </Col>
                        <Col md={8}>
                          <label className="form-label small fw-semibold text-secondary mb-1">Street Address</label>
                          <input 
                            {...register("street", { required: "Street layout is required" })}
                            type="text" 
                            className={`form-control bg-white ${errors.street ? "is-invalid" : ""}`} 
                            placeholder="House, Flat number, Road indices"
                          />
                        </Col>
                        <Col md={6}>
                          <label className="form-label small fw-semibold text-secondary mb-1">City</label>
                          <input 
                            {...register("city", { required: "City name is required" })}
                            type="text" 
                            className={`form-control bg-white ${errors.city ? "is-invalid" : ""}`} 
                            placeholder="e.g. Dhaka"
                          />
                        </Col>
                        <Col md={6}>
                          <label className="form-label small fw-semibold text-secondary mb-1">Postal Code</label>
                          <input 
                            {...register("postal_code", { required: "Zip index is required" })}
                            type="text" 
                            className={`form-control bg-white ${errors.postal_code ? "is-invalid" : ""}`} 
                            placeholder="e.g. 1212"
                          />
                        </Col>
                        <Col md={12} className="text-end pt-2">
                          <Button type="submit" variant="primary" disabled={isSubmitting} className="px-4 fw-semibold d-inline-flex align-items-center gap-1.5">
                            {isSubmitting ? <Spinner animation="border" size="sm" /> : <><Check size={15} /> Commit Location</>}
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </Card.Body>
                </Card>
              </div>
            </Collapse>

            {/* Dynamic Card Display Track */}
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-5 text-muted bg-white shadow-sm rounded border">
                <p className="mb-0 small">No shipping address boundaries saved. Click 'Add Address' to map delivery parameters.</p>
              </div>
            ) : (
              <Row className="g-3">
                {addresses.map((addr) => (
                  <Col key={`addr-card-${addr.id}`} md={6}>
                    <Card className="address-card shadow-sm h-100 border-0">
                      <Card.Body className="p-4 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-2.5">
                            <h6 className="fw-bold text-dark mb-0">{addr.name}</h6>
                            <Badge 
                              bg={addr.type === "home" ? "primary" : addr.type === "office" ? "info" : "secondary"}
                              className="badge-address-type text-uppercase text-white border-0"
                            >
                              {addr.type}
                            </Badge>
                          </div>
                          <p className="text-secondary small mb-1.5 fw-medium">{addr.street}</p>
                          <p className="text-muted small mb-0">{addr.city} — {addr.postal_code}</p>
                          <p className="text-dark small fw-semibold mt-2.5 mb-0">📞 Contact: <span className="text-secondary fw-normal">{addr.phone}</span></p>
                        </div>
                        
                        <div className="text-end pt-3 mt-3 border-top border-light">
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="btn-icon-action delete-hover border-0 rounded-circle"
                            title="Delete Location File"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ShippingAddress;

