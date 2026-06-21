import PaymentTable from "@/components/patient/PaymentTable";
import { getUserSession } from "@/lib/api/getUsers";
import { getPaymentHistory } from "@/lib/api/paymentHistory";
import React from "react";

const PaymentsHistory = async () => {
  const user = await getUserSession();
  const paymentData = await getPaymentHistory(user?.id);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

      <div className="flex flex-col space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Payment Transactions
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-400">
          Review and track all your completed medical appointment session
          billing details.
        </p>
      </div>

      {!paymentData || paymentData.length === 0 ? (
        <div className="w-full bg-white rounded-[2rem] border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-gray-400 font-semibold text-sm tracking-wide">
            No transaction records or billing logs found for your profile.
          </p>
        </div>
      ) : (
        <PaymentTable transactions={paymentData} />
      )}
    </div>
  );
};

export default PaymentsHistory;
