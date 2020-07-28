import React, { Component } from "react";
import apiHandler from "../api/apiHandler";
import ItemDetails from "../components/ItemDetails";
import "../styles/home.css";
import HomeMap from "../components/HomeMap";

class Home extends Component {
  state = {
    itemDetailsAreDisplayed: false,
    selectedItem: null,
  };

  displayItemDetails = (itemId) => {
    // console.log(itemId)
    apiHandler
      .getOneItem(itemId)
      .then((fetchedItem) => {
        this.setState({
          selectedItem: fetchedItem,
          itemDetailsAreDisplayed: true,
        });
      })
      .catch((err) => console.log(err));
  };

  handleClose = () => {
    this.setState({
      itemDetailsAreDisplayed: false
    })
  }

  render() {
    return (
      <div className="home">
        <HomeMap handleClick={this.displayItemDetails} />
        <ItemDetails display={this.state.itemDetailsAreDisplayed} item={this.state.selectedItem} handleClose={this.handleClose} />;
      </div>
    );
  }
}

export default Home;
