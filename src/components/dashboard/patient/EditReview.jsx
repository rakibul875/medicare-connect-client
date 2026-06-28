"use client";
import { handelReviewPatch } from "@/lib/post/review";
import { Envelope } from "@gravity-ui/icons";
import { Button, Label, Modal, Surface, TextArea } from "@heroui/react";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaStar } from "react-icons/fa";

const EditReview = ({ reviewId }) => {
  const [review, setReview] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/${reviewId}`,
      );
      const data = await res.json();
      setReview(data);
    };

    fetchData();
  }, [reviewId]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newData = {
      ...data,
      rating: rating,
    };
    const res = await handelReviewPatch(reviewId, newData);
    if (res.modifiedCount > 0) {
      toast.success("Review Update Success Ful");
      router.refresh()
    }
  };
  return (
    <div>
      <Modal>
        <Button className="bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5">
          <FaRegEdit /> Edit
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
                  <form onSubmit={handelSubmit} className="flex flex-col gap-4">
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
                        defaultValue={review.description}
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

export default EditReview;
