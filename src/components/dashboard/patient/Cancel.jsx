'use client'
import { handelAppointmentStatus } from "@/lib/post/appointment";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
;
import React from "react";
import toast from "react-hot-toast";

const Cancel = ({id}) => {
     const router = useRouter()
  const handleCancel = async (cancelId) => {
    const res= await handelAppointmentStatus(cancelId);
    if(res.modifiedCount>0){
        toast.success("Appointment Canceled Successful")
        router.refresh()
    }
  };
  return (
    <div>
      <AlertDialog>
        <Button      
          className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95"
        >
          Cancel
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                Appointment cancellation Confirmation?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                 Are you sure you want to cancel this appointment
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button onClick={() => handleCancel(id)} slot="close" variant="danger">
                  Yes I Want To
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default Cancel;
