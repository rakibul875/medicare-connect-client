import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/api/getUsers";

export async function POST(request) {
  const user = await getUserSession();
  const formData = await request.formData();
  const amount = formData.get("amount");
  const doctorId = formData.get("doctorId");
  const doctorName = formData.get("doctorName");
  // const bookingPayload=formData.get('bookingPayload')
  const bookingPayload = JSON.parse(formData.get("bookingPayload"));

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(amount) * 100,
            product_data: {
              name: user?.name || "",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id || "",
        userName:user?.name,
        doctorId: doctorId,
        amount: Number(amount),
        doctorName: doctorName,
        doctorId: bookingPayload.doctorId,
        scheduleId: bookingPayload.scheduleId,
        date: bookingPayload.date,
        timeSlot: bookingPayload.timeSlot,
        doctorName: bookingPayload.doctorName,
        profileImage:bookingPayload.profileImage,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
