"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Label, Modal, Surface, TextArea } from "@heroui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // 🚀 React Icon ইমপোর্ট করা হয়েছে

const ReviewForm = ({ doctorId, appointmentId }) => {
    console.log(appointmentId)
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());


    if (rating === 0) {
      alert("Please select a star rating!");
      return;
    }

    const reviewPayload = {
      doctorId,
      rating: rating,
      description: formValues.description,
      
    };

    console.log("Received Review Data with React Icons:", reviewPayload);
    alert(`Thank you for your ${reviewPayload.rating}-star review!`);
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
                    {/* 🎯 ১. রেটিং সেকশন (React Icons দিয়ে) */}
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
                            {/* 🚀 React Icon কম্পোনেন্ট */}
                            <FaStar
                              size={28} // আইকনের সাইজ ছোট-বড় করতে পারবেন
                              className="transition-colors duration-150"
                              color={
                                star <= (hoverRating || rating)
                                  ? "#FBBF24"
                                  : "#E5E7EB"
                              } // সিলেক্টেড হলে গোল্ডেন হলুদ, না হলে হালকা গ্রে
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

                    {/* ২. বিবরণ */}
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

                    <Button type="submit" className="w-full mt-2">
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
