import React from 'react';
import { Blog } from '../../types/blog';

interface Props {
  blog: Blog;
}

const BlogContent: React.FC<Props> = ({ blog }) => {
  const renderContent = () => {
    switch (blog.content_type) {
      case 'article':
        return blog.content.article && (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content.article.body }} />
            <div className="text-sm text-gray-500 mt-4">
              Reading time: {blog.content.article.readingTime} min
            </div>
          </div>
        );

      case 'video':
        return blog.content.video && (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={blog.content.video.url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
            <div className="text-sm text-gray-500 mt-2">
              Duration: {blog.content.video.duration} min
            </div>
          </div>
        );

      case 'infographic':
        return blog.content.infographic && (
          <div>
            <img
              src={blog.content.infographic.imageUrl}
              alt={blog.content.infographic.altText}
              className="w-full rounded-lg"
            />
          </div>
        );

      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
};

export default BlogContent;