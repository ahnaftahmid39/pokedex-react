import { RootState } from "@/store/redux-store"
import { useSelector } from "react-redux"

export default function Pokedex() {
  const pokedex = useSelector((state: RootState) => state.pokedex)

  return (
    <div>
      <h2 className="text-2xl font-bold">Available Pokemons</h2>
      <div className="flex flex-col gap-4">
        {pokedex.map(pokemon => (
          <div key={pokemon.id} className="flex flex-col gap-2 border-b">
            <img className="w-24 h-24" src={pokemon.sprites.front_default}></img>
            <span className="text-slate-700">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

