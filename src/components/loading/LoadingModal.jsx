import React, { useState } from "react";
import ReactLoading from "react-loading";

const LoadingModal = ({ loading }) => {
    return (
        <div
            className="loading-modal"
            style={{
                display: loading ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
            }}
        >
            <ReactLoading type={"spinningBubbles"} color="#fdf001" />
        </div>
    );
};

export default LoadingModal;