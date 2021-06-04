import React, { Component } from 'react'
import dai from '../dai.png'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">TestToken Balance</th>
            </tr>
          </thead>
          <tbody>
            {console.log(this.props)}
            <tr>
              <td>{this.props.testTokenBalance} TTET</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let address
                address = this.input.value.toString()
                console.log(address)
                this.props.sendToken(address)
              }}>
              <div>
                <label className="float-left"><b>Faucet Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {this.props.testTokenBalance}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; mDAI
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Send!</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
