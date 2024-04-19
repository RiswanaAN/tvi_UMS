import React, { useState } from "react";

function MyOrder(props) {
  
  return (
    <div className="flex font-mono">
   

      <button onClick={() => props.dashboardMenu("myOrder")}>My Orders</button>
    </div>
  );
}

export default MyOrder;
