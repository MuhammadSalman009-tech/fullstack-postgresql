import { pool } from "../db";

export class LikePostRepository {
  static async insertOne(post_id: string, userID: string): Promise<number> {
    const result = await pool.query(
      `INSERT INTO post_reactions(id,post_id,user_id,created_at,updated_at)
          values(gen_random_uuid(),$1,$2,NOW(),NOW())`,
      [post_id, userID]
    );
    return result.rowCount;
  }
  static async findById(post_id: string, userID: string): Promise<number> {
    const result = await pool.query(
      `SELECT * FROM post_reactions WHERE user_id=$1
        AND post_id=$2`,
      [userID, post_id]
    );
    return result.rowCount;
  }
  static async deleteOne(post_id: string, userID: string): Promise<number> {
    const result = await pool.query(
      `DELETE from post_reactions WHERE post_id=$1 AND user_id=$2 `,
      [post_id, userID]
    );
    return result.rowCount;
  }
}
