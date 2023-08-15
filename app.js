// Data
const accounts = [
  {
    documentId: "12345678",
    numberAccount: "1001",
    passcode: "1234",
    balance: 1000000,
    owner: "Leonardo Delgado"
  },
  {
    documentId: "12348765",
    numberAccount: "1002",
    passcode: "1234",
    balance: 400000,
    owner: "Rubeus Hagrid"
  },
  {
    documentId: "87654321",
    numberAccount: "1003",
    passcode: "1234",
    balance: 7500000,
    owner: "Albus Dumbledore"
  },
  {
    documentId: "87651234",
    numberAccount: "1004",
    passcode: "1234",
    balance: 300000,
    owner: "Severus Snape"
  },
]

// VAIRIABLES
const MAX_BALANCE = 10000000;
const MIN_BALANCE = 100000;
const date = new Date();
const currentDate = date.toLocaleDateString();
const hour = date.toLocaleTimeString();
const nfCo = new Intl.NumberFormat('es-Co');
let typeTransaction;
let currentAccount;

// DOM VARIABLES
let modalTitle = document.querySelector(".modal-title");
let modalBody = document.querySelector(".modal-body");
let loginForm = document.querySelector("#login");
let mainMenu = document.querySelector("#main-menu");
let receipt = document.querySelector("#receipt");
const formTransaction = document.getElementById('form-transaction');
let modalFooter = formTransaction.querySelector('.modal-footer');

// SPINNER
const spinner = `
  <div class="spinner-border text-secondary text-center" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
`

// LOGIN
const login = (documentId) => accounts.find(acc => acc.documentId === documentId);

const validatePasccode = (account, passcode) => {
  if(account.passcode !== passcode) return 'Clave Errada';
  return 'ok';
}

// Insertar o depositar dinero
const insertCash = (account, passcode, amount) => {
  if(account.passcode !== passcode) return  'Clave Errada';
  if((account.balance + amount) > MAX_BALANCE) return 'Monto máximo no permitido';

  account.balance += amount;
  return 'ok';
}

// sacar o retirar dinero
const withdrawCash = (account, passcode, amount) => {
  if(account.passcode !== passcode) return  'Clave Errada';
  if((account.balance + amount) > MAX_BALANCE) return 'Monto máximo no permitido';   
  account.balance -= amount;
  return 'ok';
}

const showError = (message) => {
  const error = document.querySelector(".error");
  error.textContent = message;
  error.classList.remove("d-none");

  setTimeout(() => {
    error.classList.add('d-none');
  }, 2000);      
}

const drawForm = (type) => {
  if(type === 'details') return `
    <div>
      <label for="inputPasscode" class="form-label">Clave</label>
      <input type="tex" id="inputPasscode" class="form-control" aria-describedby="passwordHelpBlock" required>
    </div>
  `
  return `
    <div>
      <label for="inputAmount" class="form-label">Cantidad</label>
      <input type="number" id="inputAmount" class="form-control" aria-describedby="passwordHelpBlock" required>
    </div>
    <div>
      <label for="inputPasscode" class="form-label">Clave</label>
      <input type="tex" id="inputPasscode" class="form-control" aria-describedby="passwordHelpBlock" required>
    </div>
  `
}

document.addEventListener('click', e => {
  if(e.target.matches("#insert")) {
    modalTitle.textContent = e.target.textContent;
    typeTransaction = e.target.textContent.toLowerCase();
    modalBody.innerHTML = drawForm(typeTransaction);
  }
  if(e.target.matches("#withdraw")) {
    modalTitle.textContent = e.target.textContent;
    typeTransaction = e.target.textContent.toLowerCase();
    modalBody.innerHTML = drawForm(typeTransaction);
  } 
  if(e.target.matches("#details")) {
    modalTitle.textContent = e.target.textContent;
    typeTransaction = 'details';
    modalBody.innerHTML = drawForm(typeTransaction);
  }
  if(e.target.matches("#exit")) {
   location.reload();
  }
})

// Login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const document = loginForm.querySelector('input').value;
  currentAccount = login(document);

  if(!currentAccount) {
    console.log('error')
  }
  if(currentAccount) {
    loginForm.classList.add('d-none');
    mainMenu.classList.remove('d-none')
  }
})

formTransaction.addEventListener('submit', e => {
  e.preventDefault();
  let passcode = formTransaction.querySelector("#inputPasscode").value;

  // validar el typo de transaction y de acuerdo a ello genero la funciuonalidad
  if(typeTransaction === 'depositar') {
    let amount = Number(formTransaction.querySelector("#inputAmount").value);
    modalFooter.innerHTML = spinner

    setTimeout(() => {
      const validTransaction = insertCash(currentAccount, passcode, amount);

      if(validTransaction === 'ok') {
        formTransaction.classList.add('d-none');
        modalTitle.textContent = 'transacción Exitosa';
        receipt.classList.remove('d-none');
        receipt.querySelector('.message-receipt').textContent = `${currentAccount.owner} gracias por utilizar nuestros servicios`;
        receipt.querySelector('.date').textContent = `Fecha Transacción ${currentDate} - ${hour}`;
        receipt.querySelector('.amount').textContent = `Valor Ingresado: $ ${nfCo.format(amount)}`;
        receipt.querySelector('.new-balance').textContent = `Nuevo Saldo: $ ${nfCo.format(currentAccount.balance)}`;
      } 
      else {
        modalFooter.innerHTML = `<button type="submit" class="btn btn-primary">Realizar transacción</button>`;
      }
    }, 3000);
  }

  if(typeTransaction === 'retirar') {
    let amount = Number(formTransaction.querySelector("#inputAmount").value);
    modalFooter.innerHTML = spinner;

    setTimeout(() => {
      const validTransaction = withdrawCash(currentAccount, passcode, amount);

      if(validTransaction === 'ok') {
        formTransaction.classList.add('d-none');
        modalTitle.textContent = 'transacción Exitosa';
        receipt.classList.remove('d-none');
        receipt.querySelector('.message-receipt').textContent = `${currentAccount.owner} gracias por utilizar nuestros servicios`;
        receipt.querySelector('.date').textContent = `Fecha Transacción ${currentDate} - ${hour}`;
        receipt.querySelector('.amount').textContent = `Valor Retirado: $ ${nfCo.format(amount)}`;
        receipt.querySelector('.new-balance').textContent = `Nuevo Saldo: $ ${nfCo.format(currentAccount.balance)}`;   
      }
      else {
        modalFooter.innerHTML = `<button type="submit" class="btn btn-primary">Realizar transacción</button>`;
      };
    }, 3000);
  }

  if(typeTransaction === 'details') {
    modalFooter.innerHTML = spinner;
    setTimeout(() => {
      const validTransaction = validatePasccode(currentAccount, passcode);
      
      if(validTransaction === 'ok') {
        // modalBody.innerHTML = DrawDetails(currentAccount);
        formTransaction.classList.add('d-none');
        modalTitle.textContent = 'transacción Exitosa';
        receipt.classList.remove('d-none');
        receipt.querySelector('.message-receipt').textContent = `${currentAccount.owner}`;
        receipt.querySelector('.amount').textContent = `Cuenta No. ${currentAccount.numberAccount}`;
        receipt.querySelector('.new-balance').textContent = `Saldo: $ ${nfCo.format(currentAccount.balance)}`;   
      }
      else {
        modalFooter.innerHTML = `<button type="submit" class="btn btn-primary">Realizar transacción</button>`;
      };
    }, 3000);
    
  }
})

 