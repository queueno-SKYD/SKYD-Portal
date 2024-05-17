import React from "react";
import { imageUrl } from "../../assets/index.ts";

const NoMessageComponent = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-5">
      <img  src={imageUrl.noMessageImg} style={{minWidth: "300px", maxWidth: "700px", width: "100%"}} alt="cover" />
      <h2>Say hi to all group members</h2>
      <h3>They are waiting for you!</h3>
    </div>
  );
};

export default NoMessageComponent;
