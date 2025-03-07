import { v4 as uuidv4 } from 'uuid';

const teamNames = [
  "Dragons", "Wolves", "Titans", "Falcons", "Sharks", "Warriors", "Cyclones", "Giants", "Ravens", "Tigers",
  "Pirates", "Royals", "Bulls", "Spartans", "Knights", "Phoenix", "Cougars", "Eagles", "Hawks", "Panthers"
];

const sportLabels = ["Soccer", "Basketball", "Hockey", "Tennis", "Baseball"];
const leagueLabels = ["Premier League", "Championship League", "National Cup", "Continental Trophy"];
const marketTypes = ["MONEY_LINE", "SPREAD", "OVER_UNDER", "TEAM_ONE_1X2", "TEAM_TWO_1X2", "TIE_1X2"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomOdds(): number {
  return parseFloat((Math.random()).toFixed(4));
}

function generateMarkets(count: number) {
  const markets = [];
  for (let i = 0; i < count; i++) {
    const type = randomItem(marketTypes);
    markets.push({
      chainVersion: "SXR",
      marketHash: uuidv4(),
      marketType: type,
      betGroup: "game-lines",
      outcomeOneName: `Outcome 1 (${type})`,
      outcomeTwoName: `Outcome 2 (${type})`,
      liveEnabled: false,
      bestOddsOutcomeOne: randomOdds(),
      bestOddsOutcomeTwo: randomOdds(),
      topOrderOutcomeOne: uuidv4(),
      topOrderOutcomeTwo: uuidv4(),
    });
  }
  return markets;
}

export function generateData(
  sportsCount: number,
  leaguesPerSport: number,
  fixturesPerLeague: number,
  marketsPerFixture: number
) {
  const sports = [];

  for (let s = 0; s < sportsCount; s++) {
    const sportLabel = randomItem(sportLabels);
    const sportId = s + 1;
    const leagues = [];

    for (let l = 0; l < leaguesPerSport; l++) {
      const leagueLabel = randomItem(leagueLabels);
      const leagueId = 1000 + s * 100 + l;
      const fixtures = [];

      for (let f = 0; f < fixturesPerLeague; f++) {
        const teamOne = randomItem(teamNames);
        let teamTwo;
        do {
          teamTwo = randomItem(teamNames);
        } while (teamTwo === teamOne);

        fixtures.push({
          id: uuidv4(),
          eventId: uuidv4(),
          betGroups: ["game-lines"],
          leagueId,
          leagueLabel,
          sportId,
          gameTime: new Date(Date.now() + Math.random() * 1e10).toISOString(),
          teamOne,
          teamTwo,
          day: Math.floor(Date.now() / 1000),
          dayLabel: new Date().toLocaleDateString(),
          liveEnabled: false,
          marketHashes: Array(marketsPerFixture).fill(null).map(() => uuidv4()),
          volume: parseFloat((Math.random() * 100).toFixed(4)),
          path: `/${sportLabel.toLowerCase()}/${leagueLabel.toLowerCase().replace(/\s+/g, '-')}/game-lines/${uuidv4()}`,
          markets: generateMarkets(marketsPerFixture),
          chainVersion: "SXR",
        });
      }

      leagues.push({
        leagueId,
        leagueLabel,
        marketTypes,
        fixtures,
      });
    }

    sports.push({
      sportId,
      sportLabel,
      leagues,
    });
  }

  return {
    scope: "generated",
    label: "Generated Data",
    sports,
  };
}