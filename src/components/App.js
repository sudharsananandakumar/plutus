import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Plutus from '../abis/Plutus.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("account")
    console.log(accounts[0])
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = Plutus.networks[networkId]
    console.log(networkData)
    if(networkData) {
      const plutus = web3.eth.Contract(Plutus.abi, networkData.address)
      console.log(plutus)
      this.setState({ plutus })
      const productCount = await plutus.methods.productCount().call()
          // Load products
      for (var i = 1; i <= productCount; i++) {
        const nft = await plutus.methods.nfts(i).call()
        console.log(nft)
        this.setState({
          nfts: [...this.state.nfts, nft]
        })
      }
      console.log(productCount.toString())
      this.setState({ loading: false})
    } else {
      window.alert('Plutus contract not deployed to detected network.')
    }
  }

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.plutus.methods.createPlutusNFT(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  loanProduct(id, price) {
    this.setState({ loading: true })
    this.state.plutus.methods.loanNFTProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  // loadme(){
  //   console.log("I am called from the button")
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     window.ethereum.request({method: 'eth_requestAccounts'}).then(result => console.log(result[0]))
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  //   }
  // }


  constructor(props) {
    super(props)
    this.createProduct = this.createProduct.bind(this)
    this.loanProduct = this.loanProduct.bind(this)
    this.state = {
      account: '',
      productCount: 0,
      nfts: [],
      loading: true
    }
  }

  render() {
    return (
      <div className='container'>
        <Navbar account={this.state.account} />
        <div>
          <main role="main" className="">
            { this.state.loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <Main 
              nfts={this.state.nfts}
              createProduct={this.createProduct}
              loanProduct={this.loanProduct} />
            }
          </main>
      </div>
      </div>
    );
  }
}

export default App;
