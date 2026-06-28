"use client";
import { authClient } from "@/lib/auth-client";
import { handelPostReview } from "@/lib/post/review";
import { Envelope } from "@gravity-ui/icons";
import { Button, Label, Modal, Surface, TextArea } from "@heroui/react";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ appointmentId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [appointment, setAppointment] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointment/${appointmentId}`,
      );
      const data = await res.json();
      setAppointment(data);
    };

    fetchData();
  }, [appointmentId]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    if (rating === 0) {
      toast.error("Please select a star rating!");
      return;
    }

    const reviewPayload = {
      doctorId: appointment.doctorId,
      rating: rating,
      description: formValues.description,
      userImage: user.profilePhoto,
      userId: user.id,
      doctorName: appointment.doctorName,
      appointmentId: appointmentId,
    };

    const res = await handelPostReview(reviewPayload);
    if (res.insertedId) {
      toast.success(`Thank you for your ${reviewPayload.rating}-star review!`);
    }
    if (res.success === false) {
      toast.error(res.message);
    }
  };

  return (
    <div>
      <Modal>
        <Button className="ml-3 bg-[#006694]/10 text-[#006694] hover:bg-[#006694]/20 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95">
          Give Review
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Share Your Feedback</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Please rate your experience and leave a detailed review below.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="w-full flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-foreground">
                        Your Rating
                      </Label>

                      <div className="flex items-center gap-1 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="cursor-pointer transition-transform active:scale-110 focus:outline-none"
                          >
                            <FaStar
                              size={28}
                              className="transition-colors duration-150"
                              color={
                                star <= (hoverRating || rating)
                                  ? "#FBBF24"
                                  : "#E5E7EB"
                              }
                            />
                          </button>
                        ))}

                        {rating > 0 && (
                          <span className="text-xs font-bold text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded-md">
                            {rating} / 5
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-foreground">
                        Review Description
                      </Label>
                      <TextArea
                        aria-label="Review description"
                        className="h-32 w-full"
                        placeholder="Share the details of your experience with the doctor..."
                        name="description"
                        required
                      />
                    </div>

                    <Button slot="close" type="submit" className="w-full mt-2">
                      Submit Review
                    </Button>
                  </form>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default ReviewForm;
