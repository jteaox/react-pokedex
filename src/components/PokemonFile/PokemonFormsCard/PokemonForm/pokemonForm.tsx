import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../../utils/fetchFunction';
import { Tooltip } from '@mui/material';
import { environment } from '../../../../environment/environment';

export default function PokemonForm({ url }: { url: string }) {
  const pokemonFormQuery = useQuery([url], () => fetchData(url), {
    staleTime: Infinity,
  });
  const pokemonName = pokemonFormQuery.data?.names.filter(
    (name: any) => name.language.name === `${environment.language}`
  )[0].name;
  return (
    <Tooltip title={pokemonName}>
      <img
        src={pokemonFormQuery.data?.sprites.front_default}
        alt={pokemonFormQuery.data?.name}
      />
    </Tooltip>
  );
}
