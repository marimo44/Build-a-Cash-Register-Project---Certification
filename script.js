const cash = document.getElementById("cash");
const purchase = document.getElementById("purchase-btn");
const changeContainer = document.getElementById("change-due");
const cidContainer = document.getElementById("cid-container");
const priceContainer = document.getElementById("price-container");
let price = 19.5;
let changeDenominator = [];
let changeDenominatorCounts = {};
let changeDenominatorCountsArray = [];

const denominator = [
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01],    
]
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
  ];

priceContainer.innerHTML = `<p class="total">Total: $${price}<p>`;

const updateCidDisplay = () => {
  cidContainer.innerHTML = `<p class="cid-title">Change in drawer</p>`;
  cid.forEach(([elName, amount]) => {
    cidContainer.innerHTML += `<p>${elName}: $${amount.toFixed(2)}</p>`;
  });
};

updateCidDisplay();
  
const cidDenomUpdate = (change) => {
  changeDenominator = [];
  changeDenominatorCounts = {};
  changeDenominatorCountsArray = [];

  for (const el of denominator) {
    const cidIndex = cid.findIndex(item => item[0] === el[0]);

      while (change >= el[1] && cid[cidIndex][1] >= el[1]) {
        changeDenominator.push(el);
        change = Math.round((change - el[1]) * 100) / 100;    // Round to avoid floating point issues
        cid[cidIndex][1] = Math.round((cid[cidIndex][1] - el[1]) * 100) / 100;    // Round to avoid floating point issues
      }      
  }
            
  changeDenominator.forEach(el => changeDenominatorCounts[el[0]] = (changeDenominatorCounts[el[0]] || 0) + 1 );
  denominator.forEach(el => {
    if ( changeDenominatorCounts.hasOwnProperty(el[0]) ) {
      changeDenominatorCountsArray.push([el[0], el[1] * changeDenominatorCounts[el[0]]]);          
    }
  });       
}
    
const update = () => {
  const cashNum = parseFloat(cash.value);

  if (isNaN(cashNum)) {
    alert("Please enter a valid cash amount");
    return;
  }
    
  if (cashNum < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  let change = Math.round((cashNum - price) * 100) / 100; // Round to avoid floating point issues
  let cidTotal = cid.reduce((acc, el) => acc + el[1], 0);
  cidTotal = Math.round(cidTotal * 100) / 100;  // Round to avoid floating point issues
  
  if (cashNum === price) {  //there's no need to check if cidTotal is more than change since the drawer only opens if there's a need for change
    changeContainer.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
  } else if (cidTotal < change) {
    changeContainer.innerHTML = `<p class="status">Status: INSUFFICIENT_FUNDS</p>`;
  } else if (cidTotal === change) {
    // Handle CLOSED status
    changeContainer.innerHTML = `<p class="status">Status: CLOSED</p>`;
    cid.slice().reverse().forEach(([name, amount]) => {
      if (amount > 0) {
        changeContainer.innerHTML += `<p class="indent">${name}: $${amount.toFixed(2)}</p>`;
      }
    });
  } else {
    cidDenomUpdate(change);

    if (Math.round(changeDenominatorCountsArray.reduce((acc, el) => acc + el[1], 0) * 100) / 100 < change) {  //this is when the actual change amount denominations are less than expected change (there aren't enough coins/bills of the right denominations to make exact change, even if the total amount in the drawer is sufficient.)
      changeContainer.innerHTML = `<p class="status">Status: INSUFFICIENT_FUNDS</p>`;
    } else {
      changeContainer.innerHTML = `<p class="status">Status: OPEN</p>${changeDenominatorCountsArray.map(([name, amount]) => 
        `<p class="indent">${name}: $${amount.toFixed(2)}</p>`).join('')}`;
      updateCidDisplay();
    }
  }
}

purchase.addEventListener("click", update);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    update();
  }
});