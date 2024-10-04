import { type Context, Hono, Schema } from "hono";
import type { HonoEnv } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '../../db'


const geese = new Hono<HonoEnv>();

geese.get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const geese = await db.select().from(schema.geese);
    console.log(Object.getPrototypeOf(c.env.DB).constructor.name)
    return c.json({geese})
  })


  geese.get("/:id", async (c) => {
    const id = c.req.param('id');

    const db = drizzle(c.env.DB);
    const goose = (await db.select().from(schema.geese).where(eq(schema.geese.id, +id)))?.[0];

  if (!goose) {
    return c.json({ message: 'Goose not found' }, 404);
  }
    return c.json({goose})
  })

  geese.post("/:id/train", async (c) =>{
    const id = c.req.param('id');
    const db = drizzle(c.env.DB)
    //const {trainingsfocus} = await c.req.json()
    //console.log(trainingsfocus)

    const { trainingsfocus } = await c.req.json() as { trainingsfocus: keyof typeof schema.geese };
    if (trainingsfocus !== "speed" && 
        trainingsfocus !== "style" && 
        trainingsfocus !== "precision" && 
        trainingsfocus !== "efficiency") {
        return c.text("Sorry, this training focus doesn't exist. Valid training focuses are speed, style, precision, or efficiency.")
    }



    try{
        const [goose] = (await db.select().from(schema.geese).where(eq(schema.geese.id, +id)))
        if(!goose){
            return c.text("There is no Id matching the challenger goose")
        }

        const energyLevel = goose?.energyLevel
        const newEngeryLevel = energyLevel -3

        if(energyLevel < 1){
            return c.text("Sorry the goose has not enough energy left for training")
        }


        await db.update(schema.geese).set({energyLevel: goose?.energyLevel-3, [trainingsfocus]: goose?.[trainingsfocus] + 0.5}).where(eq(schema.geese.id, +id))
        return c.text("Training done, new energy level is  " + newEngeryLevel + "New " + [trainingsfocus] + " value: " + goose?.[trainingsfocus])



    }catch{

    }


})


geese.post("/:id/speed-challenge", async (c) => {
    const id = c.req.param('id');
    const { opponentId } = await c.req.json();

    const db = drizzle(c.env.DB)

    try{
        const [challengerGoose] = (await db.select().from(schema.geese).where(eq(schema.geese.id, +id)))
        const [opponentGoose] = (await db.select().from(schema.geese).where(eq(schema.geese.id, + opponentId)))

        if(!challengerGoose){
            return c.text("There is no Id matching the challenger goose")
        }

        if(!opponentGoose){
            return c.text("There is no Id matching the opponentGoose")
        }

        const challengersSpeed = challengerGoose?.speed
        const opponentSpeed = opponentGoose?.speed

    let winner;
        
    if(challengersSpeed > opponentSpeed){
        winner = challengerGoose?.name
        const newEngeryLevel = challengerGoose?.energyLevel -2
        const newSpeedLevel = challengerGoose?.speed + 0.7
    }else{
        winner = opponentGoose?.name
        const newEngeryLevel = challengerGoose?.energyLevel -4
        const newSpeedLevel = challengerGoose?.speed -0.7
    }

    return c.text("The winner is: "+ winner);


    }catch(e){
        console.error(e)
        return c.text("An error occurred while determining the winner")
    }

})


geese.post('/', async (c) => {
    const db = drizzle(c.env.DB);
    const {name, kind, speed, characteristics, favouriteCocktail, favouriteLake, favouriteSnack, catchphrase, strategy, energyLevel, efficiency, style, precision } = await c.req.json();
  
    await db.insert(schema.geese).values({
      name: name,
      kind: kind, 
      speed: speed,
      characteristics: characteristics,
      favouriteCocktail: favouriteCocktail,
      favouriteLake: favouriteLake,
      favouriteSnack: favouriteSnack,
      catchphrase: catchphrase,
      strategy: strategy,
      energyLevel: energyLevel,
      efficiency: efficiency,
      style: style,
      precision: precision
  
  
    });
    return c.text("goose: "+ name + "inserted")
  }
  )

  export default geese;
