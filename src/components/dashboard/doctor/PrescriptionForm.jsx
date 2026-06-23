"use client";
import { authClient } from "@/lib/auth-client";
import { handelStatusConfirmedByDoctor } from "@/lib/post/appointment";
import { handelPrescriptionData } from "@/lib/post/prescription";
import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  TextArea,
} from "@heroui/react";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PrescriptionForm = ({ appointmentId }) => {
  const [appointment, setAppointment] = useState(null || {});
  const [prescription, setPrescription] = useState({});
  const router =useRouter()

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const fullPayload = {
      appointmentId,
      patientName: formValues.patientName,
      diagnosis: formValues.diagnosis,
      description: formValues.description,
      doctorId: appointment.doctorId,
      patientName: appointment.userName,
      patientId: appointment.userId,
    };

    setPrescription(fullPayload);
    const res = await handelPrescriptionData(fullPayload);
    if (res.insertedId) {
      alert("prescription Add successful");
      router.refresh()
    }
    if (res.success === false) {
      alert(`${res.message}`);
    }
  };

  return (
    <div>
      <Modal>
        <Button variant="secondary">+ Add Prescription</Button>
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                      className="w-full"
                      defaultValue={appointment.userName}
                      variant="secondary"
                    >
                      <Label>Patient Name</Label>
                      <Input
                        name="patientName"
                        placeholder="Enter patient name"
                        required
                      />
                    </TextField>

                    <TextField className="w-full" variant="secondary">
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
                        aria-label="Prescription description"
                        className="h-32 w-full"
                        placeholder="Write medicines, dosage, advice, or symptoms here..."
                        name="description"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full mt-2">
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

export default PrescriptionForm;
