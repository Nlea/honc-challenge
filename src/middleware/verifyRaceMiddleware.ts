import { createMiddleware } from "hono/factory";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db";
import { eq } from "drizzle-orm";
import { raceTypesEnum, type Race, type Goose } from "../types";

export const verifyRaceMiddleware = createMiddleware(async (c, next) => {
	const idParam = c.req.param("id");
	const { goose1, goose2, goose3 } = await c.req.json();
	const geeseIds: number[] = [goose1, goose2, goose3];

	if (!idParam) {
		return c.text("ID is required.");
	}

	const id: number = Number(idParam);

	if (Number.isNaN(id) || id <= 0) {
		return c.text("Invalid ID. It must be a positive number.", 400);
	}

	const db = drizzle(c.env.DB);
	const [race] = (
		await db
			.select()
			.from(schema.races)
			.where(eq(schema.races.id, +id))
			.limit(1)
	);

	if (!race) {
		return c.json({ message: "Race not found" }, 404);
	}

	const validatedRace: Race = {
		id: race.id,
		name: race.name,
		type:
			race.type &&
			Object.values(raceTypesEnum).includes(race.type as raceTypesEnum)
				? (race.type as raceTypesEnum)
				: null, // Set to null if it's not a valid race type
		winner: race.winner,
	};

	c.set("race", validatedRace);

	const geese: Goose[] = [];

	for (let gooseId of geeseIds) {
		if (!gooseId) {
			return c.text("ID is required.");
		}

		gooseId = Number(gooseId);
		if (Number.isNaN(gooseId) || gooseId <= 0) {
			return c.text("Invalid ID. It must be a positive number.");
		}

		const db = drizzle(c.env.DB);

		const [goose] = (
			await db
				.select()
				.from(schema.geese)
				.where(eq(schema.geese.id, gooseId))
				.limit(1)
		);

		if (!goose) {
			return c.json({ message: "Goose not found" }, 404);
		}

		geese.push(goose);
	}

	c.set("geese", geese);

	await next();
});
