import { createMiddleware } from 'hono/factory'
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db'
import { eq } from 'drizzle-orm';



export const verifyGooseMiddleware = createMiddleware(async (c, next) => {
  const idParam = c.req.param('id')
  if (idParam === undefined) {
    return c.text('ID is required.');
  }

  const id: number = Number(idParam);

  if (isNaN(id) || id <= 0) {
    return c.text('Invalid ID. It must be a positive number.');
  }

  const db = drizzle(c.env.DB);
  const goose = (await db.select().from(schema.geese).where(eq(schema.geese.id, + id)).limit(1))[0];

  if (!goose) {
    return c.json({ message: 'Goose not found' }, 404);
  }

  c.set('goose', goose)

  await next()
})