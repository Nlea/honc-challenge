import { type Context, Hono } from "hono";
import type { HonoEnv } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import { and, eq } from 'drizzle-orm';
import * as schema from '../../db'
import { verifyWetlanderMiddleware } from "../../middleware";
import type { WetlandWager } from "../../types";
import { json } from "drizzle-orm/pg-core";


const wetlandwagers = new Hono<HonoEnv>();
declare module 'hono' {
  interface ContextVariableMap{
    wetlandwager: WetlandWager
  }
}

wetlandwagers.use("/:id/*", verifyWetlanderMiddleware)

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
  return c.text(`wetlandWager: ${name}inserted`, 201)
}
)

wetlandwagers.get("/:id", async (c) => {
  const wetlanderwager = c.get('wetlandwager')  
  return c.json(wetlanderwager)
  })

wetlandwagers.post("/:id/bet", async (c)=>{
  const {raceId, amount, gooseId } = await c.req.json();
  const db = drizzle(c.env.DB)
  const wetlanderwager = c.get('wetlandwager')

  try{

    const [goose] = (await db.select(). from(schema.geese).where(eq(schema.geese.id, + gooseId)))
    if(!goose){
      return c.text("There is no goose matching the id", 404)
    }

    const [race] =(await db.select().from(schema.races).where(eq(schema.races.id, + raceId)))
    if(!race){
      return c.text("There is no race matching the given id", 404)
    }

    if(amount > wetlanderwager.breadcrumbsWallet){
      return c.text ("There is not enough money left in the breadcumb wallet")
    }

    const [existingBet] = await db
    .select()
    .from(schema.bets)
    .where(and(
        eq(schema.bets.wetlandWagerId, wetlanderwager.id),
        eq(schema.bets.raceId, +raceId),
        eq(schema.bets.goose, + gooseId)
    )
    );

    if(existingBet){
      db.update(schema.bets).set({amount: existingBet.amount + amount}).where(eq(schema.bets.id, + existingBet.id))
    }

    else{

    await db.insert(schema.bets).values({
      wetlandWagerId: wetlanderwager.id,
      raceId: race.id,
      goose: gooseId,
      amount: amount
    })

    }
    await db.update(schema.wetlandWagers).set({breadcrumbsWallet: wetlanderwager.breadcrumbsWallet - amount}).where(eq(schema.wetlandWagers.id, + wetlanderwager.id))


    return c.text(`${wetlanderwager.name}has made a bet , wallet: ${[wetlanderwager.breadcrumbsWallet - amount]} breadcrumbs`)




  }catch (e){
    console.error(e)
        return c.text(`An error occurred while betting ${e}` );

  }

})

wetlandwagers.get("/:id/wallet", async (c)=>{
  const wetlanderwager = c.get('wetlandwager')
  console.log(wetlanderwager)
  return c.text(`${wetlanderwager.name}'s wallet contains: ${wetlanderwager.breadcrumbsWallet} breadcrumbs`)

})

wetlandwagers.post("/:id/cheat", async (c)=>{
  const wetlanderwager = c.get('wetlandwager')
  const { gooseId } = await c.req.json()
  const db = drizzle(c.env.DB);

  const { performanceindicator } = await c.req.json() as { performanceindicator: keyof typeof schema.geese };
    if (performanceindicator !== "speed" && 
        performanceindicator !== "style" && 
        performanceindicator !== "precision" && 
        performanceindicator !== "efficiency") {
        return c.text("Sorry, this performance indicator doesn't exist. Valid training focuses are speed, style, precision, or efficiency.", 404)
    }


  try{
    const [goose] = (await db.select(). from(schema.geese).where(eq(schema.geese.id, + gooseId)))
    if(!goose){
      return c.text("There is no goose matching the id", 404)
    }

    const successThreashold = 100 - (10 * wetlanderwager.luck)
    console.log(`success threashold: ${successThreashold}`)

    const randomnumberapi = await fetch("http://www.randomnumberapi.com/api/v1.0/random?min=0&max=100&count=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })

    const randomNumber = await randomnumberapi.json() as number[]; 
    console.log(`random number: ${randomNumber}`)

    if(randomNumber[0] < successThreashold){
      db.update(schema.wetlandWagers).set({breadcrumbsWallet: wetlanderwager.breadcrumbsWallet -10000}).where(eq(schema.wetlandWagers.id, +wetlanderwager.id))
      return c.text("Your cunning scheme ruffled a few feathers! You've been caught and now face a 10,000 breadcrumbs penalty.", 403)

    }
      db.update(schema.geese).set({[performanceindicator]: goose?.[performanceindicator] + 5}).where(eq(schema.geese.id, + gooseId))
      return c.text("With a sly grin and a flick of a feather, you outsmarted the flock—no one at the Gooselympics suspected a thing!", 200)

  }catch (e){
    console.error(e)
        return c.text(`An error occurred while cheating ${e}` );

  }

})

wetlandwagers.post("/:id/bar", async (c)=>{    
  const wetlanderwager = c.get('wetlandwager')

  const { gooseId } = await c.req.json();

  const db = drizzle(c.env.DB);

  try{
    const [goose] = (await db.select(). from(schema.geese).where(eq(schema.geese.id, + gooseId)))
    if(!goose){
      return c.text("There is no goose matching the id", 404)
    }

    db.update(schema.wetlandWagers).set({breadcrumbsWallet: wetlanderwager.breadcrumbsWallet - 100}).where(eq(schema.wetlandWagers.id, +wetlanderwager.id))
    db.update(schema.geese).set({energyLevel: goose.energyLevel + 5}).where(eq(schema.geese.id, +goose.id))


    return c.text(`${wetlanderwager.name} bought a ${goose.favouriteCocktail} for ${goose.name}`, 200)

  }catch (e){
    console.error(e)
        return c.text(`An error occurred while getting a drink ${e}` );

  }



})

export default wetlandwagers;
