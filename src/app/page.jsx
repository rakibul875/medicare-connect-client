import Banner from '@/components/home/Banner';
import MedicalSpecializations from '@/components/home/MedicalSpecializations';
import { Button } from '@heroui/react';
import React from 'react';

const HomePage = () => {
  return (
    <div>
     <Banner/>
     <MedicalSpecializations/>
    </div>
  );
};

export default HomePage;