import { type Context, Hono } from "hono";
import type { HonoEnv } from "../types";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from "../db/schema";
import geese from "./geese"
import wetlandwagers from "./wetlandwagers";
import races from "./races";



const api = new Hono<HonoEnv>();

api.route("/geese", geese )
api.route("/wetlandwagers", wetlandwagers)
api.route("/races", races)


api.get("/",(c) => {
    return c.text('Welcome to the Gooselympics!')

})


export default api;
