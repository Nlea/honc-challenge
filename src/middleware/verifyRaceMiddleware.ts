import { createMiddleware } from 'hono/factory'
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db'
import { eq } from 'drizzle-orm';



export const verifyRaceMiddleware = createMiddleware(async (c, next) => {
  const idParam = c.req.param('id')
  if (idParam === undefined) {
    return c.text('ID is required.');
  }

  const id: number = Number(idParam);

  if (isNaN(id) || id <= 0) {
    return c.text('Invalid ID. It must be a positive number.', 400);
  }

  const db = drizzle(c.env.DB);
  const race = (await db.select().from(schema.races).where(eq(schema.races.id, + id)).limit(1))[0];

  if (!race) {
    return c.json({ message: 'Goose not found' }, 404);
  }

  c.set('race', race)

  await next()
})