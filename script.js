/*
const cash = document.getElementById("cash");
const purchase = document.getElementById("purchase-btn");
const changeContainer = document.getElementById("change-due");
const cidContainer = document.getElementById("cid-container");
let price = 11.95;
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

let cidTotal = cid.reduce((acc, el) => acc + el[1], 0);
cidTotal();
 
const updateCidDisplay = () => {
  cidContainer.innerHTML = cid.map(([name, amount]) => 
      `<p>${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}: $${amount.toFixed(2)}</p>`
  ).join('');
};

updateCidDisplay();
  
const cidDenomUpdate = (change) => {
  changeDenominator = [];
  changeDenominatorCounts = {};
  changeDenominatorCountsArray = [];

  for (const el of denominator) {
    const cidIndex = cid.findIndex(item => item[0] === el[0]);

      if (cidIndex !== -1) {
        while (change >= el[1] && cid[cidIndex][1] >= el[1]) {
          changeDenominator.push(el);
          change -= el[1];
          cid[cidIndex][1] -= el[1];
        }
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
    if (cashNum >= price) {
      change = cashNum - price;
        
        if (cidTotal >= change) {
          if (cashNum > price) {
            cidDenomUpdate(change);
            changeContainer.innerHTML = `<p>Status: OPEN</p>`;
            changeDenominatorCountsArray.forEach(([elName, value]) => {
              changeContainer.innerHTML += `<p>${elName}: $${value}</p>`;
            });
            cidTotal = cid.reduce((acc, el) => acc + el[1], 0); 
            updateCidDisplay();
          } else if (cashNum === price) {
             changeContainer.innerHTML = "No change due - customer paid with exact cash";
          }

          
        } else if (cidTotal < change) {
          changeContainer.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
        } else if (cidTotal === change) {
          changeContainer.innerHTML = `<p>Status: CLOSED</p>`;
        } 
      } else {
        alert("Customer does not have enough money to purchase the item");
      }
    }
    
    
    //console.log(change);

  //cidDenomUpdate(23);  

  //console.log(changeDenominator);
  //console.log(cid);
  //console.log(cidUnit);

  //console.log(changeDenominatorCounts);
  //console.log(changeDenominatorCountsArray);
 
  
  purchase.addEventListener("click", update);
  */
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
    cidContainer.innerHTML += `<p>${elName}: $${amount}</p>`
  });
};

updateCidDisplay();
  
const cidDenomUpdate = (change) => {
  changeDenominator = [];
  changeDenominatorCounts = {};
  changeDenominatorCountsArray = [];

  for (const el of denominator) {
    const cidIndex = cid.findIndex(item => item[0] === el[0]);

      if (cidIndex !== -1) {
        while (change >= el[1] && cid[cidIndex][1] >= el[1]) {
          changeDenominator.push(el);
          change = (change - el[1]).toFixed(2);
          cid[cidIndex][1] = (cid[cidIndex][1] - el[1]).toFixed(2);
        }
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
  
  if (cashNum === price) {
    changeContainer.innerHTML = "No change due - customer paid with exact cash";
  } else if (cidTotal < change) {
    changeContainer.innerHTML = `<p class="status">Status: INSUFFICIENT_FUNDS</p>`;
  } else if (cidTotal === change) {
    // Handle CLOSED status
    let output = `<p class="status">Status: CLOSED</p>`;
    cid.slice().reverse().forEach(([name, amount]) => {
      if (amount > 0) {
        output += `<p class="indent">${name}: $${amount.toFixed(2)}</p>`;
      }
    });
    changeContainer.innerHTML = output;
  } else {
    cidDenomUpdate(change);
    if (changeDenominatorCountsArray.length === 0 || Math.round(changeDenominatorCountsArray.reduce((sum, [, amount]) => sum + amount, 0) * 100) / 100 < change) {
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