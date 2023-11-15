import { useQuery } from '@tanstack/react-query';
import { environment } from '../../../../environment/environment';
import { fetchData } from '../../../../utils/fetchFunction';

export default function PokemonVariety({ name }: { name: string }) {
  const url = `${environment.pokemonApiUrl}/pokemon/${name}`;
  const pokemonQuery = useQuery([url], () => fetchData(url), {
    staleTime: Infinity,
  });
  return <img src={pokemonQuery.data?.sprites.front_default} alt={name} />;
}
