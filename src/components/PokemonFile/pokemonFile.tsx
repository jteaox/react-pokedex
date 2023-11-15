import { Alert, CircularProgress, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { environment } from '../../environment/environment';
import { fetchData } from '../../utils/fetchFunction';
import PokemonAbilitiesCard from './PokemonAbilitiesCard/pokemonAbilitiesCard';
import PokemonArtworkCard from './PokemonArtworkCard/pokemonArtworkCard';
import PokemonEvolutionChainCard from './PokemonEvolutionChainCard/pokemonEvolutionChainCard';
import PokemonFormsCard from './PokemonFormsCard/pokemonFormsCard';
import PokemonSpritesCard from './PokemonSpritesCard/pokemonSpritesCard';
import PokemonStatsCard from './PokemonStatsCard/pokemonStatsCard';

export default function PokemonFile() {
  const { name } = useParams();
  const pokemonUrl: string = `${environment.pokemonApiUrl}/pokemon/${name}`;
  const pokemonQuery = useQuery([pokemonUrl], () => fetchData(pokemonUrl), {
    staleTime: Infinity,
  });
  const pokemonSpeciesUrl: string = pokemonQuery.data?.species.url;
  const pokemonSpeciesQuery = useQuery(
    [pokemonSpeciesUrl],
    () => fetchData(pokemonSpeciesUrl),
    { staleTime: Infinity, enabled: !!pokemonSpeciesUrl }
  );
  const pokemonFormUrl: string = pokemonQuery.data?.forms?.[0]?.url;
  const pokemonFormQuery = useQuery(
    [pokemonFormUrl],
    () => fetchData(pokemonFormUrl),
    { staleTime: Infinity, enabled: !!pokemonFormUrl }
  );

  const pokemonName: string = pokemonSpeciesQuery.data?.names?.filter(
    (name: any) => name.language.name === `${environment.language}`
  )[0].name;

  const pokemonFormName: string =
    pokemonFormQuery.data?.form_names?.filter(
      (name: any) => name.language.name === `${environment.language}`
    )[0]?.name ?? pokemonFormQuery.data?.form_name;

  const isError: boolean =
    pokemonQuery.isError ||
    pokemonSpeciesQuery.isError ||
    pokemonFormQuery.isError;

  if (isError) {
    return (
      <Alert severity="error">Erreur lors du chargement de la fiche.</Alert>
    );
  }

  return (
    <>
      {pokemonQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={4}>
            <PokemonArtworkCard
              name={pokemonName}
              artworkUrl={
                pokemonQuery.data?.sprites.other['official-artwork']
                  .front_default
              }
              types={pokemonQuery.data?.types}
              formName={pokemonFormName}
              weight={pokemonQuery.data?.weight}
              height={pokemonQuery.data?.height}
            />
          </Grid>
          <Grid container item xs={12} md={6} xl={4} spacing={2}>
            <Grid item xs={12}>
              <PokemonStatsCard stats={pokemonQuery.data?.stats} />
            </Grid>
            <Grid item xs={12}>
              <PokemonSpritesCard sprites={pokemonQuery.data?.sprites} />
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6} xl={4} spacing={2}>
            <Grid item xs={12}>
              <PokemonAbilitiesCard abilities={pokemonQuery.data?.abilities} />
            </Grid>
            <Grid item xs={12}>
              <PokemonEvolutionChainCard
                url={pokemonSpeciesQuery.data?.evolution_chain.url}
                formName={pokemonFormQuery.data?.form_name}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <PokemonFormsCard
              forms={pokemonQuery.data?.forms}
              varieties={pokemonSpeciesQuery.data?.varieties}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
