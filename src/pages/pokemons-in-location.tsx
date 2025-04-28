import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

export interface PokemonInLocation {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: Location;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: Location;
  version_details: EncounterMethodRateVersionDetail[];
}

export interface Location {
  name: string;
  url: string;
}

export interface EncounterMethodRateVersionDetail {
  rate: number;
  version: Location;
}

export interface Name {
  language: Location;
  name: string;
}

export interface PokemonEncounter {
  pokemon: Location;
  version_details: PokemonEncounterVersionDetail[];
}

export interface PokemonEncounterVersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Location;
}

export interface EncounterDetail {
  chance: number;
  condition_values: unknown[];
  max_level: number;
  method: Location;
  min_level: number;
}

export default function PokemonsInLocation() {
  const params = useParams();

  const pokemonInLocationQuery = useQuery<PokemonInLocation>({
    queryKey: ["location", params.name],
    queryFn: async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/location-area/${params.name}`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl">Pokemons in location {params.name}</h2>
      {pokemonInLocationQuery.isPending && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-[250px]"></Skeleton>
          <Skeleton className="h-4 w-[350px]"></Skeleton>
          <Skeleton className="h-24 w-[350px]"></Skeleton>
        </div>
      )}
      {pokemonInLocationQuery.isError && (
        <div className="text-red-400">
          {pokemonInLocationQuery.error.message}
        </div>
      )}
      {pokemonInLocationQuery.data && (
        <div className="flex py-2 flex-col gap-2">
          {pokemonInLocationQuery.data.pokemon_encounters.map(
            (pokemonEncounter) => (
              <Button
                variant={"link"}
                className="w-fit text-accent-foreground"
                key={pokemonEncounter.pokemon.url}
              >
                <Link to={`/pokeapi/pokemon/${pokemonEncounter.pokemon.name}`}>{pokemonEncounter.pokemon.name}</Link>
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
