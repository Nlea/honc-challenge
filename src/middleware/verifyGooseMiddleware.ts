import { createMiddleware } from "hono/factory";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db";
import { eq } from "drizzle-orm";

export const verifyGooseMiddleware = createMiddleware(async (c, next) => {
	const idParam = c.req.param("id");
	if (!idParam) {
		return c.text("ID is required.", 400);
	}

	const id: number = Number(idParam);

	if (Number.isNaN(id) || id <= 0) {
		return c.text("Invalid ID. It must be a positive number.", 400);
	}

	const db = drizzle(c.env.DB);
	const [goose] = (
		await db
			.select()
			.from(schema.geese)
			.where(eq(schema.geese.id, +id))
			.limit(1)
	);

	if (!goose) {
		return c.json({ message: "Goose not found" }, 200);
	}

	c.set("goose", goose);

	await next();
});
