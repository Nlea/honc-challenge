import { Hono, Context } from "hono";
import { instrument } from "@fiberplane/hono-otel";

import api from "./api";

import type { HonoEnv } from "./types";

const app = new Hono<HonoEnv>();

app.route("/api", api);

export default instrument(app, {
	libraryDebugMode: true,
	monitor: {
		fetch: true,
		logging: true,
		cfBindings: true,
	},
});
