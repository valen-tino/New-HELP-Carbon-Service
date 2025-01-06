export type BlogType = 'article' | 'video' | 'infographic';

export interface Blog {
  educational_content_id: number;
  admin_id: string;
  content_type: BlogType;
  title: string;
  description: string;
  content: {
    article?: {
      body: string;
      readingTime: number;
    };
    video?: {
      url: string;
      duration: number;
    };
    infographic?: {
      imageUrl: string;
      altText: string;
    };
  };
  tags: string[];
  published_at: string;
  views: number;
}

export interface BlogInput {
  content_type: BlogType;
  title: string;
  description: string;
  content: Blog['content'];
  tags: string[];
}