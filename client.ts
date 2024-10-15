import axios from 'axios';
import { date } from 'drizzle-orm/mysql-core';

interface Goose {
  name: string;
  kind: string;
  characteristics: string;
  favouriteCocktail: string;
  favouriteSnack: string;
  favouriteLake: string;
  strategy: string;
  energyLevel: number;
  efficiency: number;
  speed: number;
  style: number;
  precision: number;
  catchphrase: string

}

interface WetlandWager {
  name: string;
  kind: string;
  character: string;
  breadcrumbsWallet: number;
  luck: number;
  favouriteCocktail: string;
  favouriteSnack: string;

}

interface Race {
  name: string;
  type: string;

}

const seedGeeseData: Goose[] = [
  { name: 'Gordon', kind: 'Canda Goose', characteristics: 'Gordon is the natural leader of the flock. He’s confident, loud, and always knows the best migration routes. A bit bossy, he loves to take charge, whether the flock agrees or not.', favouriteCocktail: 'Maple Syrup Old Fashioned', favouriteSnack: 'Tim Hortons donut crumbs', favouriteLake: 'Lake Ontario', strategy: 'The V-Formation Charge: Gordon leads with a V-formation strategy, pushing his flock into a coordinated start. His plan is to set a strong pace, showing off his skills while making sure everyone knows he’s in charge. He believes that teamwork will get them ahead, and he yells motivational phrases to keep everyone in line. If anyone falls behind, Gordon swoops back to rally them, insisting on finishing strong together—even if it annoys them.', speed: 9.5, catchphrase: 'Onward and upward, team—follow my lead!', energyLevel: 20, efficiency: 6.5, style:8.4, precision: 7.3 },
  { name: 'Pippa', kind: 'Pink-footed Goose', characteristics: 'Pippa is the fashionista of the flock. Always showing off her perfect pink feet, she’s the goose with style, grace, and an eye for the latest pond trends. Her vanity is only rivaled by her love of shiny objects.', favouriteCocktail: 'Cos-honk-politan', favouriteSnack: 'Dried cranberries', favouriteLake: 'Lake Geneva', strategy: 'Strut, Then Sprint:  Pippa likes to start slow—mostly because she’s showing off her perfectly groomed feathers and feet to the crowd. But when she feels she’s made a strong fashion statement, she’ll kick into high gear. Her race strategy relies on her perfect timing; she knows when to stop strutting and start sprinting, leaving her opponents distracted by her dazzling looks as she zips ahead in a flurry of stylish honks.', speed: 8.8, catchphrase: 'Darling, it’s not just about winning—it’s about winning in style!',energyLevel: 20, efficiency: 7.1 , style:9.2, precision: 8.6},
  { name: 'Snowball', kind: 'Snow Goose', characteristics: 'Snowball is full of energy and loves to stay on the move. She’s always talking about her next big adventure and tends to daydream about tropical places (even though she hates heat).', favouriteCocktail: 'Pina Honka-lada', favouriteSnack: 'Slush ice', favouriteLake: 'Great Salt Lake', strategy: 'The Flurry Blitz: Snowball’s racing strategy is to burst out of the gate with high energy and try to overwhelm her competitors with speed right from the start. Her enthusiasm sometimes leads to sloppy mistakes, but when she’s on her game, she can be a blur of white feathers darting across the finish line. Snowball’s only weakness is her tendency to get distracted by photo ops, often stopping mid-race to check her reflection in a nearby puddle.', speed: 10.2, catchphrase: 'Catch me if you can—just don’t ask me to slow down!',energyLevel: 20, efficiency: 6 , style:6.7, precision: 6.8},
  { name: 'Nani the Nēnē', kind: 'Hawaiian Goose', characteristics: 'Nani is laid-back, warm, and always goes with the flow. She’s a tropical goose who loves sunshine, surfing (or at least floating on waves), and chilling by the shore with a coconut shell drink.', favouriteCocktail: 'Tropical Honk Punch', favouriteSnack: 'fresh Mango slices', favouriteLake: 'Lake Waiau', strategy: 'Nani relies on her ability to glide effortlessly. She doesn’t rush or try to outpace the other geese from the start. Instead, she waits for the perfect moment to catch a tailwind or draft behind the faster competitors. When she feels the breeze, she spreads her wings, leans into it, and coasts gracefully ahead. Her whole strategy revolves around conserving energy and letting nature do the work.', speed:7.7 , catchphrase: 'The key to winning is just going with the flow, brah!',energyLevel: 20,efficiency: 8.2 , style:8.6, precision: 9.2},
  { name: 'Bufford "Buff" McHonk', kind: 'American Buff Goose', characteristics: 'Bufford is the laid-back, easy-going goose of the race. He’s friendly, strong, and always the calmest in the crowd. Buff doesn’t get flustered or angry easily and loves to chill by the lake, taking his time to enjoy life. Despite his relaxed demeanor, he’s surprisingly competitive when it comes to racing.', favouriteCocktail: 'Cucumber Cooler', favouriteSnack: 'peanut butter and jelly toast', favouriteLake: 'Lake Lounger', strategy: 'Buff’s race strategy is to hang back, observing the chaos unfold, waiting for the perfect moment to make his move. He likes to cruise in the middle of the pack until the final stretch, then turn on the jets, leaving everyone surprised.', speed: 9.2, catchphrase: 'It’s not about how fast you start, it’s about when you finish.',energyLevel: 20, efficiency: 6.8 , style:6.4, precision: 7.4},
];

const seedWetlandersData: WetlandWager[]=[
  {
    name: 'Skip', kind: 'Nothern water snake',
    character: ' Industrious and strategic, always tweaking her bets for maximum payout',
    breadcrumbsWallet: 75000,
    luck: 7,
    favouriteCocktail: 'Maple Mudslide',
    favouriteSnack: 'Cheddar Cheese Crackers'
  },
  {
    name: 'Ollie', kind: 'River otter',
    character: ' Playful and fun-loving, Ollie makes bets for the thrill and excitement',
    breadcrumbsWallet: 52000,
    luck: 9,
    favouriteCocktail: 'Otter pop fizz',
    favouriteSnack: 'Corn Dogs'
  },
  {
    name: 'Gertie', kind: 'Common snapping turtle',
    character: 'Slow, steady, and methodical, waiting for the perfect moment to place her bets',
    breadcrumbsWallet: 68500,
    luck: 6,
    favouriteCocktail: 'Swampy sour',
    favouriteSnack: 'pretlzle bites with honey mustard'
  }

]

const seedRaceData: Race[] =[
  {
    name: 'Flock Formation Style',
    type: 'formation'
  },
  {name: 'Paddle Power Sprint',
    type: 'speed swimming',
  }, 
  {
    name: 'Far-Flight Flying Cup',
    type:'long distance flight'
  }
]


const seedDatabase = async () => {
  const seedData = [
    { endpoint: 'http://localhost:8787/api/geese', data: seedGeeseData },
    { endpoint: 'http://localhost:8787/api/wetlandwagers', data: seedWetlandersData },
    { endpoint:'http://localhost:8787/api/races', data: seedRaceData}
  ];

  for (const { endpoint, data } of seedData) {
    try {
      const promises = data.map(item => axios.post(endpoint, item));
      const responses = await Promise.all(promises);
      responses.forEach(response => console.log(`User inserted: ${response.data}`));
      console.log(`Database seeded successfully for ${endpoint}`);
    } catch (error) {
      handleError(error);
    }
  }
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', error.message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error occurred:', error);
  }
};

seedDatabase();