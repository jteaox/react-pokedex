import { RootState } from './store';

export const selectPage = (state: RootState) => state.page.page;
export const selectRowsPerPage = (state: RootState) => state.page.rowsPerPage;
export const selectFilter = (state: RootState) => state.filter;
