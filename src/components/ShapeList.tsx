import React, { ReactElement } from 'react'
import { Button, Icon, List } from 'semantic-ui-react'
import { Shape } from '../Types'
import { useStoreState, useStoreActions } from '../store';


interface ShapeListProps {
    activeId: number
    setActiveId: (index: number) => void
}

function ShapeList({ activeId, setActiveId: setActiveId }: ShapeListProps) {
    const { shapes } = useStoreState((state) => state)
    const { removeShape } = useStoreActions((actions) => actions);

    const onDeleteClick = (child: Shape) => {
        const confirmed = confirm(`Are you sure you want to delete ${child.name}?`)
        if (confirmed) removeShape(child)
    }

    const items = shapes.map((child, index) => {
        let content: ReactElement|null = null
        let icon: string = child.type || 'arrow'
        content = (
            <div>
                {child.id}: {child.type} - {child.name}
                <Button compact floated='right' icon onClick={() => onDeleteClick(child)}>
                    <Icon name="trash" />
                </Button>
            </div>
        )
        if (child.type === 'box') {
            icon = 'cube'
        }
        const handleItemClick = () => {
            if (activeId === child.id) setActiveId(-1)
            else setActiveId(child.id)
        }
        return (
            <List.Item 
                active={child.id===activeId}
                key={index}
                icon={icon}
                content={content} 
                onClick={handleItemClick}
            />
        )
    })

    return (
        <List
            items={items}
            exclusive={false}
            styled
            fluid
            selection
        />
    )
}

export default ShapeList