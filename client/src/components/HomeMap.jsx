import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";

const toto = new Image(30, 30);
toto.src = "/media/marker.svg";

export default class HomeMap extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    apiHandler.getItems().then((fetchedItems) => {
      this.setState({
        items: fetchedItems,
      });
    });
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken:
        "pk.eyJ1IjoibWFyaWVhbXAiLCJhIjoiY2tkNGh5NnliMXJhcTJzbzdpbnZpNmw1bCJ9.rQjywXc3E0QEzGao20SB0A",
    });
    return (
      <Map
        style="mapbox://styles/mapbox/light-v10"
        center={[2.336095, 48.8577453]}
        zoom={[11.5]}
        className="home_map"
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-logo" }}
          images={["marker-logo", toto]}
        >
          {this.state.items.map((item) => {
            return (
              <Feature
                key={item._id}
                coordinates={[
                  item.location.coordinates[0],
                  item.location.coordinates[1],
                ]}
                onClick={() => this.props.handleClick(item._id)}
              />
            );
          })}
        </Layer>
      </Map>
    );
  }
}
