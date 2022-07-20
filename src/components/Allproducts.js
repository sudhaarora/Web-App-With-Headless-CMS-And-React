import React, { Component } from "react";
import { Query } from "react-apollo";
import PRODUCTS_QUERY from "./all-product";
import Product from "./Product";
import Cart from "./Cart";
import Navbar from "./Navbar";
class Allproducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartitems: [],
      show: false,
    };
  }
  addItem = (item) => {
    this.setState({
      cartitems: this.state.cartitems.concat([item]),
    });
  };
  showModal = () => {
    this.setState({ show: true });
  };
  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    return (
      <Query query={PRODUCTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching products.....</div>;
          if (error) return <div>Error fetching products..</div>;

          const items = data.products;
          const itemssent = this.state.cartitems;
          console.log({ items });
          return (
            <div>
              <Navbar cart={itemssent} show={this.showModal} />
              <Cart show={this.state.show} items={itemssent} handleClose={this.hideModal}></Cart>
              <div className="container mt-4">
                <div className="row">
                  {items.map((item) => (
                    <Product
                      key={item.id}
                      product={item}
                      addItem={this.addItem}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default Allproducts;
