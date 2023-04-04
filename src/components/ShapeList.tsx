import React, { ReactElement } from 'react'
import { Button, Icon, List } from 'semantic-ui-react'
import { Shape, AllShapes } from '../Types'
import { useStoreState, useStoreActions } from '../store';


interface ShapeListProps {
    activeId: number
    setActiveId: (index: number) => void
}

const iconForType: Record<string,string> = {
    box: 'cube',
    sphere: 'circle',
    ref: 'arrow right',
    cylinder: 'database'
}

function ShapeList({ activeId, setActiveId }: ShapeListProps) {
    const { shapes } = useStoreState((state) => state)
    const { removeShape } = useStoreActions((actions) => actions);

    const onDeleteClick = (child: AllShapes) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm(`Are you sure you want to delete ${child.name}?`)
        if (confirmed) removeShape(child)
    }

    const items = shapes.map((child, index) => {
        const icon = iconForType[child.type] || 'question'
        const handleItemClick = () => {
            if (activeId === child.id) setActiveId(-1)
            else setActiveId(child.id)
            console.log('setting active Id', child.id)
        }
        return (
            <button
                className={`shapeListItem ${child.id===activeId ? 'active' : ''}`}
                key={child.id}
                onClick={handleItemClick}
            >
                <Icon name={icon} />
                {child.id}: {child.type} - {child.name}
                <button className='delete' onClick={() => onDeleteClick(child)}>
                    <Icon size='small' fitted name="trash" />
                </button>
            </button>
        )
    })

    return (
        <div className="shapeList">
            {items}
        </div>
    )
}

export default ShapeList