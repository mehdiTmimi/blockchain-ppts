//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

struct TicketStr{
    uint256 id ;
    uint256 dateAchat;
    address acheteur;
    uint256 prix;
    bool enVente;
    //https://meet.google.com/qut-jhfw-onh
}
contract Ticket{
    uint256 public nbrTicket;
    TicketStr[] public tickets;
    address private proprietaire;
    string public nomEvenement;
    uint256 public dateEvenement;
    mapping( address => TicketStr ) public acheteurs;

    constructor(uint256 _nbrTicket,uint256 _prix, 
    string memory _nomEvenement, uint256 _dateEvenement   ){
            proprietaire= msg.sender;
            nbrTicket=_nbrTicket;
            nomEvenement=_nomEvenement;
            dateEvenement=_dateEvenement;
            for(uint256 i=1;i<=nbrTicket;i++)
            {
                TicketStr memory ticket=TicketStr(i,0,proprietaire,_prix,true);
                tickets.push(ticket);
            }
    }

    function vendre(bool _enVente,uint256 _price) external{
         TicketStr storage ticket=   acheteurs[msg.sender];
        
        if(ticket.dateAchat==0)
            revert('you don t have any ticket');
        
        ticket.enVente=_enVente;
        ticket.prix=_price;
        tickets[ticket.id-1].enVente=_enVente;
        tickets[ticket.id-1].prix=_price;
    }

    function retirer()external{
         TicketStr storage ticket=   acheteurs[msg.sender];
        
        if(ticket.dateAchat==0)
            revert('you don t have any ticket');
        
        ticket.enVente=false;
        tickets[ticket.id-1].enVente=false;
    }




    function acheter(uint256 _idTicket) public payable{
      
       /*   if(msg.value<prix)
            revert('not enough ethereum');
        if(acheteurs[msg.sender].dateAchat!=0)
            revert('you can t buy more than 1 ticket');
*/
        if(_idTicket>nbrTicket)
            revert('id doesn t exist');

        if(acheteurs[msg.sender].dateAchat!=0) // 1 ticket per address
            revert('you can t buy more than 1 ticket');

        TicketStr storage ticket = tickets[_idTicket-1];

        if(ticket.enVente==false)
           revert('this ticket is not for sell'); 

        if(ticket.prix>msg.value)
            revert('not enough ethereum'); 

        ticket.dateAchat=block.timestamp;
        ticket.enVente=false;
        uint256 balance = msg.value*99/100;//commision de 1%
        payable(ticket.acheteur).transfer(balance);
        delete acheteurs[ticket.acheteur];
        ticket.acheteur=msg.sender;
        acheteurs[msg.sender]=ticket;
        

    }
    function recolter() external{
        if(msg.sender!=proprietaire)
            revert("u r not the owner");
       // address(0x617F2E2fD72FD9D5503197092aC168c91465E7f2).balance;
        uint256 balance = address(this).balance;
        payable(proprietaire).transfer(balance);
    }
}