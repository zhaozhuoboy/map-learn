import React, { Component } from 'react';
import L from 'leaflet';
import './App.css';

class App extends Component {
  componentDidMount(){
    var m = L.map('map').setView([37.92388861359015,115.22048950195312], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/zhaozhuodev/cj6wxmlcb0jz92qqorge0ew7n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiemhhb3podW9kZXYiLCJhIjoiY2o2d3g2NWI3MWtndzJ3cGRrbWc1MjQ4diJ9.SCM25AWgFuLBKdqSi3XFag', {
      maxZoom: 18,
      attribution: 'zhaozhuoboy &copy; <a href="http://github.com/zhaozhuoboy">zhaozhuodev</a>',
      id: 'mapbox.streets'
    }).addTo(m);
    m.on('click',(e)=>{
      console.log(e.latlng)
    })
    var marker = L.marker([37.92388861359015,115.22048950195312]).addTo(m);
  }
  render() {
    return (
      <div className="App" id='map'>
        
      </div>
    );
  }
}

export default App;
