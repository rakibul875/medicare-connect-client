import React from "react";
import { CreditCard, Calendar, Hash, ShieldCheck } from "lucide-react";

const PaymentHistoryTable = ({ transactions }) => {

  const formatPaymentDate = (dateString) => {
    if (!dateString) return "N/A";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <table className="w-full text-left border-collapse min-w-[900px] lg:min-w-full">

          <thead>
            <tr className="bg-slate-50 border-b border-gray-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Transaction ID</th>
              <th className="py-4 px-6">Doctor / Consultant</th>
              <th className="py-4 px-6">Stripe Session Reference</th>
              <th className="py-4 px-6">Execution Timestamp</th>
              <th className="py-4 px-6 text-right w-36">Settled Amount</th>
            </tr>
          </thead>


          <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
            {transactions.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-slate-50/50 transition-all duration-150"
              >
      
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                    <Hash className="w-3.5 h-3.5 text-gray-300" />
                    <span title={item._id}>
                      {item._id?.slice(-8).toUpperCase()}
                    </span>
                  </div>
                </td>

     
                <td className="py-4 px-6">
                  <div>
                    <span className="block font-bold text-slate-900 leading-tight">
                      {item.doctorName || "Medical Professional"}
                    </span>
                    <span
                      className="block text-[10px] text-slate-400 font-mono mt-0.5"
                      title={item.doctorId}
                    >
                      Ref: {item.doctorId?.slice(-6)}
                    </span>
                  </div>
                </td>

           
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 max-w-xs xl:max-w-md">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span
                      className="text-xs text-slate-500 font-mono truncate block"
                      title={item.sessionId}
                    >
                      {item.sessionId}
                    </span>
                  </div>
                </td>

           
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatPaymentDate(item.paymentAt)}</span>
                  </div>
                </td>

           
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5 bg-sky-50 border border-sky-100/50 text-sky-700 font-extrabold px-3 py-1 rounded-xl text-xs tracking-tight">
                    <CreditCard className="w-3.5 h-3.5 text-sky-600/70" />
                    <span>${item.amount?.toFixed(2)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
