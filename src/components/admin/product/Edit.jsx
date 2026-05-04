import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editCategoryService, showEditCategoryService } from "../../../services/CategoryServices";
import { Spinner } from "react-bootstrap";

const update = () => {
  return (
    <Layout>
        <div className="container">
        <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Update Product</h4>
            <Link to="/admin/products" className='btn btn-primary'>Back</Link>
            </div>
            <div className="col-md-3 col-lg-3">
            <Sidebar />
            </div>
            <div className="col-md-9 col-lg-9">
            <div className="row">               
                <div className="card shadow">
                <div className="card-body p-4">
                    
                </div>
                </div>
            </div>            
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default update