# 🪿 HONC Challenge

This is a project created with the `create-honc-app` d1 template. It contains some flaws and errors. 

The API: yearly geese race day. Everyone at the lake is super excited. 

Start the application and a next terminal start Fibperlane to get information from the race day and also identify flaws and erros. 

Anser the question from the form: 

- Who is participating in the 500 m swim race?
- Without cheating: Which goose is faster? 


## Getting started
[D1](https://developers.cloudflare.com/d1/) is Cloudflare's serverless SQL database. Running HONC with a D1 database involves two key steps: first, setting up the project locally, and second, deploying it in production. You can spin up your D1 database locally using Wrangler. If you're planning to deploy your application for production use, ensure that you have created a D1 instance in your Cloudflare account.

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

Run the migrations and (optionally) seed the database:

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
npm run client
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

Goose table
-name
-kind
-favourit lake
-hobby
-favourit cocktail
-speed

Race table
- race type
- participants

Bet table
- user (lake animal)
- goose
- race type
- amount (breadcrumbs)

Lake animals tables
- name
- kind (frog, duck, otter, beaver, swan, crow)
- favourite goose
- 




You can now visit the worker’s address and access the API. If you wish, you can update the endpoint in the `client.ts` file to point to your deployed worker's address and run the script with `npm run client` to populate the D1 database in production.

Learn more about the HONC stack on the [website](https://honc.dev) or the main [repo](https://github.com/fiberplane/create-honc-app).

