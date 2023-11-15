import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import PokemonForm from './PokemonForm/pokemonForm';
import PokemonVariety from './PokemonVariety/pokemonVariety';
import { Link } from 'react-router-dom';

export default function PokemonFormsCard({
  forms,
  varieties,
}: {
  forms: any;
  varieties: any;
}) {
  return (
    <Card>
      <CardHeader title="Formes" />
      <CardContent>
        <Grid container spacing={1}>
          {forms?.length > 1 &&
            forms?.map((form: any) => (
              <Grid
                container
                item
                key={form.name}
                xs={3}
                justifyContent="center"
                alignItems="center"
              >
                <PokemonForm url={form.url} />
              </Grid>
            ))}
          {varieties?.length > 1 &&
            varieties?.map((variety: any) => (
              <Grid
                container
                item
                key={variety.pokemon.name}
                xs={3}
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  to={`/pokemons/${variety.pokemon.name}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <PokemonVariety name={variety.pokemon.name} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
