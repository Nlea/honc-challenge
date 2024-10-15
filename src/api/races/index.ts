import { type Context, Hono } from "hono";
import { HonoEnv, performanceindicatorEnum } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db'
import { verifyRaceMiddleware } from "../../middleware";
import { Race, raceTypesEnum } from "../../types";

const races = new Hono<HonoEnv>();
declare module 'hono' {
  interface ContextVariableMap {
    race: Race
  }
}

races.use("/:id/*", verifyRaceMiddleware)

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
  const race = c.get('race') 
  
const {goose1, goose2, goose3 } = await c.req.json();

let performanceindicator: performanceindicatorEnum[]

if(race.type === raceTypesEnum.Formation){
  performanceindicator = [performanceindicatorEnum.Style, performanceindicatorEnum.Efficiency, performanceindicatorEnum.Precision]

  

}

if(race.type === raceTypesEnum.LongDistanceFlight){
  performanceindicator =[performanceindicatorEnum.Efficiency, performanceindicatorEnum.Speed, performanceindicatorEnum.Precision]

}

if(race.type === raceTypesEnum.SpeedSwimming){
  performanceindicator = [performanceindicatorEnum.Speed, performanceindicatorEnum.Style, performanceindicatorEnum.Precision]

}else{
  return c.text("Sorry this type of a race does not exist in the international Gooselympics", 404)
}

})



export default races;