import { createMiddleware } from "hono/factory";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db";
import { eq } from "drizzle-orm";
import { raceTypesEnum, type Race, type Goose } from "../types";

export const verifyRaceMiddleware = createMiddleware(async (c, next) => {
	const idParam = c.req.param("id");
	const { goose1, goose2, goose3 } = await c.req.json();
	const arr_geeseId: number[] = [goose1, goose2, goose3];

	if (idParam === undefined) {
		return c.text("ID is required.");
	}

	const id: number = Number(idParam);

	if (Number.isNaN(id) || id <= 0) {
		return c.text("Invalid ID. It must be a positive number.", 400);
	}

	const db = drizzle(c.env.DB);
	const raceDb = (
		await db
			.select()
			.from(schema.races)
			.where(eq(schema.races.id, +id))
			.limit(1)
	)[0];

	if (!raceDb) {
		return c.json({ message: "Race not found" }, 404);
	}

	const race: Race = {
		id: raceDb.id,
		name: raceDb.name,
		type:
			raceDb.type &&
			Object.values(raceTypesEnum).includes(raceDb.type as raceTypesEnum)
				? (raceDb.type as raceTypesEnum)
				: null, // Set to null if it's not a valid race type
		winner: raceDb.winner,
	};

	c.set("race", race);

	const arr_geese: Goose[] = [];

	for (const value of arr_geeseId) {
		if (value === undefined) {
			return c.text("ID is required.");
		}

		const gooseId = Number(value);
		if (Number.isNaN(gooseId) || gooseId <= 0) {
			return c.text("Invalid ID. It must be a positive number.");
		}

		const db = drizzle(c.env.DB);

		const goose = (
			await db
				.select()
				.from(schema.geese)
				.where(eq(schema.geese.id, gooseId))
				.limit(1)
		)[0];

		if (!goose) {
			return c.json({ message: "Goose not found" }, 404);
		}

		arr_geese.push(goose);
	}

	c.set("geese", arr_geese);

	await next();
});
