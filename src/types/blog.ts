export interface Blog {
    educational_content_id: number;
    admin_id: string;
    user_id?: string;
    content_type: 'article' | 'video' | 'infographic';
    title: string;
    description: string;
    content_url: string;
    uploaded_at: string;
  }
  
  export interface BlogInput {
    content_type: 'article' | 'video' | 'infographic';
    title: string;
    description: string;
    content_url: string;
  }