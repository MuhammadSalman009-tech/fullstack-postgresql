import { pool } from "../db";
import { Comment } from "../types/comments";

export class CommentRepository {
  static async findManyById(post_id: string): Promise<Comment[]> {
    const comments = await pool.query<Comment>(
      `select c.post_id,c.user_id,c.description,c.created_at,c.id,u.name,count(cr.id) as likes  
      from comments as c 
      inner join users as u 
      ON u.id = c.user_id 
      inner join posts as p ON p.id=c.post_id 
      LEFT JOIN comment_reactions as cr
      ON c.id=cr.comment_id
      WHERE c.post_id=$1
      GROUP By c.post_id,c.user_id,c.description,c.created_at,c.id,u.name`,
      [post_id]
    );

    return comments.rows;
  }
  static async insertOne(
    description: string,
    post_id: string,
    userID: string
  ): Promise<number> {
    const newCommentCount = await pool.query(
      `INSERT INTO comments(id,description,user_id,post_id,created_at) values(gen_random_uuid(),$1,$2,$3,NOW())`,
      [description, userID, post_id]
    );
    return newCommentCount.rowCount;
  }
  static async deleteOne(id: string, userID: string): Promise<number> {
    const deletedPost = await pool.query(
      "DELETE FROM comments c WHERE c.id=$1 AND c.user_id=$2",
      [id, userID]
    );
    return deletedPost.rowCount;
  }
}
