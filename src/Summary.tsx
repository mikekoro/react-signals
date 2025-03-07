//import { data } from "./data";
import MarketOdds from "./components/MarketOdds";
import { useEffect } from "react";
import { simulateOddsStream } from "./hooks/useOddsStream";
import { generateData } from "./lib/mock";

export default function Summary() {

  const mockData = generateData(2, 3, 5, 4);
  // Flatten marketHashes for quick access
  const marketHashes = mockData.sports.flatMap(sport =>
    sport.leagues.flatMap(league =>
      league.fixtures.flatMap(fixture =>
        fixture.markets.map(market => market.marketHash)
      )
    )
  );

  useEffect(() => {
    simulateOddsStream(marketHashes);
  }, []);

  console.log(mockData);

  return (
    <div className="p-6">
      {mockData.sports.map((sport) => (
        <div key={sport.sportId} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{sport.sportLabel}</h2>
          {sport.leagues.map((league) => (
            <div key={league.leagueId} className="mb-4">
              <h3 className="text-xl font-semibold">{league.leagueLabel}</h3>
              <table className="w-full text-left table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Time</th>
                    <th className="text-left">Teams</th>
                    <th className="text-left">Market</th>
                    <th className="text-left">Odds</th>
                  </tr>
                </thead>
                <tbody>
                  {league.fixtures.map((fixture) => (
                    fixture.markets.map((market) => (
                      <tr key={market.marketHash}>
                        <td>{new Date(fixture.gameTime).toLocaleString()}</td>
                        <td>{fixture.teamOne} vs {fixture.teamTwo}</td>
                        <td>{market.marketType}</td>
                        <td>
                          <MarketOdds market={market} />
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}