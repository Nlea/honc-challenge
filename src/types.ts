import type * as schema from "./db";
import { DrizzleD1Database } from 'drizzle-orm/d1';

type Bindings = {
    //DB: DrizzleD1Database
    DB: D1Database;
  };

export type HonoEnv ={
    Bindings: Bindings
}


//export type Db = DrizzleD1Database<typeof schema>;
//export type Db = D1Database<typeof schema>;