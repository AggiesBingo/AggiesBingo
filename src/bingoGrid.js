import Button from '@mui/material/Button';
import { useState } from 'react';

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
      style={{ backgroundColor: selected ? '#212529' : 'grey', width: '150px',height:'100px',color:'white' }}  // Change background color if selected
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
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty',
    'twenty-one',
    'twenty-two',
    'twenty-three',
    'twenty-four',
    'twenty-five'
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
    <div>
      {winner && <div>Winner!</div>}
      {boardNumbers.map((row, rowIndex) => 
        <div key={rowIndex}>
          {row.map((num, colIndex) => 
            <span key={colIndex}>
              {gridItem(num, rowIndex * 5 + colIndex, selectedItems[rowIndex * 5 + colIndex], toggleSelected)}  
            </span>
          )}
        </div>
      )}
    </div>
  );
}
