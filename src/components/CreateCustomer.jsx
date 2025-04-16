import React, { useEffect, useState } from "react";

const CreateCustomer = () => {
  const [token, setToken] = useState("");
  const [customer, setCustomer] = useState("");
  const PartnerId=import.meta.env.VITE_PARTNER_ID;
  const appKey =import.meta.env.VITE_Finicity_App_Key;
  const Partnersecrets = import.meta.env.VITE_PARTNER_SECRETS;

  useEffect(() => {
    fetch(
      "https://thingproxy.freeboard.io/fetch/https://api.finicity.com/aggregation/v2/partners/authentication",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Finicity-App-Key": appKey,
          Accept: "application/json",
        },
        body: JSON.stringify({
          partnerId: PartnerId,
          partnerSecret: Partnersecrets,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => setToken(data.token))
      .catch((error) => console.error("Error", error));
  }, []);

  function handleCreateCustomer() {
    fetch(
      "https://thingproxy.freeboard.io/fetch/https://api.finicity.com/aggregation/v2/customers/testing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Finicity-App-Key": "713829acb1bdc9a5e10b681c488fa80c",
          "Finicity-App-Token": token,
        },
        body: JSON.stringify({
          username: "OpenbankingTestCustomer3",
        }),
      }
    )
      .then((data) => data.json())
      .then((customer) => setCustomer(customer.id))
      .catch((error) => console.error("Error", error));
  }

  return (
    <div className=" flex justify-between border-2 mt-4 ">
      <h1 className="ml-4 my-6 ">Add Your First Customer</h1>
      <button
        className="mr-4 bg-amber-500 h-12 mt-2 rounded-2xl w-50 "
        onClick={handleCreateCustomer}
      >
        Create Customer
      </button>
    </div>
  );
};

export default CreateCustomer;
