import { LinearProgress, Stack, Typography } from '@mui/material';
import { statsLabels } from './pokemonStatsLabels';

export default function PokemonStat({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  const maxValue: number = 255;
  const percent = (value * 100) / maxValue;
  const label = statsLabels[name];
  const color = () => {
    if (value < 60) {
      return 'low';
    } else if (value < 90) {
      return 'medium';
    } else if (value < 120) {
      return 'high';
    } else {
      return 'very_high';
    }
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Typography variant="button" sx={{ width: '20%' }}>
        {label}
      </Typography>
      <Typography variant="button" sx={{ width: '10%' }}>
        {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percent}
        color={color()}
        sx={{
          width: '50%',
          height: '10px',
          borderRadius: '50px',
        }}
      />
    </Stack>
  );
}
