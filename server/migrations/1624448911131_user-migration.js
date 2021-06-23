/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE IF NOT EXISTS users
    (
        id uuid NOT NULL,
        name character varying(255) ,
        email character varying(255) NOT NULL UNIQUE,
        avatar text,
        gender boolean,
        created_at timestamp without time zone,
        updated_at timestamp without time zone,
        password text NOT NULL,
        CONSTRAINT users_id_key UNIQUE (id)
    )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE users`);
};
