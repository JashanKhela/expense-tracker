const balance = document.getElementById('__balance');
const money_plus = document.getElementById('__moneyPlus');
const money_minus = document.getElementById('__moneyMinus');
const list = document.getElementById('__list');
const form = document.getElementById('__form');
const text = document.getElementById('__text');
const amount = document.getElementById('__amount');


// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'));


let tranactions = localStorage.getItem('transaction') ? localStorageTransaction : [];


//add transaction to list of items

const addTransaction = (e) => {
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please Add A Text And An Amount');
    } else {
        const transaction = {
            id: randomID(),
            text:text.value,
            amount:+amount.value,
        };
        
        tranactions.push(transaction);
        addTransactionList(transaction);
        updateTotals();
        updateLocalStorage();
        text.value='';
        amount.value ='';

    }
}

const randomID = () => {
    return Math.floor(Math.random() * 100000000);
}

const deleteTransaction = (id) => {
    tranactions = tranactions.filter(tranaction => tranaction.id !== id);
    init();
    updateLocalStorage();
}

const addTransactionList = (transaction) => {
    //get negative or postive value
    let sign = transaction.amount < 0 ? '-' : '+';
    //create a list item for that new element
    const item = document.createElement('li');
    //add class based on value 
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    //add span to list item we added
    item.innerHTML = `${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span><button class="__deleteButton" onClick='deleteTransaction(${transaction.id})'>X</button>`
    //add the newly created list item to the DOM
    list.appendChild(item);
}

//update the balance , income and expense total
const updateTotals = () => {
    let amounts = tranactions.map(transaction => {
        return transaction.amount
    })
    let total = amounts.reduce((acc , item) => (acc += item),0).toFixed(2);
    let income = amounts.filter(item => item > 0).reduce((acc,item) => (acc+= item), 0).toFixed(2);
    let expense = amounts.filter(item => item < 0).reduce((acc,item) => (acc+= item), 0) *-1 .toFixed(2);

    console.log(total);
    console.log(income);
    console.log(expense);


    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;

}

//update local storage

const updateLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(tranactions));
}

//Init App
const init = () =>{
    list.innerHTML = '';
    tranactions.forEach(addTransactionList);
    updateTotals();
};

init();


form.addEventListener('submit', addTransaction);