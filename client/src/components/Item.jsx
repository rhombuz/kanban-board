import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Window from './Window';
import ITEM_TYPE from '../data/types';

const Item = ({ item, index, moveItem, status }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            // Get the item and column index
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = ref.current.getBoundClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            // if item isn't dragged above or below enough, do nothing
            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY < hoverMiddleY)) {
                return;
            }

            // change item in column based on drag
            moveItem(dragItem, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: { type: ITEM_TYPE, ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    // For opening and closing of the tasks
    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);
    const onClose = () => setShow(false);

    // Connect drag and drop with current DOM element ref
    drag(drop(ref));

    return(
        <>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className="item"
                onClick={onOpen}
            >
                <div className="color-bar" style={{ backgroundColor: status.color }} />
                <p className="item-title">{item.content}</p>
                <p className="item-status">{item.icon}</p>
            </div>

            <Window
                item={item}
                onClose={onClose}
                show={show}
            />
        </>
    );
}

export default Item;