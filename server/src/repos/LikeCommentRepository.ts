import { pool } from "../db";

export class LikeCommentRepository {
  static async insertOne(comment_id: string, userID: string): Promise<number> {
    const result = await pool.query(
      `INSERT INTO comment_reactions(id,comment_id,user_id,created_at,updated_at)
          values(gen_random_uuid(),$1,$2,NOW(),NOW())`,
      [comment_id, userID]
    );
    return result.rowCount;
  }
  static async findById(comment_id: string, userID: string): Promise<number> {
    const result = await pool.query(
      `SELECT * FROM comment_reactions WHERE user_id=$1
        AND comment_id=$2`,
      [userID, comment_id]
    );
    return result.rowCount;
  }
  static async deleteOne(comment_id: string, userID: string): Promise<number> {
    const result = await pool.query(
      `DELETE from comment_reactions WHERE comment_id=$1 AND user_id=$2 `,
      [comment_id, userID]
    );
    return result.rowCount;
  }
}
