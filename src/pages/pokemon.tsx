import { useParams } from "react-router";

export default function PokemonDetail() {
  const { pokemonName } = useParams()
  return <div>pokemon details of {pokemonName}</div>;
}
