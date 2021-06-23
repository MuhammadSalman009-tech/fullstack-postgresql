/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE IF NOT EXISTS comments
    (
        id uuid NOT NULL,
        description text,
        user_id uuid,
        post_id uuid,
        created_at timestamp without time zone,
        CONSTRAINT comments_id_key UNIQUE (id),
        CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id)
            REFERENCES posts (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE comments`);
};
