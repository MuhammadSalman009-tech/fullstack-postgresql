export interface PostsWithUser {
  id: string;
  title: string;
  description: string;
  image: string;
  uName: string;
  created_at: string;
  likes: number;
  user_id: string;
}
export interface Post {
  id: string;
  description: string;
  image: string;
  user_id: string;
  created_at: string;
  upadated_at: string;
  title: string;
}
