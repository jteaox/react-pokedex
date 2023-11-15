import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { environment } from '../../environment/environment';
import * as filterActions from '../../features/filter.slice';
import * as pageActions from '../../features/page.slice';
import { fetchData } from '../../utils/fetchFunction';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  selectFilter,
  selectPage,
  selectRowsPerPage,
} from '../../utils/selectors';
import PokemonRow from './PokemonRow/pokemonRow';
import { PokemonTableData } from './interfaces/PokemonTableData';
import { PokemonTableResult } from './interfaces/PokemonTableResult';

export default function PokemonTable() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const rowsPerPage = useAppSelector(selectRowsPerPage);
  const filter = useAppSelector(selectFilter);
  const url: string = `${environment.pokemonApiUrl}/pokemon/?offset=0&limit=2000`;

  const {
    data,
    isLoading,
    isError,
  }: UseQueryResult<PokemonTableData, boolean> = useQuery(
    ['pokemonList'],
    () => fetchData(url),
    {
      staleTime: Infinity,
    }
  );

  const pokemonList: PokemonTableResult[] | undefined = data?.results;
  const filteredPokemonList: PokemonTableResult[] | undefined =
    filter !== ''
      ? pokemonList?.filter((pokemon: PokemonTableResult) =>
          pokemon.name.includes(filter.toLocaleLowerCase())
        )
      : pokemonList;

  function handleChangePage(event: unknown, newPage: number) {
    dispatch(pageActions.setPage(newPage));
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    dispatch(pageActions.setRowsPerPage(+event.target.value));
    dispatch(pageActions.setPage(0));
  }

  function handleFilterInputChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(filterActions.set(event.target.value));
    dispatch(pageActions.setPage(0));
  }

  const tableCol: string[] = ['Nom', 'Types', 'Sprites'];

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            label="Filter"
            variant="standard"
            placeholder="Type a pokemon name..."
            value={filter}
            onChange={handleFilterInputChange}
            sx={{ alignSelf: 'flex-end' }}
          />
          <Paper
            sx={{
              borderRadius: '10px',
            }}
          >
            <TableContainer sx={{ maxHeight: '80vh' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {tableCol.map((col: string) => (
                      <TableCell key={col}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPokemonList
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((pokemon) => (
                      <PokemonRow
                        key={pokemon.name}
                        name={pokemon.name}
                        nbCol={tableCol.length}
                      />
                    ))}
                  {filteredPokemonList?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={tableCol.length}>
                        No pokemon found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 50, 100]}
              rowsPerPage={rowsPerPage}
              component="div"
              count={filteredPokemonList?.length ?? 1}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton
              showLastButton
            />
          </Paper>
        </>
      )}
    </>
  );
}
