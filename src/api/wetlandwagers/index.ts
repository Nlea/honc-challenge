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
  const idParam = c.req.param('id');
  const {raceId, amount, gooseId } = await c.req.json();
  const db = drizzle(c.env.DB)

  if (idParam === undefined) {
    return c.text('ID is required.');
  }

  const id: number = Number(idParam);

  if (isNaN(id) || id <= 0) {
    return c.text('Invalid ID. It must be a positive number.');
  }


  try{
    const [wetlandWager] = (await db.select().from(schema.wetlandWagers).where(eq(schema.wetlandWagers.id, +id)))
    if(!wetlandWager){
      return c.text("There is no Wetland wager matching the given id")
    }

    const [goose] = (await db.select(). from(schema.geese).where(eq(schema.geese.id, + gooseId)))
    if(!goose){
      return c.text("There is no goose matching the id")
    }

    const [race] =(await db.select().from(schema.races).where(eq(schema.races.id, + raceId)))
    if(!race){
      return c.text("There is no race matching the given id")
    }

    if(amount > wetlandWager?.breadcrumbsWallet){
      return c.text ("There is not enough money left in the breadcumb wallet")
    }

    await db.insert(schema.bets).values({
      wetlandWagerId: id,
      raceId: id,
      goose: gooseId,
      amount: amount
    })


  }catch (e){
    console.error(e)
        return c.text("An error occurred while betting " + e);

  }

})

wetlandwagers.get("/:id/wallet", async (c)=>{
  const id = c.req.param('id');
  const db = drizzle(c.env.DB)

try{
  const [wetlandWager] = (await db.select().from(schema.wetlandWagers).where(eq(schema.wetlandWagers.id, +id)))
  if(!wetlandWager){
    return c.text("There is no Wetland wager matching the given id")
  }

  return c.text(wetlandWager?.name +"'s wallet contains: "+ wetlandWager?.breadcrumbsWallet + " breadcrumbs")

}catch (e){
  console.error(e)
        return c.text("An error occurred")

}

})

wetlandwagers.post("/:id/cheat", async (c)=>{
  const id = c.req.param('id');
  // goose id , influence on the performance indicators

})

wetlandwagers.post("/:id/bar", async (c)=>{
  const id = c.req.param('id');
  // Energy level of a goose goes up
})

export default wetlandwagers;
