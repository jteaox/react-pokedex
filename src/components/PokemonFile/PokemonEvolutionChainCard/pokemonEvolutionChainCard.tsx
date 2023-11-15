import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from '@mui/material';
import { UseQueryResult, useQueries, useQuery } from '@tanstack/react-query';
import { environment } from '../../../environment/environment';
import { fetchData } from '../../../utils/fetchFunction';
import PokemonEvolutionCarousel from './PokemonEvolutionCarousel/pokemonEvolutionCarousel';

export default function PokemonEvolutionChainCard({
  url,
  formName,
}: {
  url: string;
  formName: string;
}) {
  const evolutionChainQuery = useQuery([url], () => fetchData(url), {
    staleTime: Infinity,
    enabled: !!url,
  });

  let evolutions: { name: string; url: string }[] = [];
  let stages: Record<number, { name: string; url: string }[]> = {};

  const addToChain = (elem: any, insideStage: number) => {
    if (!elem) {
      return;
    }
    evolutions.push(elem.species);
    if (stages[insideStage]) {
      stages[insideStage] = stages[insideStage].concat(elem.species);
    } else {
      stages[insideStage] = [elem.species];
    }
    elem.evolves_to.forEach((evol: any) => addToChain(evol, insideStage + 1));
  };

  addToChain(evolutionChainQuery.data?.chain, 1);

  const stagesLength = Object.keys(stages).length;

  const pokemonSpeciesQueries = useQueries({
    queries: evolutions.map((pokemon: { name: string; url: string }) => {
      return {
        queryKey: [pokemon.url],
        queryFn: () => fetchData(pokemon.url),
        staleTime: Infinity,
      };
    }),
  });
  const pokemonQueries = useQueries({
    queries: evolutions.map((pokemon: { name: string; url: string }) => {
      let pokemonUrl: string;
      if (existsPokemonForm(pokemon)) {
        pokemonUrl = `${environment.pokemonApiUrl}/pokemon/${pokemon.name}-${formName}`;
      } else {
        const pokemonDefaultName = getPokemonDefaultName(pokemon);
        pokemonUrl = `${environment.pokemonApiUrl}/pokemon/${pokemonDefaultName}`;
      }
      return {
        queryKey: [pokemonUrl],
        queryFn: () => fetchData(pokemonUrl),
        staleTime: Infinity,
        enabled:
          pokemonSpeciesQueries.filter(
            (pokemonSpeciesQuery: UseQueryResult<any>) =>
              pokemonSpeciesQuery.isLoading
          ).length === 0,
      };
    }),
  });

  const spriteList = pokemonQueries.map((pokemonQuery: UseQueryResult<any>) => {
    return {
      name: pokemonQuery.data?.name,
      url: pokemonQuery.data?.sprites.front_default,
    };
  });

  const isLoading =
    pokemonQueries.filter(
      (pokemonQuery: UseQueryResult<any>) => pokemonQuery.isLoading
    ).length > 0 ||
    pokemonSpeciesQueries.filter(
      (pokemonSpeciesQuery: UseQueryResult<any>) =>
        pokemonSpeciesQuery.isLoading
    ).length > 0 ||
    evolutionChainQuery.isLoading;

  function existsPokemonForm(pokemon: { name: string; url: string }): boolean {
    return (
      pokemonSpeciesQueries.filter(
        (pokemonSpeciesQuery: any) =>
          pokemonSpeciesQuery.data?.name === pokemon.name &&
          pokemonSpeciesQuery.data?.varieties.filter(
            (variety: any) =>
              variety.pokemon.name === `${pokemon.name}-${formName}`
          ).length > 0
      ).length > 0
    );
  }

  function getPokemonDefaultName(pokemon: {
    name: string;
    url: string;
  }): string {
    const pokemonSpeciesQuery = pokemonSpeciesQueries.filter(
      (pokemonSpeciesQuery: any) =>
        pokemonSpeciesQuery.data?.name === pokemon.name
    );
    const pokemonVarieties = pokemonSpeciesQuery?.map(
      (pokemonSpeciesQuery: any) => pokemonSpeciesQuery.data?.varieties
    )[0];
    const pokemonDefaultName = pokemonVarieties?.filter(
      (variety: any) => variety.is_default
    )[0]?.pokemon.name;
    return pokemonDefaultName;
  }

  return (
    <Card>
      <CardHeader title="Évolutions" />
      <CardContent sx={{ maxHeight: 400, overflow: 'auto' }}>
        <Grid container justifyContent="center" alignItems="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {Object.keys(stages).map((stage: string) => (
                <Grid
                  key={stage}
                  container
                  item
                  xs={12 / stagesLength}
                  justifyContent="center"
                >
                  <PokemonEvolutionCarousel
                    pokemonList={stages[+stage]}
                    pokemonSpriteList={spriteList}
                    formName={formName}
                    existsPokemonForm={existsPokemonForm}
                    getPokemonDefaultName={getPokemonDefaultName}
                  />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
