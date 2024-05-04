import React, { useState } from "react";
import AdminMenu from "../Components/AdminMenu";

const ContributionRequests = () => {
  const [selectedTab, setSelectedTab] = useState({
    current: "contributionRequests",
  });
  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div>ContributionRequests</div>
    </>
  );
};

export default ContributionRequests;
