const ticket =artifacts.require('Ticket')
// exporter une fonction anonyme
// qui accepte o moin un parametre:
// params: deployer
//          network
//          accounts
module.exports =  (deployer,network,accounts)=>{
    console.log("network : "+network);
    console.log("accounts");
    console.table(accounts);
     deployer.deploy(ticket,'5','10000000000000000000','andalouse','2131231241525')
    
    
    // deployer.deploy(smartContract,params of constructor)
    // utiliser les ''
}