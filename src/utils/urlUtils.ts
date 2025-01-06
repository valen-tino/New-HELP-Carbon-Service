export const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };
  
  export const generateBlogUrl = (category: string, title: string): string => {
    return `/blogs/${slugify(category)}/${slugify(title)}`;
  };