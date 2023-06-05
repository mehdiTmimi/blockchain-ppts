import { ABI,ticketContractAdress } from "./config.js";

let web3js;
let account;
let contract;
let nbrTicket;
let tickets=[];
let main = async ()=>{
  if(!window.ethereum)
    return alert('please download metamask')
  window.ethereum.on('accountsChanged',(accounts)=>{
      account= accounts[0]
      accountElement.innerText=account
  })
  web3js=new Web3(window.ethereum)
  //1- recuperation du compte addresse depuis metamask
  account= (await web3js.eth.requestAccounts())[0]
  console.log(account);
  accountElement.innerText=account

  // ----- creation de l objet contract

  contract = new web3js.eth.Contract(ABI,ticketContractAdress);
  console.log(contract)
  //2- recuperation du nom de l'evenement
  let nomEvenement = await contract.methods.nomEvenement().call()
  // promise <=contract.methods.methodName(param1,param2.param3).call()
  console.log('nomEvenement',nomEvenement)
  titleElement.innerText=nomEvenement

  //3- recuperation du nombre de ticket
  
  nbrTicket=await contract.methods.nbrTicket().call();
  console.log('nbrTicket',nbrTicket);

  //4- recuperation des tickets et leurs infos
  await loadTickets();
}
main()

const loadTickets=async ()=>{
  tickets=[];
 for(let i=0;i<nbrTicket;i++)
  {
   let ticket= await contract.methods.tickets(i).call()
   tickets.push(ticket)
  }
  for(let i=0;i<nbrTicket;i++)
  {
    displayTicket(tickets[i]);// afficher le ticket dans le tableau
  }
}
const displayTicket = (ticket)=>{
    let tr=document.createElement('tr')
    let td1=document.createElement('td')
    let td2=document.createElement('td')
    let td3=document.createElement('td')
    let td4=document.createElement('td')
    let td5=document.createElement('td')
    let achterBtn=document.createElement('button')
    tbodyElement.appendChild(tr)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    td5.appendChild(achterBtn)

    achterBtn.innerText="acheter"
    td1.innerText=ticket.id
    td2.innerText=ticket.acheteur
    td3.innerText=ticket.enVente?'disponible':'indisponible'
    td4.innerText=web3js.utils.fromWei(ticket.prix) + " ETH"

    achterBtn.addEventListener('click',()=>{

    })
}







//5- envoyer unne transaction d'achat

//6- envoyer une transaction de remettre en vente un ticket

//7- envoyer une transaction de retirer le ticket (plus en vente)