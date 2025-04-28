import PokemonCatchModal from "@/components/pokemon-catch-modal/pokemon-catch-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addPokemon, RootState } from "@/store/redux-store";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: unknown[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species | null;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface HeldItem {
  item: Species;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  order: number | null;
  version_group: Species;
}

export interface PastAbility {
  abilities: Ability[];
  generation: Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export default function PokemonDetail() {
  const { name } = useParams();
  const pokemonQuery = useQuery<Pokemon>({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      return data;
    },
  });

  const [catchPokemonModal, setCatchPokemonModal] = useState(false);
  const dispatch = useDispatch();
  const pokedex = useSelector((state: RootState) => state.pokedex);

  const handlePokemonCaught = useCallback(
    (pokemon: Pokemon) => {
      dispatch(addPokemon(pokemon));
    },
    [dispatch]
  );

  return (
    <div>
      <h2 className="text-2xl">
        Pokemon detail of{" "}
        <span className="font-bold text-green-700">{name}</span>
      </h2>
      {pokemonQuery.isPending && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-[250px]"></Skeleton>
          <Skeleton className="h-4 w-[350px]"></Skeleton>
          <Skeleton className="h-24 w-[350px]"></Skeleton>
        </div>
      )}
      {pokemonQuery.isError && (
        <div className="text-red-400">{pokemonQuery.error.message}</div>
      )}
      {pokemonQuery.data && (
        <div className="flex py-2 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <img
              className="w-24 h-24"
              src={pokemonQuery.data.sprites.front_default}
              alt="Front image of the pokemon"
            ></img>
            <img
              className="w-24 h-24"
              src={pokemonQuery.data.sprites.back_default}
              alt="Front image of the pokemon"
            ></img>
            <img
              className="w-24 h-24"
              src={pokemonQuery.data.sprites.back_shiny}
              alt="back image of the pokemon"
            ></img>
            <img
              className="w-24 h-24"
              src={pokemonQuery.data.sprites.front_shiny}
              alt="back image of the pokemon"
            ></img>
          </div>

          <div>
            <span className="font-semibold">Pokemon Name:</span>{" "}
            {pokemonQuery.data.name}
          </div>
          <div>
            <span className="font-semibold">Pokemon Height:</span>{" "}
            {pokemonQuery.data.height}
          </div>
          <div>
            <span className="font-semibold">Pokemon Weight:</span>{" "}
            {pokemonQuery.data.weight}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Pokemon Stats</span>
            <div className="flex flex-col gap-2">
              {pokemonQuery.data.stats.map((stat) => (
                <div key={stat.stat.url}>
                  - {stat.stat.name}: {stat.base_stat}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold">Pokemon Types</span>
            <div className="flex flex-col gap-2">
              {pokemonQuery.data.types.map((type) => (
                <div key={type.type.url}>- {type.type.name}</div>
              ))}
            </div>
          </div>

          <div>
            <PokemonCatchModal
              onCaught={handlePokemonCaught}
              pokemon={pokemonQuery.data}
              open={catchPokemonModal}
              onOpenChange={setCatchPokemonModal}
            >
              <Button
                disabled={pokedex
                  .map((p) => p.id)
                  .includes(pokemonQuery.data.id)}
                onClick={() => setCatchPokemonModal(true)}
              >
                {!pokedex.map((p) => p.id).includes(pokemonQuery.data.id)
                  ? "Attempt to catch"
                  : "Already Caught!"}
              </Button>
            </PokemonCatchModal>
          </div>
        </div>
      )}
    </div>
  );
}
