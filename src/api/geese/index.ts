import { type Context, Hono, Schema } from "hono";
import type { HonoEnv } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '../../db'
import { verifyGooseMiddleware} from "../../middleware"
import type { Goose } from "../../types";

const geese = new Hono<HonoEnv>();
declare module 'hono' {
    interface ContextVariableMap {
      goose: Goose
    }
  }

geese.use("/:id/*", verifyGooseMiddleware)

geese.get("/", async (c) => {
    const db = drizzle(c.env.DB);
    const geese = await db.select().from(schema.geese);
    return c.json({geese})
  })

  geese.get("/:id", async (c) => {
  const goose = c.get('goose')  
  return c.json(goose)
  })

  geese.post("/:id/train", async (c) =>{
    const { performanceindicator } = await c.req.json() as { performanceindicator: keyof typeof schema.geese };
    if (performanceindicator !== "speed" && 
        performanceindicator !== "style" && 
        performanceindicator !== "precision" && 
        performanceindicator !== "efficiency"

    ) {
            
        return c.text("Sorry, this performance indicator doesn't exist. Valid training focuses are speed, style, precision, or efficiency.", 400)
    }

    const goose = c.get('goose');
    const energyLevel = goose?.energyLevel ?? 0
        const newEngeryLevel = energyLevel -3
        const newLevel = goose?.[performanceindicator] + 0.5

        if(energyLevel < 1){
            return c.text("Sorry the goose has not enough energy left for training", 403)
        }

        try{
        const db = drizzle(c.env.DB)
        await db.update(schema.geese).set({energyLevel: goose.energyLevel-3, [performanceindicator]: goose?.[performanceindicator] + 0.5}).where(eq(schema.geese.id, +goose.id))
        return c.text(`Training done, new energy level is  ${newEngeryLevel} New ${[performanceindicator]} value: ${newLevel}`)

    }catch(e){
        console.error(e)
        return c.text(`An error occured while training: ${e}`)
    }

})


geese.post("/:id/speed-challenge", async (c) => {
    const { opponentId } = await c.req.json();
    const db = drizzle(c.env.DB)

    try{
        const [opponentGoose] = (await db.select().from(schema.geese).where(eq(schema.geese.id, + opponentId)))
        if(!opponentGoose){
            return c.text("There is no Id matching the opponentGoose", 404)
        }

        const challengerGoose = c.get('goose') 
        const challengersSpeed = challengerGoose.speed
        const opponentSpeed = opponentGoose?.speed


        let winner: string | undefined;
        let newEnergyLevel: number;
        let newSpeedLevel: number; 
        
        
    if(challengersSpeed > opponentSpeed){
        winner = challengerGoose?.name
        newEnergyLevel = challengerGoose.energyLevel -2
        newSpeedLevel = challengerGoose.speed + 0.7
    }else{
        winner = opponentGoose?.name
        newEnergyLevel = challengerGoose.energyLevel -4
        newSpeedLevel = challengerGoose.speed -0.7
    }
    await db.update(schema.geese).set({energyLevel: newEnergyLevel, speed: newSpeedLevel}).where(eq(schema.geese.id, + challengerGoose.id))

    return c.text(`The winner is: ${winner}`);


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
    return c.text(`goose: ${name}inserted`, 201)
  }
  )

  export default geese;
