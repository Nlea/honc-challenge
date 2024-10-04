import { type Context, Hono } from "hono";
import type { HonoEnv } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '../../db'


const races = new Hono<HonoEnv>();



races.get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const races = await db.select().from(schema.races);
    return c.json({races})
  })

races.post("/")

races.post("/race/:id/start")

export default races;