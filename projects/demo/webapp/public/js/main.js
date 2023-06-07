import { ABI, ticketContractAdress } from "./config.js";

let web3js;
let account;
let contract;
let nbrTicket;
let tickets = [];
let main = async () => {
  if (!window.ethereum)
    return alert('please download metamask')
  window.ethereum.on('accountsChanged', (accounts) => {
    account = accounts[0]
    accountElement.innerText = account
    loadTickets();
  })
  web3js = new Web3(window.ethereum)
  //1- recuperation du compte addresse depuis metamask
  account = (await web3js.eth.requestAccounts())[0]
  console.log(account);
  accountElement.innerText = account

  // ----- creation de l objet contract

  contract = new web3js.eth.Contract(ABI, ticketContractAdress);
  console.log(contract)
  //2- recuperation du nom de l'evenement
  let nomEvenement = await contract.methods.nomEvenement().call()
  // promise <=contract.methods.methodName(param1,param2.param3).call()
  console.log('nomEvenement', nomEvenement)
  titleElement.innerText = nomEvenement

  //3- recuperation du nombre de ticket

  nbrTicket = await contract.methods.nbrTicket().call();
  console.log('nbrTicket', nbrTicket);

  //4- recuperation des tickets et leurs infos
  await loadTickets();

}
main()

const loadTickets = async () => {
  tickets = [];
  tbodyElement.innerHTML = ""
  for (let i = 0; i < nbrTicket; i++) {
    let ticket = await contract.methods.tickets(i).call()
    tickets.push(ticket)
  }
  for (let i = 0; i < nbrTicket; i++) {
    displayTicket(tickets[i]);// afficher le ticket dans le tableau
  }
}
const displayTicket = async(ticket) => {
 
  let tr = document.createElement('tr')
  let td1 = document.createElement('td')
  let td2 = document.createElement('td')
  let td3 = document.createElement('td')
  let td4 = document.createElement('td')
  let td5 = document.createElement('td')
  let achterBtn = document.createElement('button')
  let vendreBtn = document.createElement('button')
  let retirerBtn = document.createElement('button')
  tbodyElement.appendChild(tr)
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tr.appendChild(td5)
  td5.appendChild(achterBtn)

  td5.appendChild(vendreBtn)
  td5.appendChild(retirerBtn)
  vendreBtn.classList.add('vendreBtn')
  retirerBtn.classList.add('retirerBtn')
  vendreBtn.innerText='Vendre'
  retirerBtn.innerText='Retirer'


  achterBtn.innerText = "acheter"
  td1.innerText = ticket.id
  td2.innerText = ticket.acheteur
  if(ticket.acheteur.toLowerCase()==account.toLowerCase())
    tr.classList.add("owner")
  else
    {
      vendreBtn.classList.add('hidden')
      retirerBtn.classList.add('hidden')
    }
  if(!ticket.enVente){
    retirerBtn.setAttribute("disabled", "true")
    retirerBtn.classList.add('retiterBtnDisabled')
  }
  td3.innerText = ticket.enVente ? 'disponible' : 'indisponible'
  td4.innerText = web3js.utils.fromWei(ticket.prix) + " ETH"

  let isBuyer =await alreadyBuyer(account)
  if (!ticket.enVente || isBuyer)
    achterBtn.setAttribute("disabled", "true")
  else
    achterBtn.addEventListener('click', async () => {
      // realiser une transaction
      loading.classList.remove('hidden')
      contract.methods.acheter(ticket.id).send({
        from: account,
        value: ticket.prix,
        gas: 200000,
        gasPrice: await web3js.eth.getGasPrice()
      }).then(receipt => { console.log(receipt); loadTickets() })
        .catch(error => console.log('custom erreur', error))
        .finally(() => {
          loading.classList.add('hidden')
        })
      // contract.methods.mehodName(param1,param2).send({
      //   from:sendAdress,
      //   to: contracrt adress ( facultatif),
      //   gasPrice:web3js.eth.getGasPrice()
      //   gas:100000 (estimation),
      //   value: when u want to send ether with the transaction
      // })
    })
    vendreBtn.addEventListener('click',async ()=>{
      let value = prompt("donnez le prix en Eth")
      if(!value)
        return
      value = web3js.utils.toWei(value.replace(',','.'),'ether')
      // envoi la transaction
      loading.classList.remove('hidden')
      contract.methods.vendre(true,value).send({
        from:account,
        gas: 200000,
        gasPrice: await web3js.eth.getGasPrice()
      }).then(receipt=>{
                          alert('done');
                          loadTickets()
                        })
      .catch(error => console.log('custom erreur', error))
      .finally(() => loading.classList.add('hidden'))
    })
    retirerBtn.addEventListener('click',async ()=>{
      
      loading.classList.remove('hidden')
      contract.methods.retirer().send({
        from:account,
        gas: 200000,
        gasPrice: await web3js.eth.getGasPrice()
      }).then(receipt=>{
                          alert('done');
                          loadTickets()
                        })
      .catch(error => console.log('custom erreur', error))
      .finally(() => loading.classList.add('hidden'))
    })

}

let alreadyBuyer=async (address)=>{ // true or false
  let res = await contract.methods.acheteurs(account).call()
  return res.id!=0
}







//5- envoyer unne transaction d'achat

//6- envoyer une transaction de remettre en vente un ticket

//7- envoyer une transaction de retirer le ticket (plus en vente)