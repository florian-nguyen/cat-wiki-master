BEGIN;

-- Rappel de la structure
--TABLE breed (
--    id int GENERATED ALWAYS AS IDENTITY,
--    name text NOT NULL,
--    searches int NOT NULL DEFAULT 0
--);

INSERT INTO "breed" (name, searches, image_url) VALUES
('Aegean', 11, 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg'),
('Chartreux', 10, 'https://cdn2.thecatapi.com/images/j6oFGLpRG.jpg'),
('Munchkin', 20, 'https://cdn2.thecatapi.com/images/j5cVSqLer.jpg'),
('Norwegian Forest Cat', 16, 'https://cdn2.thecatapi.com/images/06dgGmEOV.jpg'),
('Ragdoll', 25, 'https://cdn2.thecatapi.com/images/oGefY4YoG.jpg');

COMMIT;