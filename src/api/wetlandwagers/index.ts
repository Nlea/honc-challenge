import { type Context, Hono } from "hono";
import type { HonoEnv } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '../../db'


const wetlandwagers = new Hono<HonoEnv>();


wetlandwagers.get("/", async (c) =>{
  const db = drizzle(c.env.DB)
  const wetlanderwagers = await db.select().from(schema.wetlandWagers)
  return c.json({wetlanderwagers})
})

wetlandwagers.post('/', async (c) => {
  const db = drizzle(c.env.DB);
  const {name, kind, luck, characteristics, favouriteCocktail, favouriteSnack, breadcrumbsWallet} = await c.req.json();

  await db.insert(schema.wetlandWagers).values({
    name: name,
    kind: kind, 
    luck: luck,
    characteristics: characteristics,
    favouriteCocktail: favouriteCocktail,
    favouriteSnack: favouriteSnack,
    breadcrumbsWallet: breadcrumbsWallet


  });
  return c.text("wetlandWager: "+ name + "inserted")
}
) 

wetlandwagers.post("/:id/bet", async (c)=>{
  const id = c.req.param('id');
  const {raceid, amount, } = await c.req.json();

})

wetlandwagers.get("/:id/wallet")

wetlandwagers.post("/:id/cheat")

wetlandwagers.get("/:id/bar")

export default wetlandwagers;
