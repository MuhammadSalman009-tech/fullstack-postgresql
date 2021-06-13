import { pool } from "../db";
import { User } from "../types/users";

export class UserRepository {
  static async findMany(): Promise<User[]> {
    const postsWithUser = await pool.query<User>("SELECT * FROM users");
    return postsWithUser.rows;
  }
  static async insertOne(
    name: string,
    email: string,
    avatar: string,
    gender: boolean
  ): Promise<User> {
    const newUser = await pool.query<User>(
      `INSERT INTO users(id,name,email,avatar,gender,
            created_at,updated_at) VALUES(gen_random_uuid(),$1,$2,$3,$4,now(),now())`,
      [name, email, avatar, gender]
    );
    return newUser.rows[0];
  }
  static async findById(id: string): Promise<User> {
    const userWithID = await pool.query<User>(
      "SELECT * FROM users WHERE id=$1",
      [id]
    );
    return userWithID.rows[0];
  }
}
