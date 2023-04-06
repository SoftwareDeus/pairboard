import { CardType } from '$lib/enums';
import CardList from '../card/types/CardList.svelte';
// Define a mapping of CardType enum values to their corresponding components
export function getCardComponent(cardType: number) {
  switch (cardType) {
    case CardType.List:
      return CardList;
    default:
      return null; // Return a default component or handle error case
  }
}