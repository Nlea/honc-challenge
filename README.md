# 🪿 Gooselympics (HONC Challenge)
![Gooselympics](/img/gooselympics.png)


Every four years, geese from around the world gather to compete in various events. This year, the games will take place at Lake Tahoe. The wetland wagers are already excited, hoping to win money by betting on their favorite geese.

The following API represents part of the Gooselympics logic! It’s far from perfect, but that’s not important for participating in our coding challenge.

!

This project was created using the `create-honc-app` d1 template. You can learn more about the HONC stack on the [website](https://honc.dev) or the main [repo](https://github.com/fiberplane/create-honc-app).

## How to win
- get 7 answers right
- price: **35 $ Voucher**
- Refer to the README for setup instructions
- Use this [form](https://forms.gle/HLzabiZcAJqf9T8t8) to submit your answers
- Deadline: **November 30th, 2024**


Use this form to submit your answers.  and more details on the questions. The challenge is open until November 30th.

## Setting up the challenge
1. Clone this repo
2. Navigate to the repo and open a terminal
3. Set up the database, by running those commands
 - `npm run db:touch`
 - `npm run db:generate`
 - `npm run db:migrate`
3. Run the project locally
 - `npm run dev`
4. Open a second terminal in the same directory
- `npm run db:seed`
5. Use the same terminal to start Fiberplane studio
- `npx @fiberplane/studio`
6. Fiberplane studio now is running: Naviagte to http://localhost:8788

    You should see something like this: 

    ![Fiberplane Studio UI](/img/studioStart.png)

**Welcome to the Gooselympics!** :tada: You are now part of the games and have some control at your fingertips to gather information and influence the competition.

## Questions 
To participate in the challenge, please fill out this [Google Form](Everyone who can answer 7 questions right, wins a 35 amazon voucher. 

Use this [form](https://forms.gle/HLzabiZcAJqf9T8t8) to submit your answers). The questions are outlined below to make it easier to provide useful code snippets.

### All about the geese
![Pippa](/img/pippa.png)

1. **Which of the Geese is featured in the picture above?** 

2. `GET http://localhost:8787/api/geese/2`
**What is the favorite snack of the goose with ID 2?**

3. `GET http://localhost:8787/api/geese/8`
Try to retrieve information about the goose with ID 8. **What improvements could be made to the API response?**


4. ` POST http://localhost:8787/api/geese`: Try to add a new goose with the following details:
    ```json
    {
        "name": "Snowball",
        "kind": "Snow Goose",
        "characteristics": "Snowball is full of energy and loves to stay on the move. She’s always talking about her next big adventure and tends to daydream about tropical places (even though she hates heat).",
        "favouriteCocktail": "Pina Honka-lada",
        "favouriteSnack": "Slush ice",
        "favouriteLake": "Great Salt Lake",
        "strategy": "The Flurry Blitz: Snowball’s racing strategy is to burst out of the gate with high energy and try to overwhelm her competitors with speed right from the start. Her enthusiasm sometimes leads to sloppy mistakes, but when she’s on her game, she can be a blur of white feathers darting across the finish line. Snowball’s only weakness is her tendency to get distracted by photo ops, often stopping mid-race to check her reflection in a nearby puddle.",
        "speed": 10.2,
        "catchphrase": "Catch me if you can—just don’t ask me to slow down!",
        "energyLevel": 20,
        "efficiency": 6,
        "style": 6.7,
        "precision": 6.8
    }
    ```
    **What is the repsonse?**


5. **What do you see in the log from the above request?** (Open the log using the terminal icon in the corner or with the shortcut `g` followed by `l`.)

    ![Toggle logs](/img/Logbar.png)

6. `POST http://localhost:8787/api/geese/1/train`

    Example body
    ```json
    {"performanceindicator":"style"}
    ```

   Geese can train to improve their performance indicators. **When does the API return a 403 error?**

### All about the wetland wagers 
![Wetlandwagers](/img/wetlandwagers.png)

7. `GET http://localhost:8787/api/wetlandwagers/3`
**What is the name of the Wetland Wager with ID 3?**
8. `GET http://localhost:8787/api/wetlandwagers/3/wallet`
**How many breadcrumbs does the Wetland Wager with ID 3 have initially?**
9. `POST http://localhost:8787/api/wetlandwagers/3/cheat` 

    Example body:
    ```json
    {
        "gooseId": 5,
        "performanceindicator": "speed"
    }
    ```

    Wetland Wagers like to cheat to boost their chances of winning. Cheating can increase a goose’s performance indicator, but it comes with risks. If caught, there’s a penalty fee. 
    
    **What information is logged during the cheating request?** (Open the log bar again.)

10. When cheating, some data comes from an external API. Open the timeline in Fiberplane Studio (by clicking next to the log icon or using the shortcut `g` followed by `t`).

    ![Timeline](/img/timeline.png)
 

    Inspect the response headers from the Fetch, **what Cashing behaviour can you observe?**

### Competition time! 
11. `http://localhost:8787/api/races` **how many races exist?** 

12. `POST http://localhost:8787/api/races/2/start`

example body:
```json
{
  "goose1": 3,
  "goose2": 5,
  "goose3": 2

}
```

**How many database calls are made when starting a race?** (Hint: Use the timeline in Fiberplane Studio.)





















