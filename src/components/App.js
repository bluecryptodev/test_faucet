import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import TestToken from '../abis/TestToken.json';
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
      const testToken = new web3.eth.Contract(TestToken.abi, '0x83b5d1eb9Fa84984Ca20eB921aD327e1C9746667')
      this.setState({ testToken })
      let testTokenBalance = await testToken.methods.balanceOf(accounts[0]).call()
      console.log(testTokenBalance)
      this.setState({ testTokenBalance: testTokenBalance.toString() })

    this.setState({ loading: false })
    web3.eth.getBalance(this.state.account, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log(web3.utils.fromWei(result, "ether") + " ETH")
      }
    })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.log(window.web3.currentProvider)
    }
    else if (window.web3) {
      console.log(window.web3.currentProvider)
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  sendToken = (address) => {
    this.setState({ loading: true })
    
    this.state.testToken.methods.faucet(address).send({from: this.state.account, gas: 0}).on('transactionHash', (hash) => {
      console.log(hash)
      this.setState({ loading: false })
    })
    this.state.testToken.methods.faucet(address)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      testToken:{},
      testTokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        testTokenBalance={this.state.testTokenBalance}
        sendToken={this.sendToken}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
