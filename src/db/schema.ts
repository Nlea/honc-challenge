import {sql} from "drizzle-orm";
import { integer, sqliteTable, text, real, unique } from 'drizzle-orm/sqlite-core';

export const geese = sqliteTable("geese", {
  id: integer("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  kind: text("kind"),
  characteristics: text("characteristics"),
  favouriteCocktail: text("favouriteCocktail"),
  favouriteSnack : text("favouriteSnack"),
  favouriteLake: text("favouriteLake"),
  speed: real("speed").notNull(),
  energyLevel: real("energyLevel").notNull(),
  efficiency: real("efficiency").notNull(),
  style: real("style").notNull(),
  precision: real("precision").notNull(),
  strategy: text ("strategy"),
  catchphrase: text ("catchphrase"),

});

export const wetlandWagers = sqliteTable("wetlandWagers", {
  id: integer("id", {mode:"number"}).primaryKey(),
  name: text("name").notNull(),
  kind: text("kind"). notNull(),
  characteristics: text("characteristics"),
  breadcrumbsWallet: integer("breadcrumbs", {mode: "number"}).notNull(),
  favouriteCocktail: text("favouriteCocktail"),
  favouriteSnack : text("favouriteSnack"),
  luck: integer("luck", {mode: "number"}) 

} , (t) => ({
  unq: unique().on(t.id, t.name),
  unq2: unique('custom_name').on(t.id, t.name)
})

);

export const races = sqliteTable("races", {
  id: integer("id", {mode: "number"}).primaryKey(),
  name: text("name"),
  type : text("type") , 
  winner: integer("gooseId", {mode:"number"}).references(() => geese.id)
}); 


export const bets = sqliteTable ("bets",{
  id: integer("id", {mode: "number"}).primaryKey(),
  wetlandWagerId: integer("wetlandWagerId", {mode: "number"}).references(() => wetlandWagers.id),
  raceId: integer("raceId", {mode: "number"}).references(()=> races.id),
  goose: integer("gooseId", {mode: "number"}).references(()=> geese.id),
  amount: integer("amount", { mode:"number"})
});