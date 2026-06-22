import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { handelPostSubscriptionData } from "@/lib/post/postsubscription";
import { handelAppointmentPost } from "@/lib/post/appointment";

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
      doctorImage:data.profileImage,
      userId:data.userId,
      AppointmentStatus: "pending",
    };
    const subscriptionData = { ...paymentInfo,sessionId:session_id, doctorName:data.doctorName, };
    const res = await handelPostSubscriptionData(subscriptionData)
    const appointmentRes= await handelAppointmentPost(appointmentInfo)
    console.log(appointmentRes)
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }
}
