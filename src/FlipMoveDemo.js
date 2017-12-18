import React from 'react';
import FlipMove from 'react-flip-move';

class FlipMoveDemo extends React.Component{
    constructor(props){
        super()
        this.state={
            list:[1,2,3]
        }
    }
    renderRows=()=>{
        return this.state.list.map((item,index)=>{
            return <li>{item}</li>
        })
    }
    clickButton=()=>{
        let {list } = this.state;
        list.push(1);
        this.setState({list})
    }
    render(){
        return(
            <div>
                <div>
            <button onClick={this.clickButton}>add</button>

                </div>
                <div>
                    <FlipMove
                        staggerDelayBy={150}
                        enterAnimation="elevator" leaveAnimation="elevator" 
                    >
                        {this.renderRows()}
                    </FlipMove>
                </div>
            </div>
        )
    }
}

export default FlipMoveDemo;