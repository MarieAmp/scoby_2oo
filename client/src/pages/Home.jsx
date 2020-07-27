import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { Layer, Feature } from "react-mapbox-gl";

const Home = (props) => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoibWFyaWVhbXAiLCJhIjoiY2tkNGh5NnliMXJhcTJzbzdpbnZpNmw1bCJ9.rQjywXc3E0QEzGao20SB0A",
  });

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      ;
    </div>
  );
};

export default Home;
