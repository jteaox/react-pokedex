import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import PokemonStat from './PokemonStat/pokemonStat';

export default function PokemonStatsCard({ stats }: { stats: any }) {
  return (
    <Card>
      <CardHeader title="Stats de base" />
      <CardContent>
        <Grid container spacing={1}>
          {stats?.map((stat: any) => (
            <Grid item xs={12} key={stat.stat.name}>
              <PokemonStat name={stat.stat.name} value={stat.base_stat} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
