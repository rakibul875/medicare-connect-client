"use client";
import { handelPrescriptionPatch } from "@/lib/post/prescription";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

const PrescriptionEditForm = ({ prescriptionId }) => {
  const [prescription, setPrescription] = useState({});
  const router =useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/prescription/${prescriptionId}`,
      );
      const data = await res.json();
      setPrescription(data);
    };

    fetchData();
  }, [prescriptionId]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateData = Object.fromEntries(formData.entries());
    const res = await handelPrescriptionPatch(prescriptionId, updateData);
    if (res.modifiedCount > 0) {
      toast.success("Prescription Update Successful");
      router.refresh();
    }
  };
  return (
    <div>
      <Modal>
        <Button className="bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-2">
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
                <Modal.Heading>Write Prescription</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Enter the patient`s name, age, and details of the prescription
                  below.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={handelSubmit} className="flex flex-col gap-4">
                    <TextField
                      defaultValue={prescription.patientName}
                      className="w-full"
                      variant="secondary"
                    >
                      <Label>Patient Name</Label>
                      <Input
                        name="patientName"
                        placeholder="Enter patient name"
                        required
                      />
                    </TextField>

                    <TextField
                      defaultValue={prescription.diagnosis}
                      className="w-full"
                      variant="secondary"
                    >
                      <Label>Patient diagnosis</Label>
                      <Input
                        name="diagnosis"
                        placeholder="Enter patient Diagnosis"
                        required
                      />
                    </TextField>

                    <div className="w-full flex flex-col gap-1.5">
                      <Label className="text-sm font-medium text-foreground">
                        Prescription Description
                      </Label>
                      <TextArea
                        defaultValue={prescription.description}
                        aria-label="Prescription description"
                        className="h-32 w-full"
                        placeholder="Write medicines, dosage, advice, or symptoms here..."
                        name="description"
                        required
                      />
                    </div>

                    <Button slot="close" type="submit" className="w-full mt-2">
                      Submit Prescription
                    </Button>
                  </form>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default PrescriptionEditForm;
