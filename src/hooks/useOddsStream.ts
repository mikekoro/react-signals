import { Signal, signal } from "@preact/signals-react";

interface OddsUpdate {
  marketHash: string;
  bestOddsOutcomeOne: string;
  bestOddsOutcomeTwo: string;
}

export const oddsStream:Signal<OddsUpdate> = signal({
  marketHash: "",
  bestOddsOutcomeOne: "0",
  bestOddsOutcomeTwo: "0",
});

export const simulateOddsStream = (marketHashes: string[]) => {
  setInterval(() => {
    const randomHash = marketHashes[Math.floor(Math.random() * marketHashes.length)];
    oddsStream.value = {
      marketHash: randomHash,
      bestOddsOutcomeOne: Math.random().toFixed(6),
      bestOddsOutcomeTwo: Math.random().toFixed(6),
    };
  });
};