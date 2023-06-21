import UploadImages from "@/components/admin/UploadImages";

import React from "react";

const HomePage = async ({ params }) => {
  return <UploadImages id={params.id} />;
};

export default HomePage;
