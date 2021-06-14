import React, { useState } from "react";
import { data, statuses } from "../data";
import DropWrapper from '../components/DropWrapper';
import Col from '../components/Col';
import Item from '../components/Item';

const Homepage = () => {
    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(statusItem => statusItem.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(selectedItem => selectedItem.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];

        setItems(prevState => {
            const newItems = prevState.filter((selectedItem, index) => index != dragIndex);
            newIndex.splice(hoverIndex, 0, item);
            return [ ...newItems ];
        });
    };

    return (
        <div className="row">
            {statuses.map(statusCol => {
                return (
                    <div key={statusCol.status} className="col-wrapper">
                        <h2 className="col-header">{statusCol.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={statusCol.status}>
                            <Col>
                                {items
                                    .filter(item => item.status === statusCol.status)
                                    .map((item, idx) => <Item key={item.id} item={item} index={idx} moveItem={moveItem} status={statusCol} />)
                                }
                            </Col>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
    );
};

export default Homepage;