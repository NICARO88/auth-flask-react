import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout(navigate);
    };

    useEffect(() => {
        const verifyAccess = async () => {
            const isValid = await actions.verifyToken();
            if (!isValid) {
                navigate("/login");
            }
        };

        verifyAccess();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body text-center">
                            <h3 className="card-title">Welcome to the Private Route!</h3>
                            <p className="card-text">
                                This page is accessible only to authenticated users.
                            </p>
                            <button className="btn btn-danger mt-3" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;

