import React, { Component } from 'react';
import Sinomap from 'sinomap'
// import china from 'sinomap/resouces/china.json'


class SinomapCom extends Component {
    state = {  }
    componentDidMount(){
        console.log(Sinomap)
    }
    render() {
        return (
            <div id='map' style={{width:600,height:500,border:"1px solid red"}}>

            </div>
        );
    }
}
export default SinomapCom;