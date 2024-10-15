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

races.post("/", async (c) =>{
  const db = drizzle(c.env.DB);
  const {name, type, winner } = await c.req.json();

  await db.insert(schema.races).values({
    name: name,
    type: type,
    winner: winner
  })
})

races.post("/:id/start", async (c) =>{
const {goose1, goose2, goose3 } = await c.req.json();

})



export default races;