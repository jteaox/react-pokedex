import { Chip, CircularProgress, Stack } from '@mui/material';
import { UseQueryResult, useQueries } from '@tanstack/react-query';
import { environment } from '../../environment/environment';
import { fetchData } from '../../utils/fetchFunction';
import { colors } from './pokemonTypesColors';

export default function PokemonTypes({ types }: { types: any }) {
  const typesQueries = useQueries({
    queries: types.map((type: any) => {
      return {
        queryKey: [type.type.url],
        queryFn: () => fetchData(type.type.url),
        staleTime: Infinity,
      };
    }),
  });

  const getName = (typeQuery: UseQueryResult<any>) => {
    return typeQuery.data?.names.filter(
      (name: any) => name.language.name === `${environment.language}`
    )[0].name;
  };

  const isLoading =
    typesQueries.filter((typeQuery: UseQueryResult<any>) => typeQuery.isLoading)
      .length > 0;

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Stack direction="row" spacing={1}>
          {typesQueries?.map((typeQuery: any) => (
            <Chip
              key={getName(typeQuery)}
              label={getName(typeQuery)}
              size="small"
              sx={{
                backgroundColor: colors[typeQuery.data?.name],
                color: '#fff',
                textTransform: 'capitalize',
                fontWeight: 700,
              }}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
