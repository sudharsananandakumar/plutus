import App from './App'
import React, { Component } from 'react';
import Web3 from 'web3'

class Landing extends Component {
    async componentWillMount() {
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          this.setState({renderView: 1});
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }

      constructor(props) {
        super(props)
        this.state = {
            renderView: 0
        }
      }

      render() {
        switch(this.state.renderView) {
            case 1:
                return <App />
            default:
                return(<div className='Container' style={{marginTop:'30px'}}>
                <div className='row' style={{textAlign:'center'}}>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <img src="landing.png" height='80%' width='auto' style={{marginTop:'60px'}} />
                      </div>
                    </div>
                    <div className='row' style={{paddingTop:'20px'}}>
                      <div className='col-md-12'>
                        <button className='btn-primary btn-lg' onClick={this.loadWeb3.bind(this)} style={{width:'50%',backgroundColor:'#9a63f0',border:'none'}}>Link ETH Account!</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
        }  
      }

}

export default Landing