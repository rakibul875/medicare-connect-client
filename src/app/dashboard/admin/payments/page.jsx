import PaymentHistoryTable from "@/components/dashboard/admin/PaymentHistoryTable";
import { getAllPaymentHistory } from "@/lib/api/paymentHistory";
import React from "react";
// Change path if needed

const PaymentPage = async () => {
  const payment = await getAllPaymentHistory();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
  
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Payment Transactions Ledger
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-400">
          Monitor incoming system ledger settlements, gateway session records,
          and consultant transaction values.
        </p>
      </div>

     
      {!payment || payment.length === 0 ? (
        <div className="w-full bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
          <p className="text-gray-400 font-semibold text-sm tracking-wide">
            No transaction histories found inside database register.
          </p>
        </div>
      ) : (
        <PaymentHistoryTable transactions={payment} />
      )}
    </div>
  );
};

export default PaymentPage;
