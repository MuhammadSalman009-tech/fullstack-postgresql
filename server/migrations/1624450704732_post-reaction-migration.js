/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE IF NOT EXISTS post_reactions
    (
        id uuid NOT NULL,
        user_id uuid,
        post_id uuid,
        created_at character varying(100) NOT NULL,
        updated_at character varying(100) NOT NULL,
        CONSTRAINT post_reactions_id_key UNIQUE (id),
        CONSTRAINT post_reactions_post_id_fkey FOREIGN KEY (post_id)
            REFERENCES posts (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT post_reactions_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE post_reactions`);
};
