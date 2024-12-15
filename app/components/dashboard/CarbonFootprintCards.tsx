'use client';

import { Card } from '@/components/ui/card';
import { CarbonFootprint } from '@/types/user';
import { Zap, Car, Salad} from 'lucide-react';

interface CarbonFootprintCardsProps {
  carbonFootprint: CarbonFootprint;
}

export function CarbonFootprintCards({ carbonFootprint }: CarbonFootprintCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <Card className="p-4">
      <Car className="h-8 w-8 text-green-500 mb-2" />
        <h3 className="font-semibold mb-2">Transportation</h3>
        <p className="text-2xl">{carbonFootprint.transportation} kg CO2</p>
      </Card>
      <Card className="p-4">
      <Zap className="h-8 w-8 text-green-500 mb-2" />
        <h3 className="font-semibold mb-2">Energy</h3>
        <p className="text-2xl">{carbonFootprint.energy} kg CO2</p>
      </Card>
      <Card className="p-4">
      <Salad className="h-8 w-8 text-green-500 mb-2" />
        <h3 className="font-semibold mb-2">Diet</h3>
        <p className="text-2xl">{carbonFootprint.diet} kg CO2</p>
      </Card>
    </div>
  );
}
