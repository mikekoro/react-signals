import { oddsStream } from "@/hooks/useOddsStream";
import { effect, signal } from "@preact/signals-react";
import { useRef } from "react";


export default function MarketOdds({ market }: { market: any }) {

  const bestOddsOutcomeOne = signal(market.bestOddsOutcomeOne);
  const bestOddsOutcomeTwo = signal(market.bestOddsOutcomeTwo);

  const outcomeOneRef = useRef<HTMLSpanElement>(null);
  const outcomeTwoRef = useRef<HTMLSpanElement>(null);

  // Flash animation function
  const flashElement = (element: HTMLElement | null) => {
    if (!element) return;
    //element.classList.add("bg-blue-500");
    setTimeout(() => {
      //element.classList.remove("bg-red-500");
    }, 10);
  };

  effect(() => {
    if (oddsStream.value.marketHash === market.marketHash) {
      bestOddsOutcomeOne.value = oddsStream.value.bestOddsOutcomeOne;
      bestOddsOutcomeTwo.value = oddsStream.value.bestOddsOutcomeTwo;
      
      // Flash the elements when odds change
      flashElement(outcomeOneRef.current);
      flashElement(outcomeTwoRef.current);
    }
  });
  
  return (
    <div className="flex justify-between px-2 py-1 text-sm">
      <span ref={outcomeOneRef} className="transition-colors duration-1000 text-red-500">
        {market.outcomeOneName}: {bestOddsOutcomeOne}
      </span>
      <span ref={outcomeTwoRef} className="transition-colors duration-1000 text-blue-500">
        {market.outcomeTwoName}: {bestOddsOutcomeTwo}
      </span>
    </div>
  )
}
