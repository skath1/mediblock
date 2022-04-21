const Web3 = require('web3')
const pharmacist = require('../build/contracts/Pharmacist.json')

class PharmacistInteractor {
    web3;
    account;
    contract;


    constructor(account){
        const privateKey = '5f8e2451fb96064a1870d419ee011303af25b018558aabe701496ff27d755a43'
        const HDWalletProvider = require('@truffle/hdwallet-provider');
        const provider  = new HDWalletProvider(privateKey,'https://apis.ankr.com/b75f99a3c30a49eabfc57d7a1fb9c00a/acd5628758ba78c1124bc7ad238c75bf/eth/fast/rinkeby')
        this.web3 = new Web3(provider)
        this.account = account;
        this.contract = new this.web3.eth.Contract(pharmacist.abi,'0x6110cC32C27f85524B7424a03cCD42943c278a8A')
    }

    async manipulatePharmacist(weight, qty) {

        await this.contract.methods.update(weight,qty).send({from: '0x2Fe76F831b275140710382453A05c6A9e2C74C2D'})

    }

    async getPharmacist() {
        const _weight = await this.contract.methods.getWeight().call() 
        const _quantity = await this.contract.methods.getQuantity().call()

        console.log({
            weight: _weight,
            quantity: _quantity,
        })
    }

}

module.exports = PharmacistInteractor;