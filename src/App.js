import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import axios from 'axios';
import HeatmapOverlay from 'leaflet-heatmap';
import 'leaflet-draw/dist/leaflet.draw.css'
import './App.css';



let api = 'http://134.175.63.128:58900/common/queryGridByXY';
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
let gridLayer = new L.layerGroup();
let circleLayer = new L.layerGroup();
class App extends Component {
  constructor(){
    super()
    this.map=null;
    this.heatmapLayer=null;
    this.prevlatlng=null;
    
  }
  componentDidMount(){
    this.initMap();
    
    let circle = L.circle([25.795022753899683,113.02887797355653],{
      color: "red",
       weight: 1,
       radius: 20
    }).addTo(circleLayer).bindPopup('我是圆');
    let grid = L.polygon(returnGrid(data[0][3],data[0][4])).addTo(gridLayer).bindPopup('我是方块');
    // this.map.on('click',(e)=>{
    //   console.log(e.latlng)
    //   var random = Math.floor(Math.random()*100+1);
    //   const data={
    //     ...e.latlng,
    //     count:random
    //   }
    //   this.heatmapLayer.addData(data);
    // })
    this.map.setView([25.792628,113.032208])
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
    this.map.on('dragstart',(ev)=>{
      // source.cancel('停止上一次请求');
      this.prevlatlng = this.map.getBounds();
    })
    this.map.on('dragend',(ev)=>{
      
      // let zoom = this.map.getZoom();113.023024 25.796699999999998", "113.02352 25.79715
      //getBounds  获取地图边界  数据是 latlngBounds 对象
      // 使用 latLng 方法将经纬度转换成  latLng点对象
      // contains 方法 返回  点，或者矩形是否在  地图边界内
      let Bounds=this.map.getBounds();
      let a= L.latLng(25.796699999999998,113.023024);
      let b = L.latLng(25.79715,113.02352)
      console.log(Bounds.contains(L.latLngBounds(a,b)))
      // console.log('拖动之前-->',this.prevlatlng)
      // console.log('拖动之后--->',Bounds)
      let obj = {
          leftlog:Bounds._southWest.lng,
          leftlat:Bounds._southWest.lat,
          rightlog:Bounds._northEast.lng,
          rightlat:Bounds._northEast.lat,
          FREQ_DL:'1.8G',
          kpi:'rsrp'
      }
      axios.post(api+`/20171004`,obj,{
        cancelToken: source.token
      })
      .then(res=>{
        console.log(res.data)
      })
      .catch(function(thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message);
        } else {
          // 处理错误
        }
      })
      
    })
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
    this.map = L.map('map',{drawControl: true,layers: [this.heatmapLayer,circleLayer,gridLayer]}).setView([37.92388861359015,115.22048950195312], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/zhaozhuodev/cj6x6z0799sbk2so4ggx2rqhb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiemhhb3podW9kZXYiLCJhIjoiY2o2d3g2NWI3MWtndzJ3cGRrbWc1MjQ4diJ9.SCM25AWgFuLBKdqSi3XFag', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://github.com/zhaozhuoboy">zhaozhuodev</a>',
      id: 'mapbox.streets'
    }).addTo(this.map);
    var drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
  }
  click=()=>{
    this.map.removeLayer(circleLayer)
  }
  click1=()=>{
    this.map.addLayer(circleLayer)
  }
  render() {
    return (
      <div>
          <div className="App" id='map'>
          </div>
        <button style={{position: 'absolute',
    bottom: 10}} onClick={this.click}>删除圆</button>
        <button style={{position: 'absolute',
      bottom: 10,left:100}} onClick={this.click1}>添加圆</button>
      </div>
      
      
    );
  }
}

export default App;


function returnGrid(a,b){
  let a1 = Number(a.split(' ')[1]);
  let b1 = Number(a.split(' ')[0]);
  let a2 = Number(b.split(' ')[1]);
  let b2 = Number(b.split(' ')[0]);
  let one =[a1,b1];
  let two =[a1,b2];
  let three = [a2,b2];
  let four = [a2,b1];
  let five =[a1,b1];
  return [one,two,three,four,five];
}


let data =[[-89.6921,-89.25,-94.9417,"113.02848 25.7949","113.028976 25.79535"],[-91.8575,null,-106.665,"113.029472 25.794","113.029968 25.79445"],[-95.256,-93.0,-98.5233,"113.029472 25.794449999999998","113.029968 25.7949"],[-97.725,-72.0,-83.0,"113.02848 25.79265","113.028976 25.7931"],[-88.4233,-101.0,-94.25,"113.027488 25.792199999999998","113.027984 25.79265"],[-83.818,-94.946,-92.3013,"113.03096000000001 25.792199999999998","113.031456 25.79265"],[-102.0233,-107.5,-105.3,"113.027984 25.792199999999998","113.02848 25.79265"],[-90.196,-90.55,-100.7133,"113.028976 25.794449999999998","113.029472 25.7949"],[-88.5663,-93.545,-97.246,"113.03046400000001 25.79355","113.03096000000001 25.794"],[-89.1808,-90.995,-96.39,"113.03096000000001 25.79355","113.031456 25.794"],[-81.1895,-88.195,-89.1514,"113.03046400000001 25.794","113.03096000000001 25.79445"],[-116.0,null,null,"113.03096000000001 25.79355","113.031456 25.794"],[-90.165,-100.645,-98.565,"113.03046400000001 25.79265","113.03096000000001 25.7931"],[-87.3827,-91.32,-93.3483,"113.03096000000001 25.7949","113.031456 25.79535"],[-74.25,null,-74.0,"113.03096000000001 25.7931","113.031456 25.79355"],[-85.4967,-94.43,-96.65,"113.029472 25.792199999999998","113.029968 25.79265"],[-103.0,null,null,"113.029472 25.7949","113.029968 25.79535"],[-83.8119,-93.648,-90.8663,"113.03046400000001 25.794449999999998","113.03096000000001 25.7949"],[-94.62,-101.6657,-99.2938,"113.02996800000001 25.794449999999998","113.03046400000001 25.7949"],[-92.6,-117.0,-99.5,"113.027984 25.79265","113.02848 25.7931"],[-85.743,-96.1056,-92.3618,"113.03096000000001 25.79265","113.031456 25.7931"],[-84.4995,-85.8125,-91.016,"113.03096000000001 25.7931","113.031456 25.79355"],[-92.1167,-105.0,-98.71,"113.029472 25.79355","113.029968 25.794"],[-91.9214,-80.63,-96.225,"113.031456 25.794449999999998","113.031952 25.7949"],[-94.0,null,-102.0,"113.027488 25.794","113.027984 25.79445"],[-110.0,null,null,"113.03046400000001 25.794","113.03096000000001 25.79445"],[-95.8925,-99.325,-103.01,"113.02996800000001 25.794","113.03046400000001 25.79445"],[-82.3608,-92.63,-92.48,"113.028976 25.7949","113.029472 25.79535"],[-92.825,-96.5433,-93.4,"113.031456 25.79355","113.031952 25.794"],[-94.81,-112.875,-92.6467,"113.029472 25.79265","113.029968 25.7931"],[-97.9325,null,-113.63,"113.02848 25.7931","113.028976 25.79355"],[-86.0407,-89.4,-87.8817,"113.02996800000001 25.7949","113.03046400000001 25.79535"],[-96.4375,-89.0,-81.0,"113.02848 25.79355","113.028976 25.794"],[-97.47,-75.38,-88.11,"113.02848 25.792199999999998","113.028976 25.79265"],[-97.745,-106.2,-90.085,"113.028976 25.794","113.029472 25.79445"],[-98.0,null,null,"113.03096000000001 25.792199999999998","113.031456 25.79265"],[-99.7,-114.0,-106.5,"113.027488 25.79265","113.027984 25.7931"],[-87.6,-78.1467,-89.065,"113.027984 25.7949","113.02848 25.79535"],[-90.8,-111.0,-112.0,"113.02996800000001 25.79355","113.03046400000001 25.794"],[-93.37,-113.0,-98.25,"113.028976 25.7931","113.029472 25.79355"],[-97.48,-114.25,-111.97,"113.02996800000001 25.79265","113.03046400000001 25.7931"],[-88.6667,-91.0,-91.5,"113.028976 25.79355","113.029472 25.794"],[-83.55,-97.4529,-92.695,"113.03046400000001 25.7949","113.03096000000001 25.79535"],[-90.3357,-78.49,-90.855,"113.027488 25.794449999999998","113.027984 25.7949"],[-115.25,-107.5,-120.0,"113.027488 25.79355","113.027984 25.794"],[-89.308,-93.8475,-92.91,"113.031456 25.792199999999998","113.031952 25.79265"],[-87.497,-90.695,-92.9467,"113.03046400000001 25.7931","113.03096000000001 25.79355"],[-89.6075,-118.0,-96.72,"113.031456 25.79265","113.031952 25.7931"],[-83.1467,-90.0617,-90.79,"113.029472 25.7949","113.029968 25.79535"],[-87.2415,-87.638,-95.535,"113.027488 25.7949","113.027984 25.79535"],[-86.75,null,null,"113.027984 25.794","113.02848 25.79445"],[-98.064,-89.4,-101.5233,"113.028976 25.79265","113.029472 25.7931"],[-88.654,-96.82,-93.21,"113.03046400000001 25.792199999999998","113.03096000000001 25.79265"],[-94.45,-109.0,-111.5,"113.02996800000001 25.7931","113.03046400000001 25.79355"],[-111.0,null,-111.0,"113.027984 25.7931","113.02848 25.79355"],[-93.01,-93.5,-97.9167,"113.031456 25.7931","113.031952 25.79355"],[-79.5146,-79.195,-83.086,"113.031456 25.7949","113.031952 25.79535"],[-86.358,-91.0288,-94.5667,"113.03096000000001 25.794","113.031456 25.79445"],[-95.16,-80.15,-96.65,"113.028976 25.792199999999998","113.029472 25.79265"],[-95.036,-107.25,-92.08,"113.029472 25.7931","113.029968 25.79355"],[-107.2767,null,null,"113.027984 25.79355","113.02848 25.794"],[-86.5567,-76.45,-92.295,"113.027984 25.794449999999998","113.02848 25.7949"],[-97.125,-101.13,-94.47,"113.02996800000001 25.792199999999998","113.03046400000001 25.79265"],[-90.33,null,null,"113.02848 25.794","113.028976 25.79445"],[-95.8633,-89.5675,-95.636,"113.031456 25.794","113.031952 25.79445"],[-82.4307,-91.93,-97.39,"113.03096000000001 25.794449999999998","113.031456 25.7949"],[-83.584,-78.0,-89.2,"113.02848 25.794449999999998","113.028976 25.7949"]]
