import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

export default function PokemonSpritesCard({ sprites }: { sprites: any }) {
  const keys: string[] = [
    'back_default',
    'front_default',
    'back_female',
    'front_female',
    'back_shiny',
    'front_shiny',
    'back_shiny_female',
    'front_shiny_female',
  ];

  const definedKeys: string[] = keys.filter((key: string) => sprites?.[key]);
  const maleKeys: string[] = definedKeys.filter(
    (key: string) => !key.includes('female')
  );
  const femaleKeys: string[] = definedKeys.filter((key: string) =>
    key.includes('female')
  );

  return (
    <Card>
      <CardHeader title="Sprites" />
      <CardContent>
        <Grid container spacing={1} justifyContent="center">
          <Grid
            container
            item
            xs={6}
            justifyContent="center"
            alignItems="flex-start"
          >
            {femaleKeys.length > 0 && (
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  component="p"
                  sx={{ textAlign: 'center', width: '100%' }}
                >
                  Mâle
                </Typography>
              </Grid>
            )}

            {maleKeys.map((key: string) => {
              return (
                <Grid container item key={key} xs={6} justifyContent="center">
                  <img src={sprites?.[key]} alt={key} />
                </Grid>
              );
            })}
          </Grid>
          {femaleKeys.length > 0 && (
            <Grid
              container
              item
              xs={6}
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  component="p"
                  sx={{ textAlign: 'center', width: '100%' }}
                >
                  Femelle
                </Typography>
              </Grid>
              {femaleKeys.map((key: string) => {
                return (
                  <Grid container item key={key} xs={6} justifyContent="center">
                    <img src={sprites?.[key]} alt={key} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
