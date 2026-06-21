import React from "react";
import { DollarSign, ArrowUpRight, ShieldCheck, User } from "lucide-react";

const PaymentTable = ({ transactions }) => {

  const formatTxDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-white rounded-[2rem] border border-gray-100/90 p-4 sm:p-6 shadow-sm">
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-full">
  
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-6">Doctor / Consultant</th>
              <th className="py-4 px-6">Session Identifier</th>
              <th className="py-4 px-6">Payment Date</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6 text-right w-28">Status</th>
            </tr>
          </thead>

         
          <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="hover:bg-gray-50/40 transition-colors duration-150 group"
              >
             
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#006694]/5 flex items-center justify-center text-[#006694]">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900">
                        {tx.doctorName || "Unknown Provider"}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div
                    className="flex items-center gap-1 text-xs text-gray-400 font-mono tracking-tight max-w-[180px]"
                    title={tx.sessionId}
                  >
                    <span className="truncate">{tx.sessionId}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                  </div>
                </td>

       
                <td className="py-4 px-6 text-xs text-gray-500 font-semibold">
                  {formatTxDate(tx.paymentAt)}
                </td>

              
                <td className="py-4 px-6">
                  <div className="flex items-center text-base font-black text-[#006694]">
                    <DollarSign
                      className="w-3.5 h-3.5 -mr-0.5 text-[#006694]/70"
                      strokeWidth={3}
                    />
                    <span>{tx.amount}</span>
                  </div>
                </td>

          
                <td className="py-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1 bg-[#014d34]/5 text-[#014d34] text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase">
                    <ShieldCheck
                      className="w-3 h-3 text-[#014d34]/80"
                      strokeWidth={2.5}
                    />
                    <span>Paid</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
