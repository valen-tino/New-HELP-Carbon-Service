'use client';

import { Card } from '@/components/ui/card';
import { Recommendations } from '@/app/components/dashboard/Recommendations';
import { useState, useEffect } from 'react';

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Personalized Recommendations</h1>
      
      <Card className="p-6">
        <Recommendations />
      </Card>
    </div>
  );
}