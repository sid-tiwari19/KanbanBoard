import React, { useState } from "react";
import KobanContext from "./KobanContext";

const KobanState = (props) => {
  const [group, setGroup] = useState("status");
  const [order, setOrder] = useState("priority");

  return (
    <KobanContext.Provider value={{ group, setGroup, order, setOrder }}>
      {props.children}
    </KobanContext.Provider>
  );
};

export default KobanState;
