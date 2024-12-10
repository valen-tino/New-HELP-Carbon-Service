'use client';

import { Card } from '@/components/ui/card';
import { Leaf, Bus, Lightbulb } from 'lucide-react';

export function Recommendations() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Personalized Recommendations</h3>
      <ul className="space-y-4">
        <li className="flex items-start space-x-3">
          <Bus className="h-5 w-5 text-green-500 mt-0.5" />
          <p>Consider using public transportation more frequently to reduce your transportation emissions.</p>
        </li>
        <li className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-green-500 mt-0.5" />
          <p>Switch to LED bulbs to reduce your energy consumption.</p>
        </li>
        <li className="flex items-start space-x-3">
          <Leaf className="h-5 w-5 text-green-500 mt-0.5" />
          <p>Try incorporating more plant-based meals into your diet.</p>
        </li>
      </ul>
    </Card>
  );
}