/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE IF NOT EXISTS comment_reactions
    (
        id uuid NOT NULL,
        user_id uuid,
        comment_id uuid,
        updated_at character varying(100),
        created_at character varying(100),
        CONSTRAINT comment_reactions_id_key UNIQUE (id),
        CONSTRAINT comment_reaction_comment_id_fkey FOREIGN KEY (comment_id)
            REFERENCES comments (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT comment_reactions_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE comment_reactions`);
};
