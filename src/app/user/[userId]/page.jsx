import React from "react";

import UserDetails from "./UserDetails";

const page = ({ params }) => {
  const { userId } = params;

  return (
    <>
      <UserDetails userId={userId} />
    </>
  );
};

export default page;
