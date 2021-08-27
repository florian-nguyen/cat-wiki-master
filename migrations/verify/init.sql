BEGIN;

    SELECT *
    FROM breed
    WHERE false;

    ROLLBACK;