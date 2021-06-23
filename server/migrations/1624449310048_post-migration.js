/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE IF NOT EXISTS posts
    (
        id uuid NOT NULL,
        description text,
        image text,
        user_id uuid,
        created_at timestamp without time zone,
        updated_at timestamp without time zone,
        title character varying(255) NOT NULL,
        CONSTRAINT posts_id_key UNIQUE (id),
        CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES public.users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE posts`);
};
