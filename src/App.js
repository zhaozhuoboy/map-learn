import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-draw'
import HeatmapOverlay from 'leaflet-heatmap';
import 'leaflet-draw/dist/leaflet.draw.css'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.map=null;
    this.heatmapLayer=null;
  }
  componentDidMount(){
    console.log('热力图插件',HeatmapOverlay)
    this.initMap();
    this.map.on('click',(e)=>{
      console.log(e.latlng)
    })
    this.map.setView([38.058719000807145, 114.48434114456178])
    // var point = L.point(55.541064956111036, -4.702148437500001);

    var testData = {
      min: 0,
      max: 100,
      data: [
        {lat: 38.058719000807145, lng:114.48434114456178,count:80},
        {lat: 37.95502661288625, lng: 113.78814697265626,count:40},
      ]
    };
    this.heatmapLayer.setData(testData);
  }
  initMap(){
    //热力图配置项
    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius":50,
      "maxOpacity": .8, 
      // scales the radius based on map zoom
      "scaleRadius": false, 
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries 
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": true,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'count',
      blur: .65,
      gradient: {
        // enter n keys between 0 and 1 here
        // for gradient color customization
        '.5': 'red',
        '.7': 'yellow',
        '.8': 'blue',
        '.95': 'green'
      }
    };
    this.heatmapLayer = new HeatmapOverlay(cfg);
    this.map = L.map('map',{drawControl: true,layers: [this.heatmapLayer]}).setView([37.92388861359015,115.22048950195312], 16);
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
