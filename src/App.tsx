import { Container } from '@mui/material';
import Header from './components/Header/header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}

export default App;
