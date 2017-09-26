import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import './App.css';

class App extends Component {
  componentDidMount(){
    console.log(L)
    var map = L.map('map',{drawControl: true}).setView([37.92388861359015,115.22048950195312], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/zhaozhuodev/cj6x6z0799sbk2so4ggx2rqhb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiemhhb3podW9kZXYiLCJhIjoiY2o2d3g2NWI3MWtndzJ3cGRrbWc1MjQ4diJ9.SCM25AWgFuLBKdqSi3XFag', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://github.com/zhaozhuoboy">zhaozhuodev</a>',
      id: 'mapbox.streets'
    }).addTo(map);
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    // var drawControl = new L.Control.Draw({
    //     edit: {
    //         featureGroup: drawnItems
    //     }
    // });
    // map.addControl(drawControl);
    map.on('click',(e)=>{
      console.log(e.latlng)
    })
  }
  render() {
    return (
      <div className="App" id='map'>
        
      </div>
    );
  }
}

export default App;
