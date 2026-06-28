import { authClient } from "@/lib/auth-client";
import { handelPostFavorite } from "@/lib/post/review";
import { AlertRoot } from "@heroui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Favorite = ({ appointmentId }) => {
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
  console.log(appointment)
  const { data: session } = authClient.useSession();
    const user = session?.user;
  const handelFavorite=async()=>{
    const data={
        userId:user?.id,
        doctorId:appointment.doctorId,
        doctorImage:appointment.doctorImage
    }
    console.log('After button clicked', data)
    const res= await handelPostFavorite(data)
    if(res.insertedId){
        toast.success('Add Favorite Successful')
    }
    if(res.success===false){
        toast.error(res.message)
    }
  }
  
  return (
    <div>
      <div>
        <button onClick={handelFavorite} className="bg-[#006694]/10 text-[#006694] hover:bg-[#006694]/20 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95">
          +Add To Favorite
        </button>
      </div>
    </div>
  );
};

export default Favorite;
