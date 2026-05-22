export type GetPokemons = {
  count: number;
  next: string;
  results: { name: string; url: string }[];
};
export type Pokemons = {
  name: string;
  url: string;
}[];
