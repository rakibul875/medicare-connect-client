"use client";
import { dataDelete } from "@/lib/action/serverPost";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ScheduleDelete = ({ doctorId, day }) => {
  const router = useRouter();

  const handelDelete = async () => {
    const res = await dataDelete(`/schedule?doctorId=${doctorId}&day=${day}`);
    if (res.success) {
      alert(res.message || "Deleted successfully!");
      router.refresh();
    } else {
      alert(res.message || "Failed to delete!");
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button
          variant="none"
          className="text-gray-400 hover:text-red-500 p-1.5 sm:p-2 rounded-xl hover:bg-red-50 transition-all active:scale-95 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 h-4" />
        </Button>

        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete Schedule?</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p>
                  Are you sure you want to permanently delete the schedule for{" "}
                  <strong className="text-red-600">{day}</strong>? This action
                  cannot be undone.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button
                  slot="close"
                  variant="tertiary"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handelDelete}
                  slot="close"
                  variant="danger"
                  className="cursor-pointer"
                >
                  Delete Schedule
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default ScheduleDelete;
