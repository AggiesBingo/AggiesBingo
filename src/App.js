import './App.css';
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { bingoGrid } from './bingoGrid';  // Correct import

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcome to Aggie Bingo
        </Typography>
        {bingoGrid()}  {/* Call the function to render */}
      </Box>
    </Container>
  );
}

export default App;
