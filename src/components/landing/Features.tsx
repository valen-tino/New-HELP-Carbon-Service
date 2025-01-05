import React from 'react';
import { Activity, BookOpen, Users, Target } from 'lucide-react';

const features = [
  {
    name: 'Track Your Impact',
    description: 'Monitor your daily activities and see their environmental impact in real-time.',
    icon: Activity,
  },
  {
    name: 'Learn & Grow',
    description: 'Access educational resources and expert insights on sustainable living.',
    icon: BookOpen,
  },
  {
    name: 'Join the Community',
    description: 'Connect with like-minded individuals and share your sustainability journey.',
    icon: Users,
  },
  {
    name: 'Set Goals',
    description: 'Set personal environmental goals and track your progress over time.',
    icon: Target,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to make a difference
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools and resources you need to understand and reduce your environmental impact.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;