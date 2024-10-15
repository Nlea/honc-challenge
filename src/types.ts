import type * as schema from "./db";
import { DrizzleD1Database } from 'drizzle-orm/d1';

type Bindings = {
    //DB: DrizzleD1Database
    DB: D1Database;
  };

export type HonoEnv ={
    Bindings: Bindings
}

export interface Goose {
  id: number;
  name: string;
  kind: string | null; 
  characteristics: string | null; 
  favouriteCocktail: string | null; 
  favouriteSnack: string | null; 
  favouriteLake: string | null; 
  speed: number;
  energyLevel: number;
  efficiency: number;
  style: number;
  precision: number;
  strategy: string | null; 
  catchphrase: string | null; 
}


//export type Db = DrizzleD1Database<typeof schema>;
//export type Db = D1Database<typeof schema>;