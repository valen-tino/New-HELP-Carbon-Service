'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Activity, CarbonFootprint } from '@/types/user';
import { CarbonFootprintCards } from '@/app/components/dashboard/CarbonFootprintCards';
import { CarbonFootprintChart } from '@/app/components/dashboard/CarbonFootprintChart';
import { Recommendations } from '@/app/components/dashboard/Recommendations';

export default function DashboardPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [carbonFootprint, setCarbonFootprint] = useState<CarbonFootprint>({
    transportation: 0,
    energy: 0,
    diet: 0,
    total: 0,
  });

  useEffect(() => {
    // In a real app, fetch user's activities and carbon footprint
    const mockActivities = [
      { date: new Date('2024-01'), transportation: 400, energy: 240, diet: 320, type: 'transportation', value: 400, category: 'transportation' },
      { date: new Date('2024-02'), transportation: 300, energy: 139, diet: 221, type: 'energy', value: 139, category: 'energy' },
      { date: new Date('2024-03'), transportation: 200, energy: 980, diet: 229, type: 'diet', value: 229, category: 'diet' },
    ];
    setActivities(mockActivities);

    const mockFootprint = {
      transportation: 900,
      energy: 1359,
      diet: 770,
      total: 3029,
    };
    setCarbonFootprint(mockFootprint);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carbon Footprint Dashboard</h1>
      
      <CarbonFootprintCards carbonFootprint={carbonFootprint} />

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Carbon Footprint Trends</h3>
            <CarbonFootprintChart activities={activities} />
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Recommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}