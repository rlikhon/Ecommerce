import React from "react";

const NoState = ({ message = "No data found" }) => {
  return <div className="text-center py-5">{message}</div>;
}

export default NoState