import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.map=null;
  }
  componentDidMount(){
    this.initMap();
    this.map.on('click',(e)=>{
      console.log(e.latlng)
    })
    var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
    // create an orange rectangle
    var test = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(this.map);
    // zoom the map to the rectangle bounds
    this.map.fitBounds(bounds);
    this.map.setView([54.559322, -5.767822])
    // var point = L.point(55.541064956111036, -4.702148437500001);
  }
  initMap(){
    this.map = L.map('map',{drawControl: true}).setView([37.92388861359015,115.22048950195312], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/zhaozhuodev/cj6x6z0799sbk2so4ggx2rqhb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiemhhb3podW9kZXYiLCJhIjoiY2o2d3g2NWI3MWtndzJ3cGRrbWc1MjQ4diJ9.SCM25AWgFuLBKdqSi3XFag', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://github.com/zhaozhuoboy">zhaozhuodev</a>',
      id: 'mapbox.streets'
    }).addTo(this.map);
    var drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
  }
  render() {
    return (
      <div className="App" id='map'>
        
      </div>
    );
  }
}

export default App;
