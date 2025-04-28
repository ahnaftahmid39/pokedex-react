import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";

export interface Locations {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export default function Locations() {
  const [searchParams] = useSearchParams();
  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || 20;
  const locationQuery = useQuery<Locations>({
    queryKey: ["location", offset, limit],
    queryFn: async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/location-area?offset=${offset}&limit=${limit}`
      );
      const data = await res.json();
      return data;
    },
    staleTime: 10 * 1000,
    retry: false,
  });

  return (
    <div>
      <div>Available locations</div>
      {locationQuery.isPending && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-[250px]"></Skeleton>
          <Skeleton className="h-4 w-[350px]"></Skeleton>
          <Skeleton className="h-24 w-[350px]"></Skeleton>
        </div>
      )}
      {locationQuery.isError && (
        <div>
          Error while fetching pokemon locations: {locationQuery.error.message}
        </div>
      )}
      {locationQuery.data && (
        <div>
          <div className="flex flex-col my-2">
            {locationQuery.data.results.map((loc) => (
              <Button key={loc.url} className="w-fit" variant={"link"}>
                <Link to={`/pokeapi/location/${loc.name}`} >{loc.name}</Link>
              </Button>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    offset === 0
                      ? "#"
                      : `/pokeapi/location?offset=${offset - 20}`
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={
                    offset + 20 > locationQuery.data.count
                      ? "#"
                      : `/pokeapi/location?offset=${offset + 20}`
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
