import { CircularProgress, TableCell, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { environment } from '../../../environment/environment';
import { fetchData } from '../../../utils/fetchFunction';
import PokemonTypes from '../../PokemonTypes/pokemonTypes';

export default function PokemonRow({
  name,
  nbCol,
}: {
  name: string;
  nbCol: number;
}) {
  const pokemonUrl = `${environment.pokemonApiUrl}/pokemon/${name}`;
  const pokemonQuery = useQuery([pokemonUrl], () => fetchData(pokemonUrl), {
    staleTime: Infinity,
  });
  const pokemonSpeciesUrl = pokemonQuery.data?.species.url;
  const pokemonSpeciesQuery = useQuery(
    [pokemonSpeciesUrl],
    () => fetchData(pokemonSpeciesUrl),
    {
      staleTime: Infinity,
      enabled: !!pokemonSpeciesUrl,
    }
  );

  const navigate = useNavigate();

  const pokemonName =
    pokemonSpeciesQuery?.data?.names.filter(
      (name: any) => name.language.name === `${environment.language}`
    )[0]?.name ?? pokemonSpeciesQuery?.data?.name;

  const isDefaultVariety: boolean = pokemonSpeciesQuery.data?.varieties.filter(
    (variety: any) => variety.pokemon.name === name
  )[0].is_default;

  function handleClick() {
    navigate(`/pokemons/${name}`);
  }

  return (
    <TableRow onClick={handleClick} hover sx={{ cursor: 'pointer' }}>
      {pokemonQuery?.isLoading || pokemonSpeciesQuery.isLoading ? (
        <TableCell colSpan={nbCol} align="center">
          <CircularProgress />
        </TableCell>
      ) : (
        <>
          <TableCell sx={{ textTransform: 'capitalize', fontWeight: 700 }}>
            {pokemonName}{' '}
            {!isDefaultVariety && <span>{name.split('-')[1]}</span>}
          </TableCell>
          <TableCell>
            <PokemonTypes types={pokemonQuery?.data?.types} />
          </TableCell>
          <TableCell>
            <img
              src={pokemonQuery?.data?.sprites.front_default}
              alt={pokemonName}
            />
          </TableCell>
        </>
      )}
    </TableRow>
  );
}
