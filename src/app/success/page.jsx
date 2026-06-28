// import { redirect } from "next/navigation";
// import { stripe } from "../../lib/stripe";
// import { handelPostSubscriptionData } from "@/lib/post/postsubscription";
// import { handelAppointmentPost } from "@/lib/post/appointment";

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams;

//   if (!session_id)
//     throw new Error("Please provide a valid session_id (`cs_test_...`)");

//   const {
//     status,
//     metadata,
//     customer_details: { email: customerEmail },
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ["line_items", "payment_intent"],
//   });

//   if (status === "open") {
//     return redirect("/");
//   }

//   if (status === "complete") {
//     const data = metadata;

//     const paymentInfo = {
//       amount: Number(data.amount),
//       userId: data.userId,
//       doctorId: data.doctorId,
//     };

//     const appointmentInfo = {
//       doctorId: data.doctorId,
//       doctorName: data.doctorName,
//       timeSlot: data.timeSlot,
//       date: data.date,
//       doctorImage:data.profileImage,
//       userId:data.userId,
//       userName:data.userName,
//       AppointmentStatus: "pending",
//     };
//     const subscriptionData = { ...paymentInfo,sessionId:session_id, doctorName:data.doctorName, };
//     const res = await handelPostSubscriptionData(subscriptionData)
//     const appointmentRes= await handelAppointmentPost(appointmentInfo)
//     console.log(appointmentRes)
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{" "}
//           {customerEmail}. If you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }
// }

import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "../../lib/stripe";
import { handelPostSubscriptionData } from "@/lib/post/postsubscription";
import { handelAppointmentPost } from "@/lib/post/appointment";
import {
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Mail,
  ArrowRight,
} from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const data = metadata;

    const paymentInfo = {
      amount: Number(data.amount),
      userId: data.userId,
      doctorId: data.doctorId,
    };

    const appointmentInfo = {
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      timeSlot: data.timeSlot,
      date: data.date,
      doctorImage: data.profileImage,
      userId: data.userId,
      userName: data.userName,
      AppointmentStatus: "pending",
    };

    const subscriptionData = {
      ...paymentInfo,
      sessionId: session_id,
      doctorName: data.doctorName,
    };

    await handelPostSubscriptionData(subscriptionData);
    const appointmentRes = await handelAppointmentPost(appointmentInfo);
    console.log(appointmentRes);

    return (
      <main className="w-full bg-slate-50/50 min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
       
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
          <CheckCircle2 className="w-[600px] h-[600px] text-[#014d34]" />
        </div>

        <div className="max-w-md w-full text-center space-y-8 relative z-10 bg-white border border-slate-100 p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-100/50">
       
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm relative group animate-fade-in">
              <CheckCircle2
                className="w-10 h-10 animate-bounce"
                style={{ animationDuration: "3s" }}
              />
            </div>
          </div>

          
          <div className="space-y-2">
            <span className="text-[11px] font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 inline-block">
              Payment Completed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Appointment Booked!
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed max-w-sm mx-auto">
              Your transaction was successful. The system has automatically
              reserved your premium care slot.
            </p>
          </div>

        
          <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 text-left space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-[#006694]/10 text-[#006694] p-2 rounded-xl mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Schedule Line
                </h4>
                <p className="text-sm font-black text-slate-800 mt-0.5">
                  Dr. {data.doctorName || "Specialist"}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {data.date} •{" "}
                  <span className="text-[#006694]">{data.timeSlot}</span>
                </p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-500">
              <div className="flex items-center space-x-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  Status:{" "}
                  <span className="text-emerald-600 uppercase tracking-wide text-[10px] font-black bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                    Pending Approval
                  </span>
                </span>
              </div>
              <span className="text-slate-700 font-black">
                Paid: ${Number(data.amount)}
              </span>
            </div>
          </div>

       
          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100/80 px-4 py-3 rounded-xl text-left">
            <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <p className="text-[11px] sm:text-xs font-medium text-slate-500 leading-tight">
              A confirmation email with invoice token logs will be routed to{" "}
              <span className="font-bold text-slate-700">{customerEmail}</span>{" "}
              shortly.
            </p>
          </div>

          
          <div className="pt-2">
            <Link
              href="/dashboard/patient"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#006694] hover:bg-[#00557c] text-white text-xs sm:text-sm font-bold tracking-wide rounded-xl transition-all shadow-md shadow-[#006694]/10 active:scale-95 group"
            >
              <span>Go to Appointments Dashboard</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        
          <div className="pt-6 border-t border-slate-100">
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Need immediate assistance?{" "}
              <a
                href="mailto:support@hospital.com"
                className="text-[#006694] underline hover:text-[#00557c]"
              >
                Contact Desk
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }
}
