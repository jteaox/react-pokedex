import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grid, IconButton, Stack } from '@mui/material';
import { CSSProperties, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';

function PokemonSprite({
  index,
  spriteList,
  pokemonList,
  getPokemonName,
  style,
  onClick,
}: {
  index: number;
  spriteList: { name: string; url: string }[];
  pokemonList: { name: string; url: string }[];
  getPokemonName: Function;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}) {
  return (
    <img
      src={
        spriteList.filter(
          (sprite) => sprite.name === getPokemonName(pokemonList[index])
        )[0]?.url
      }
      alt={getPokemonName(pokemonList[index])}
      style={style}
      onClick={onClick}
    />
  );
}

export default function PokemonEvolutionCarousel({
  pokemonList,
  pokemonSpriteList,
  formName,
  existsPokemonForm,
  getPokemonDefaultName,
}: {
  pokemonList: { name: string; url: string }[];
  pokemonSpriteList: { name: string; url: string }[];
  formName: string;
  existsPokemonForm: Function;
  getPokemonDefaultName: Function;
}) {
  const [index, setIndex] = useState(0);
  const currentPokemonUrl = `/pokemons/${getPokemonName(pokemonList[index])}`;
  const hasMultipleRow = pokemonList.length > 1;

  function getPokemonName(pokemon: { name: string; url: string }) {
    if (existsPokemonForm(pokemon)) {
      return `${pokemon.name}-${formName}`;
    } else {
      return getPokemonDefaultName(pokemon);
    }
  }

  return (
    <Stack>
      {hasMultipleRow && index > 0 && (
        <>
          <Grid container justifyContent="center">
            <IconButton onClick={() => setIndex(index - 1)}>
              <KeyboardArrowUpIcon />
            </IconButton>
          </Grid>
          <PokemonSprite
            index={index - 1}
            spriteList={pokemonSpriteList}
            pokemonList={pokemonList}
            getPokemonName={getPokemonName}
            style={{ opacity: 0.5 }}
            onClick={() => setIndex(index - 1)}
          />
        </>
      )}
      <Link to={currentPokemonUrl}>
        <PokemonSprite
          index={index}
          spriteList={pokemonSpriteList}
          pokemonList={pokemonList}
          getPokemonName={getPokemonName}
        />
      </Link>
      {hasMultipleRow && index < pokemonList.length - 1 && (
        <>
          <PokemonSprite
            index={index + 1}
            spriteList={pokemonSpriteList}
            pokemonList={pokemonList}
            getPokemonName={getPokemonName}
            style={{ opacity: 0.5 }}
            onClick={() => setIndex(index + 1)}
          />
          <Grid container justifyContent="center">
            <IconButton onClick={() => setIndex(index + 1)}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Stack>
  );
}
