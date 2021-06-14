import React from 'react';
import { useDrop } from 'react-dnd';
import ITEM_TYPE from '../data/types';
import { statuses } from '../data';

const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statuses.findIndex(statusItem => statusItem.status === item.status);
            const statusIndex = statuses.findIndex(statusItem => statusItem.status === status);
            // can drop only items to same or +/- 1 column
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className="drop-wrapper">
            {React.cloneElement(children, { isOver })}
        </div>
    )
}

export default DropWrapper;
