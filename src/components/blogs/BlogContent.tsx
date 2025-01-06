import React from 'react';
import { Blog } from '../../types/blog';
import { formatDate } from '../../utils/dateUtils';

interface Props {
  blog: Blog;
}

const BlogContent: React.FC<Props> = ({ blog }) => {
  const renderContent = () => {
    switch (blog.content_type) {
      case 'article':
        return blog.content.article && (
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{blog.content.article.body}</div>
            <div className="text-sm text-gray-500 mt-4">
              Reading time: {blog.content.article.readingTime} min
            </div>
          </div>
        );

      case 'video':
        return blog.content.video && (
          <div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={blog.content.video.url}
                title={blog.title}
                className="w-full h-[500px] rounded-lg"
                allowFullScreen
              />
            </div>
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
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>Published on {formatDate(blog.published_at)}</span>
          <span className="mx-2">•</span>
          <span>{blog.views} views</span>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default BlogContent;