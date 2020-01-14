import React from "react";

const Criptomoneda = ({ criptomoneda }) => {
  //   const { FullName, Name } = criptomoneda.CoinInfo;
  return (
    <option value={criptomoneda.CoinInfo.Name}>
      {criptomoneda.CoinInfo.FullName}
    </option>
  );
};

export default Criptomoneda;
