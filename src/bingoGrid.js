import gridItem from "./gridItem";


function generateBoard() {
  const numbers = [];
  while (numbers.length < 25) {
    const rand = Math.floor(Math.random() * 75) + 1;
    if (!numbers.includes(rand)) {
      numbers.push(rand);
    }
  }
  return numbers;
}

function gridItem(index) {
    return(
        <div>
            {index}
        </div>
    );
    }

export function bingoGrid(){
    const boardNumbers = generateBoard;
return(
    <div>
        {boardNumbers.map((num, index) => (
            gridItem(index)
        ))}

    </div>
);}