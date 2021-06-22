import { pool } from "../db";
import { User } from "../types/users";

export class AuthRepository {
  static async insertOne(
    name: string,
    email: string,
    gender: boolean,
    hashedPassword: string
  ): Promise<string> {
    const user = await pool.query(
      `INSERT INTO users(id,name,email,avatar,gender,created_at,updated_at,password)
        VALUES(gen_random_uuid(),$1,$2,$3,$4,now(),now(),$5) returning id 
        `,
      [name, email, "avatar", gender, hashedPassword]
    );
    return user.rows[0].id;
  }
  static async findByEmail(email: string): Promise<any> {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    return user;
  }
  static async deleteOne(id: string, userID: string): Promise<number> {
    const postWithID = await pool.query(
      "DELETE FROM posts p WHERE p.id=$1 AND p.user_id=$2",
      [id, userID]
    );
    return postWithID.rowCount;
  }
}
