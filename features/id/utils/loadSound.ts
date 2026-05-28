import { baseUrlSound } from "@/services/urlApi";
import { AudioPlayer } from "expo-audio";

export default function loadSound({
  player,
  id,
}: {
  player: AudioPlayer;
  id: string;
}) {
  player.replace(`${baseUrlSound}${id}.ogg`);
  player.seekTo(0);
  player.play();
}
