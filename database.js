require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

module.exports = {
	// Create new breed

	getAllFavourites: async () => {
		const data = pool
			.query(`SELECT * FROM breed ORDER BY searches DESC`)
			.then((res) => res.rows)
			.catch((error) => {
				console.log(error);
				setImmediate(() => {
					throw error;
				});
			});

		return data;
	},

	createOrUpdateFavourite: async (name, imageUrl) => {
		const queryString = `
        INSERT INTO breed (name, searches, image_url)
        VALUES ($1, 1, $2)
        ON CONFLICT (name)
        DO UPDATE SET searches=breed.searches+1, image_url=$2
        WHERE breed.name=$1 RETURNING *;
        `;

		const data = pool
			.query(queryString, [name, imageUrl])
			.then((res) => res.rows)
			.catch((error) => {
				console.log(error);
				setImmediate(() => {
					throw error;
				});
			});

		return data;
	},

	// Increment search count to breed with name
};
