import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import TxnTracking from "@/app/components/txn/Transaction";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <TxnTracking />
    </ProtectedRoute>
  );
};

export default page;
