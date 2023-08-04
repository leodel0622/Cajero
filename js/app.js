const Accounts_bank = [
    {
        userid: "123456",
        accountid: "1",
        pass: "1234",
        balance: 2000000,
        owner: "Leonardo Delgado"
    },
    {
        userid: "112345",
        accountid: "2",
        pass: "1234",
        balance: 3000000,
        owner: "Pepito Perez"
    },
    {
        userid: "122345",
        accountid: "3",
        pass: "1234",
        balance: 4000000,
        owner: "Pepita "
    },
];

// const cuenta = Accounts_bank.find (acc => acc.userid==="123456789")

const formLogin = document.querySelector(".form-login");
const sectionindex = document.querySelector(".index");
let useraccount;


const login = (userid,password) => {
    return Accounts_bank.find (acc => acc.userid===userid && acc.pass===password)

}

formLogin.addEventListener("submit",e => {
    e.preventDefault()
    const userid = e.target.username.value
    const password = e.target.password.value
    useraccount = login(userid,password)
    if (useraccount){
        formLogin.classList.add("d-none")
        sectionindex.classList.remove("d-none")
        
    }
    else {
        console.log("usuaro desconocido")
    }
})




// button.addEventListener('click', (e) => {
//     e.preventDefault()
//     const data = {
//     username: username.value,
//     password: password.value
//     }

//     console.log(data)
// })