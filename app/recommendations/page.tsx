'use client';

import { Card } from '@/components/ui/card';
import Recommendations from '@/app/components/dashboard/Recommendations';
import { CarbonFootprint } from '../../types/others';
import { useState, useEffect } from 'react';
import { useSession } from '@/hooks/use-session';
import { useRouter } from 'next/navigation';

export default function RecommendationsPage() {
  const [footprint, setFootprint] = useState<CarbonFootprint>({
    transportationEmission: 75,
    energyEmission: 100,
    dietaryEmission: 25,
    totalEmission: 250,
  });
  const { user } = useSession();
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Personalized Recommendations</h1>
      <Card className="p-6">
        <Recommendations footprint={footprint}/>
      </Card>
    </div>
  );
}