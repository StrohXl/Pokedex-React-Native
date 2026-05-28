import getPokemon from "@/features/id/services/getPokemon";
import TemplateId from "@/features/id/template";
import getDescription from "@/features/id/utils/getDescription";
import { baseUrlImage, baseUrlSound } from "@/services/urlApi";
import { PokemonData } from "@/types/pokemon-data.type";
import { useAudioPlayer } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PokemonDetail() {
  const { id: paramId } = useLocalSearchParams();
  const [id, setId] = useState(`${paramId}`);
  const [loading, setLoading] = useState(true);
  const [nameDefault, setNameDefault] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonData>({
    default: undefined,
    prev: undefined,
    next: undefined,
    species: undefined,
    varieties: [],
  });

  const description = getDescription({ species: pokemonData.species });
  const number = `${id}`.padStart(3, "0");
  const urlImage = `${baseUrlImage + `${pokemonData.default?.id}`.padStart(3, "0")}.webp`;

  const states = {
    description,
    id,
    setId,
    loading,
    nameDefault,
    number,
    pokemonData,
    setLoading,
    setNameDefault,
    setPokemonData,
    urlImage,
  };

  const player = useAudioPlayer(`${baseUrlSound}${paramId}.ogg`);

  useEffect(() => {
    getPokemon({
      idPokemon: id,
      states,
      player,
    });
  }, []);

  return <TemplateId player={player} states={states} />;
}
