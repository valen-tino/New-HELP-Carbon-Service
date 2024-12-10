'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Leaf, BarChart2, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Track Your Carbon Footprint
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Make a positive impact on the environment by understanding and reducing your carbon footprint
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Track Progress</h2>
            </div>
            <p className="text-gray-600">
              Monitor your daily activities and see their environmental impact in real-time
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Get Insights</h2>
            </div>
            <p className="text-gray-600">
              Receive personalized recommendations to reduce your carbon footprint
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Track Progress</h2>
            </div>
            <p className="text-gray-600">
              Join a community of environmentally conscious individuals making a difference
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}