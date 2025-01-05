export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  enrollmentCount: number;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
}