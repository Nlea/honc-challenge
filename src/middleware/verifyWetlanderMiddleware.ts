import { createMiddleware } from 'hono/factory'
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db'
import { eq } from 'drizzle-orm';



export const verifyWetlanderMiddleware = createMiddleware(async (c, next) => {
  const idParam = c.req.param('id')
  if (idParam === undefined) {
    return c.text('ID is required.');
  }

  const id: number = Number(idParam);

  if (Number.isNaN(id) || id <= 0) {
    return c.text('Invalid ID. It must be a positive number.');
  }

  const db = drizzle(c.env.DB);
  const wetlandWager = (await db.select().from(schema.wetlandWagers).where(eq(schema.wetlandWagers.id, + id)).limit(1))[0];

  if (!wetlandWager) {
    return c.json({ message: 'Wetland wager not found' }, 404);
  }
  

  c.set('wetlandwager', wetlandWager)

  await next()
})