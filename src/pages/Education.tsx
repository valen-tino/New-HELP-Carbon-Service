import React, { useState } from 'react';
import ArticleCard from '../components/education/ArticleCard';
import ResourceFilter from '../components/education/ResourceFilter';

// Example data - would come from API in production
const articles = [
  {
    id: '1',
    title: 'Understanding Carbon Footprint',
    description: 'Learn about the basics of carbon footprint and its impact on climate change.',
    readTime: 5,
    category: 'Basics',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Sustainable Transportation',
    description: 'Discover eco-friendly transportation alternatives for daily commuting.',
    readTime: 8,
    category: 'Transportation',
    imageUrl: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?auto=format&fit=crop&q=80'
  }
];

const categories = ['Basics', 'Transportation', 'Energy', 'Diet'];

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleArticleClick = (id: string) => {
    console.log('Opening article:', id);
  };

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Educational Resources</h1>
      
      <ResourceFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={handleArticleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Education;