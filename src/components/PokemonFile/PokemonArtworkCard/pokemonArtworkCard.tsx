import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import PokemonTypes from '../../PokemonTypes/pokemonTypes';

export default function PokemonArtworkCard({
  name,
  artworkUrl,
  types,
  formName,
  weight,
  height,
}: {
  name: string;
  artworkUrl: string;
  types: any;
  formName: string;
  weight: number;
  height: number;
}) {
  return (
    <Card>
      <CardHeader
        title={name}
        subheader={formName}
        sx={{
          textTransform: 'capitalize',
          textAlign: 'center',
        }}
      />
      <CardContent>
        <Stack alignItems="center" spacing={3}>
          <PokemonTypes types={types} />
          <img src={artworkUrl} alt="artwork" />
          <Stack>
            <Typography variant="caption">Taille : {height / 10} m</Typography>
            <Typography variant="caption">Poids : {weight / 10} kg</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
