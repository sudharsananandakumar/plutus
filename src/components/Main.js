import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" style={{paddingTop:"60px"}}>
        {/* <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form> */}
        <p> </p>
        <h3>NFTs Owned</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Loan Amount</th>
              <th scope="col">NFT Owner</th>
              <th scope="col">Tenure</th>
              <th scope="col">Annual Interest Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
              { this.props.nfts.map((product, key) => {
                return(
                        <tr key={key}>
                        <th scope="row">{product.nftidentifier.toString()}</th>
                        <td>{product.nftname}</td>
                        <td>{window.web3.utils.fromWei(product.loanamount.toString(), 'Ether')} Eth</td>
                        <td>{product.nftowner}</td>
                        <td>6 Months</td>
                        <td>{product.rate.toString()}</td>
                        <td>
                            { !product.nftonloan
                            ? <button
                                name={product.nftidentifier}
                                value={product.loanamount}
                                onClick={(event) => {
                                    this.props.loanProduct(event.target.name, event.target.value)
                                }}
                                >
                                Loan
                                </button>
                            : <div>Item on Loan</div>
                            }
                            </td>
                        </tr>
                )
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;