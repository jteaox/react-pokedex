import { PokemonTableResult } from './PokemonTableResult';

export interface PokemonTableData {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonTableResult[];
}
