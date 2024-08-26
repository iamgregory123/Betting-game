// 1. Deposit money
// 2. determone lines
// 3. Collect money
// 4. spin slot machine
// 5. check if user won
// 6. give user their winnings
// 7. play again


const prompt = require('prompt-sync')()

const ROWS = 3
const CCOL = 3

const SYMBOL_COUNTS = {
    A:2,
    B:4,
    C:6,
    D:8

};

const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
};

const deposit = () =>{
    while(true){
        const depositMoney = prompt("Enter the money: ")
        const moneyDeposited = parseFloat(depositMoney)

        if (isNaN(moneyDeposited) || moneyDeposited <= 0){
            console.log("Enter a valid number!!")
        }else{
            return moneyDeposited
        }
    }
}

const getNumberOfLines = () => {
    while(true){

        const lines = prompt("Enter the numbee of line(1-3): ")
        const numberOfLines = parseInt(lines)

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("invalid number of lines")

        }else{
            return numberOfLines
        }
    }
}

const betAmount = (money, lines) => {
    while(true){

        const bet = prompt("Enter the bet amount per line: ")
        const numberBet = parseInt(bet)

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > (money/lines)){
            console.log("invalid bet. ")

        }else{
            return numberBet
        }
    }

}

const spin = () => {
    const symbols = []
    for (const [symbol, count] of Object.entries(SYMBOL_COUNTS) ){
        for(let i =0; i< count; i++){
            symbols.push(symbol)

        }

    }
    const reels = [ [] , [] , [] ];
    for(let i = 0; i<CCOL; i++){
        const copyReels = [...symbols]
        for(let j =0;j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * copyReels.length)
            const selectedSymbol =  copyReels[randomIndex]
            reels[i].push(selectedSymbol)
            copyReels.slice(randomIndex, 1)
            
        }
    }
    return reels
}

const transpose=(reels)=>{
    const row = []
    for(let i=0; i < ROWS;i++){
        row.push([])
        for(let j=0; j<CCOL; j++){
            row[i].push(reels[j][i])
        }
    }
    return row
}

const printRows = (rows) =>{

    for(const row of rows){
        let conString = ''
        for(const[i,symbol] of row.entries()){
            conString += symbol
            if(i != row.length - 1){
                conString+=" | "
            }
            
        }
        console.log(conString)
    }

}

const getWinnings = (bet, nlines, rows) => {
    let winnings = 0;
    for (let row = 0; row < nlines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
};

const game = () => {
    let money = deposit();

    while (true) {
        console.log("Your balance is $" + money);
        const nlines = getNumberOfLines();
        const bet = betAmount(money, nlines);
        money -= bet * nlines;  
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const win = getWinnings(bet, nlines, rows);
        console.log("You won $" + win);
        money += win;

        if (money <= 0) {
            console.log("You ran out of money!!");
            break;
        }

        const again = prompt("Do you want to play again? (y/n): ");
        if (again != 'y') break;

        console.log("You won $" + win.toString());
    }
};

game();


