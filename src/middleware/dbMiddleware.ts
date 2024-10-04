/* import { createMiddleware } from "hono/factory";
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { HonoEnv, DB } from "../types";

let db : DB | undefined;

function getDbInstance(db: DrizzleD1Database) {
    if (!db) {
        db = drizzle(db)
 
    }
  
    return db;
  }


export const dbMiddleware = createMiddleware<HonoEnv, "*">(async (c, next) => {
    const db = getDbInstance(c.env.DB);
    c.set("db", db);
  
    await next();
  }); */