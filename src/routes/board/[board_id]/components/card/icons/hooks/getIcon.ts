import { CardType } from "$lib/enums";
import FaSolidList from 'svelte-icons-pack/fa/FaSolidList';

export default function getIcon(cardType: number) {
  switch (cardType) {
    case CardType.List:
      return FaSolidList;
  }
}