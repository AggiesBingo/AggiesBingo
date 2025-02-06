import Button from '@mui/material/Button';
import { useState } from 'react';
import './bingoGrid.css';  // Import the CSS file


function generateBoard() {
  const rows = Array.from({ length: 5 }, () => Array(5).fill(null));
  for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
          let rand;
          do {
              rand = Math.floor(Math.random() * 25) + 1; // Adjusted range for bingo
          } while (rows.flat().includes(rand));
          rows[i][j] = rand;
      }
  }
  return rows;
}

function gridItem(num, index, selected, toggleSelected) {  // Add 'selected' and 'toggleSelected' parameters
  return (
    <Button 
      key={index} 
      onClick={() => toggleSelected(index)} 
      className={`grid-item ${selected ? 'selected' : ''}`}  // Use CSS classes
    >
      {addMessage(num)}
    </Button>
  );
}

function checkWinner(selectedItems) {
  const size = 5;
  const rows = Array(size).fill(true);
  const cols = Array(size).fill(true);
  let diag1 = true;
  let diag2 = true;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!selectedItems[i * size + j]) {
        rows[i] = false;
        cols[j] = false;
      }
    }
    if (!selectedItems[i * size + i]) diag1 = false;
    if (!selectedItems[i * size + (size - i - 1)]) diag2 = false;
  }

  return rows.includes(true) || cols.includes(true) || diag1 || diag2;
}

function addMessage(num) {
  const messages = [
    'Falslev Football',
    'The Hurd',
    'The Spectrum',
    'Coach Turnover',
    'Tourney Apperances',
    'Barnes Walk-On',
    'Martinez Transfers',
    'Falslev Cache Valley',
    ' Matchup Zone',
    'Albury Speed',
    'To PAC',
    'Free Throw Yips',
    'Stew Morrill',
    'Aggies 10-0 Run',
    'Big fish',
    'Lob to Gateretse',
    'Live/Die by 3',
    'Grown man Move',
    'Heat Check',
    'Thats a Dagger',
    'Active Hands',
    'MW Parity',
    'Cant buy bucket',
    'SC Top10',
    'Big Fella'
  ];
  return messages[num-1];
}

export function BingoGrid() {  
  const [boardNumbers] = useState(generateBoard());  // Store board in state
  const [selectedItems, setSelectedItems] = useState(Array(25).fill(false));  // Initialize selected state
  const [winner, setWinner] = useState(false);  // Initialize winner state

  const toggleSelected = (index) => {
    setSelectedItems(prevSelected => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      setWinner(checkWinner(newSelected));
      
      console.log(winner)
      return newSelected;
    });
  };

  return (
    <div className="bingo-grid">
      {winner && <div className="winner-message">Winner!</div>}
      {boardNumbers.map((row, rowIndex) => 
        <div key={rowIndex} className="bingo-row">
          {row.map((num, colIndex) => 
            <span key={colIndex} className="bingo-cell">
              {gridItem(num, rowIndex * 5 + colIndex, selectedItems[rowIndex * 5 + colIndex], toggleSelected)}  
            </span>
          )}
        </div>
      )}
    </div>
  );
}
