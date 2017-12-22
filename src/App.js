import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css'
import './App.css';
// import markerIcon from './images/point.png'
// import mkshadow from './images/shadow.png'


class App extends Component {
  constructor(){
    super()
    this.map=null;
  }
 
  componentDidMount(){
    this.initMap();
    this.map.setView([25.792628,113.032208])
    //初始化 Leaflet Draw 的文案
    this.initDrawLocal();
    // console.log(L.drawLocal)

  }
  initDrawLocal=()=>{
    L.drawLocal = {
      // format: {
      // 	numeric: {
      // 		delimiters: {
      // 			thousands: ',',
      // 			decimal: '.'
      // 		}
      // 	}
      // },
      draw: {
        toolbar: {
          actions: {
            title: 'Cancel drawing',
            text: 'Cancel'
          },
          finish: {
            title: 'Finish drawing',
            text: 'Finish'
          },
          undo: {
            title: 'Delete last point drawn',
            text: 'Delete last point'
          },
          buttons: {
            polyline: 'Draw a polyline',
            polygon: '画一个多边形',
            rectangle: 'Draw a rectangle',
            circle: '画一个圆',
            marker: '标记',
            circlemarker: '圆标记'
          }
        },
        handlers: {
          circle: {
            tooltip: {
              start: 'Click and drag to draw circle.'
            },
            radius: 'Radius'
          },
          circlemarker: {
            tooltip: {
              start: 'Click map to place circle marker.'
            }
          },
          marker: {
            tooltip: {
              start: 'Click map to place marker.'
            }
          },
          polygon: {
            tooltip: {
              start: 'Click to start drawing shape.',
              cont: 'Click to continue drawing shape.',
              end: 'Click first point to close this shape.'
            }
          },
          polyline: {
            error: '<strong>Error:</strong> shape edges cannot cross!',
            tooltip: {
              start: '开始',
              cont: '继续点击地图画线',
              end: '结束'
            }
          },
          rectangle: {
            tooltip: {
              start: 'Click and drag to draw rectangle.'
            }
          },
          simpleshape: {
            tooltip: {
              end: 'Release mouse to finish drawing.'
            }
          }
        }
      },
      edit: {
        toolbar: {
          actions: {
            save: {
              title: 'Save changes',
              text: 'Save'
            },
            cancel: {
              title: 'Cancel editing, discards all changes',
              text: 'Cancel'
            },
            clearAll: {
              title: 'Clear all layers',
              text: 'Clear All'
            }
          },
          buttons: {
            edit: 'Edit layers',
            editDisabled: 'No layers to edit',
            remove: 'Delete layers',
            removeDisabled: 'No layers to delete'
          }
        },
        handlers: {
          edit: {
            tooltip: {
              text: 'Drag handles or markers to edit features.',
              subtext: 'Click cancel to undo changes.'
            }
          },
          remove: {
            tooltip: {
              text: 'Click on a feature to remove.'
            }
          }
        }
      }
    };
  }
  initMap(){
   
    this.map = L.map('map').setView([37.92388861359015,115.22048950195312], 16);
    L.tileLayer('//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      subdomains: "1234",
      attribution: '高德地图'
    }).addTo(this.map);


    //工具条
    // var drawnItems = new L.FeatureGroup();
    // this.map.addLayer(drawnItems);
    // var drawControl = new L.Control.Draw({
    //   draw: {
    //     position: 'topleft'
    //   },
    //   edit: {
    //     featureGroup: drawnItems
    //   }
    // });
    // this.map.addControl(drawControl);
    
  }
  // //测量
  // measure=()=>{
  //     // var stopclick = false; //to prevent more than one click listener

  //   var Polygon = new L.Draw.Polygon(this.map, {
  //       shapeOptions: {
          
  //       }
  //     });
  //     Polygon.enable();

  // }
	  
	render() {
		return (
		<div>
				<div className="App" id='map'>
				</div>
		</div>
		);
	}
}

export default App;



