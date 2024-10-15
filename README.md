# 🪿 HONC Challenge

This is a project created with the `create-honc-app` d1 template. It contains some flaws and errors. 

## The API / story
Every 4 years it is Gooselympics. Everyone at the lake is super excited. this year the games will take place at lake Tahoe. Geese from all over the globe are travelling to compete in speed swimming, formation style and long distance flying. 

At the lake the wetlandwagers get exited to make bets for their favourite goose and also hope to win breadcrumbs for theit wallet. 


Start the application and in a new terminal start Fibperlane studio. Fiberplane sudio will make it easy for you to answer the questions in the Google form and it should't take long.

Anser the question from the form: 

- How many Database calls are made when calling the "xxx" endpoint ? 
- 

## Project structure

```#
├── src
│   ├── index.ts # Hono app entry point
│   └── db
│       └── schema.ts # Database schema
├── .dev.vars.example # Example .dev.vars file
├── .prod.vars.example # Example .prod.vars file
├── client.ts # Optional client script to seed the db
├── drizzle.config.ts # Drizzle configuration
├── package.json
├── tsconfig.json # TypeScript configuration
└── wrangler.toml # Cloudflare Workers configuration
```

## Commands for local development

Run the migrations and seed the database:

```sh
npm run db:touch
npm run db:generate
npm run db:migrate
```

Run the development server:

```sh
npm run dev
```
Once the application runs you can seed the database with the client script

```sh
npm run db:seed
```

## To Does 
- Serialization error
- Database duplication
- Wrong database handling


## API Design
- Goose character/ adoption store 
- Goose Summit / race competion
- GET/goose
- GET/race : query parameters ?opponent=Barnie 
- GET /lake-gossip
- GET /cocktail query parameters ?goose=Barnie
- POST/ cheat (if successfull +1 added to goose speed, if not successfull -2 added to goose speed)



Learn more about the HONC stack on the [website](https://honc.dev) or the main [repo](https://github.com/fiberplane/create-honc-app).

