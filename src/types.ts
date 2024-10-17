type Bindings = {
	//DB: DrizzleD1Database
	DB: D1Database;
};

export type HonoEnv = {
	Bindings: Bindings;
};

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

export enum performanceindicatorEnum {
	Speed = "speed",
	Precision = "precision",
	Efficiency = "efficiency",
	Style = "style",
}

export interface WetlandWager {
	id: number;
	name: string;
	kind: string;
	characteristics: string | null;
	breadcrumbsWallet: number;
	favouriteCocktail: string | null;
	favouriteSnack: string | null;
	luck: number;
}

export enum raceTypesEnum {
	Formation = "formation",
	SpeedSwimming = "speed swimming",
	LongDistanceFlight = "long distance flight",
}

export interface Race {
	id: number;
	name: string | null;
	type: raceTypesEnum | null;
	winner: number | null;
}
