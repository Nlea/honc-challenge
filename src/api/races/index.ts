import { type Context, Hono } from "hono";
import { type HonoEnv, performanceindicatorEnum } from "../../types";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '../../db'
import { verifyRaceMiddleware } from "../../middleware";
import { type Race, raceTypesEnum, type Goose } from "../../types";

const races = new Hono<HonoEnv>();
declare module 'hono' {
  interface ContextVariableMap {
    race: Race
    geese: Goose[]
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
  return c.text("Race inserted successfully", 201);
})

races.post("/:id/start", async (c) => {

  const race = c.get('race');
  const geese: Goose[] = c.get('geese');
  const db = drizzle(c.env.DB);

  if (!race || !geese) {
    return c.json({ message: 'Race or geese not found' }, 404);
  }

  let performanceindicators: performanceindicatorEnum[];

  if (race.type === raceTypesEnum.Formation) {
    performanceindicators = [
      performanceindicatorEnum.Style,
      performanceindicatorEnum.Efficiency,
      performanceindicatorEnum.Precision,
    ];
  } else if (race.type === raceTypesEnum.LongDistanceFlight) {
    performanceindicators = [
      performanceindicatorEnum.Efficiency,
      performanceindicatorEnum.Speed,
      performanceindicatorEnum.Precision,
    ];
  } else if (race.type === raceTypesEnum.SpeedSwimming) {
    performanceindicators = [
      performanceindicatorEnum.Speed,
      performanceindicatorEnum.Style,
      performanceindicatorEnum.Precision,
    ];
  } else {
    return c.text(
      'Sorry, this type of race does not exist in the international Gooselympics',
      404
    );
  }

  let highestScore = -1;
  let winner: Goose | null = null;

  for (const goose of geese) {
    const score = calculateGooseScore(goose, performanceindicators);

    if (score > highestScore) {
      highestScore = score;
      winner = goose;
    }
  }

  if (winner) {
    await db
      .update(schema.races)
      .set({ winner: winner.id })
      .where(eq(schema.races.id, +race.id));

    return c.text(`The winner is: ${winner.name}`);
  }
    return c.text('No winner could be determined.', 500);
});

// Goose score
function calculateGooseScore(goose: Goose, performanceIndicators: performanceindicatorEnum[] = []): number {
  let totalScore = 0;

  for (const indicator of performanceIndicators) {
    totalScore += goose[indicator];
  }
  

  return totalScore / performanceIndicators.length;
}




export default races;