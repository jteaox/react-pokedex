import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import PokemonAbility from './PokemonAbility/pokemonAbility';

export default function PokemonAbilitiesCard({
  abilities,
}: {
  abilities: any;
}) {
  return (
    <Card>
      <CardHeader title="Talents" />
      <CardContent>
        <Stack spacing={3}>
          {abilities?.map((ability: any) => (
            <PokemonAbility
              key={ability.ability.name}
              ability={ability.ability}
              isHidden={ability.is_hidden}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
