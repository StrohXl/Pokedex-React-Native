import { PokemonSpecies } from "@/types/pokemon-species.type";

export default function getDescription({
  species,
}: {
  species: PokemonSpecies | undefined;
}): string {
  if (species) {
    const description = species?.flavor_text_entries.filter(
      (item) => item.language.name === "en",
    );
    return description[description.length - 1].flavor_text.replace(/\s+/g, " ");
  } else {
    return "";
  }
}
