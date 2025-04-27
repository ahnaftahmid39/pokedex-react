import { useParams } from "react-router"

export default function PokemonInLocation() {
  const params = useParams()

  return (
    <div>
      <div>Pokemon in location {params.name}</div>
    </div>
  )
}

