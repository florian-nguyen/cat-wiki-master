BEGIN;

CREATE TABLE breed (
    id int GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL UNIQUE,
    image_url text NOT NULL DEFAULT '',
    searches int NOT NULL DEFAULT 0
);

COMMIT;