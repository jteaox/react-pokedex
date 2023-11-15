import { Chip, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { environment } from '../../../../environment/environment';
import { fetchData } from '../../../../utils/fetchFunction';

export default function PokemonAbility({
  ability,
  isHidden,
}: {
  ability: { name: string; url: string };
  isHidden: boolean;
}) {
  const { data } = useQuery(
    ['ability', ability.name],
    () => fetchData(ability.url),
    { staleTime: Infinity, enabled: !!ability.url }
  );
  const abilityFlavorText = data?.flavor_text_entries.filter(
    (flavor_text: any) =>
      flavor_text.language.name === `${environment.language}`
  )[0];
  const abilityDesc: string =
    abilityFlavorText?.flavor_text ?? 'Pas de description';
  const abilityName: string = data?.names.filter(
    (name: any) => name.language.name === `${environment.language}`
  )[0]?.name;
  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        <Stack direction="row" spacing={1}>
          {isHidden && <Chip label="Caché" color="info" />}
          <span>{abilityName}</span>
        </Stack>
      </Typography>
      <p>{abilityDesc}</p>
    </Stack>
  );
}
