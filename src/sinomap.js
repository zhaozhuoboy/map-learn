import React, { Component } from 'react';
import axios from 'axios'
import './sinomap.css'


class SinomapCom extends Component {
    state = {  }
    componentDidMount(){
        let awt = this.test()
        awt.then(res=>console.log('res===>',res))
        let promise = new Promise((resolve,reject) =>{
            let flat = true;
            if(flat){
                resolve('success')
            }else{
                reject( new Error({msg:"error"}))
            }
        })
        promise.then(res => {
            throw new Error('错误')
        })
               .catch(err => console.log(err))


    }
    async test(x){
        let a = await this.request('one');
        // let b = await this.request('two');
        // return x+ a.data.data + b.data.data
        return axios.post('http://localhost:1100/post',{data:a.data.data})
    }
    request=(str)=>{
        return axios.get(`http://localhost:1100/${str}`)
    }
    
    render() {
        
        return (
            <div className='wrap'>
                <div className="top"></div>
                <div className="bottom">
                    <div className="box red-box">
                        <a href='#' id="two">asdfawsdf</a>
                    </div>
                    <div className="box white">
                        <span id='two'></span>
                    </div>
                    <div className="box"></div>
                </div>
            </div>
        );
    }
}
export default SinomapCom;