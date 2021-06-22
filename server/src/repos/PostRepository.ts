import { pool } from "../db";
import { Post, PostsWithUser } from "../types/posts";

export class PostRepository {
  static async findMany(): Promise<PostsWithUser[]> {
    const postsWithUser =
      await pool.query<PostsWithUser>(`SELECT p.id,p.title,p.description,p.user_id,p.image,u.name,p.created_at,count(pr.id) as likes
      FROM posts as p
      LEFT JOIN users as u
      ON u.id=p.user_id
      LEFT JOIN post_reactions pr
      ON pr.post_id=p.id
      GROUP BY p.id,p.title,p.description,p.user_id,p.image,u.name,p.created_at
      ORDER BY p.created_at DESC`);

    return postsWithUser.rows;
  }
  static async insertOne(
    description: string,
    image: string,
    userID: string,
    title: string
  ): Promise<Post> {
    const newPost = await pool.query(
      `INSERT INTO posts(id,description,image,user_id,\
      created_at,updated_at,title) VALUES(gen_random_uuid(),$1,$2,$3,now(),now(),$4) Returning *`,
      [description, image, userID, title]
    );
    return newPost.rows[0];
  }
  static async findById(id: string): Promise<Post> {
    const postWithID = await pool.query<Post>(
      "SELECT * FROM posts WHERE id=$1",
      [id]
    );
    return postWithID.rows[0];
  }
  static async deleteOne(id: string, userID: string): Promise<number> {
    const postWithID = await pool.query(
      "DELETE FROM posts p WHERE p.id=$1 AND p.user_id=$2",
      [id, userID]
    );
    return postWithID.rowCount;
  }
}
