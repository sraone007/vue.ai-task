import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import './target.scss';

class Target extends Component{
    render(){
        console.log('this.props ', this.props)
        const { connectDropTarget, components, handleSave, handleClear } = this.props;
        
        console.log('dropped components ', components)
        return(
            connectDropTarget(
               
            <div className="main">
                <div className="target-box">
                    {
                    
                    components.map((data,idx)=>{
                        let html = '';
                        console.log(data);
                        if(data.component === 'Name'){
                            html='<h2> Vue.ai  Task</h2>'
                        }
                        else if(data.component === 'input'){
                            html = '<input type="text" placeholder="Enter any Text" draggable="true" />'
                        }else if(data.component === 'Checkbox'){
                            html = '<input type="checkbox"> Remember Me</input>'
                        }else if(data.component === 'Button'){
                            html = '<button>Submit</button>'
                        }else if(data.component === 'Select'){
                            html = '<select><option>Option 1</option><option>Option 2</option></select>'
                        }else {
                            html='<span></span>'
                        }
                        return <div dangerouslySetInnerHTML={{__html:html}} className="target-items" key={`${data}-${idx}`}></div>
                    })
                    }
                </div>
                
                <div className="btn-box">
                    <button onClick={handleSave} className="btn btn-left">Save</button> 
                    <button onClick={handleClear} className="btn btn-right">Clear</button>
                </div>
            
            </div>
            )
        )
    }
}

const spec = {
    drop(props, monitor, component){
        const item = monitor.getItem()
        console.log(item);
        props.onDrop(item)
    }
}
const collect = (connect, monitor)=>{
  return {
      connectDropTarget: connect.dropTarget(),
  };
}

export default DropTarget('form-elements', spec, collect)(Target);