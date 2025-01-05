import React from 'react';
import { BookOpen } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: number;
  category: string;
  imageUrl: string;
}

interface Props {
  article: Article;
  onClick: (id: string) => void;
}

const ArticleCard: React.FC<Props> = ({ article, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(article.id)}
    >
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-green-600 font-medium">{article.category}</span>
          <span className="text-sm text-gray-500">·</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <BookOpen className="h-4 w-4" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">{article.title}</h3>
        <p className="text-sm text-gray-600">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;