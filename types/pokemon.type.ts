export type AllPokemon = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
  stats: PokemonStatSlot[];
  abilities: PokemonAbilitySlot[];
  species: NamedAPIResource;
};

// Estructura para las imágenes (Sprites)
export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    home: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
};

// Estructura para los Tipos (ej. Grass, Poison)
export type PokemonTypeSlot = {
  slot: number;
  type: NamedAPIResource;
};

// Estructura para las Estadísticas (ej. HP, Attack)
export type PokemonStatSlot = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

// Estructura para las Habilidades (ej. Overgrow)
export type PokemonAbilitySlot = {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

// Interfaz reutilizable para objetos con nombre y URL (estándar de PokéAPI)
export type NamedAPIResource = {
  name: string;
  url: string;
};
