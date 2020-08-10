import React from 'react';
import { DragSource } from 'react-dnd';
import './source.scss';

const components = [
    'Name',
    'input',
    'Checkbox',
    'Select',
    'Button'
 ]

 

const Source = () =>{
    return(
        <div className="source">
            <ul>
             {
                 components.map((component, idx)=>{
                     return <ListItem key={`${component}_${idx}`}
                     component={component}/>
                 })
             }
            </ul>
        </div>
             
    )
}

const spec = {
    beginDrag(props, monitor, component) {
        // { component: 'input' }
        const item = { ...props};
        return item;
    }
};

const collect = (connect, monitor)=>{
  return {
    connectDragSource: connect.dragSource()
  };
}


const ListItem = DragSource("form-elements",spec,collect)(props=>{
    const { connectDragSource, component } = props;
    return connectDragSource(<li>{component}</li>)
});


export default Source