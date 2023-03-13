import React, { ReactElement } from 'react'
import { Button, Icon, List } from 'semantic-ui-react'
import { Shape, BoxShape } from '../Types'

interface ShapeListProps {
    shapes: Shape[]
    activeId: number
    deleteShape: (id: number) => void
    setActiveId: (index: number) => void
}

function ShapeList({ shapes, activeId, setActiveId: setActiveId, deleteShape }: ShapeListProps) {
    const items = shapes.map((child, index) => {
        let content: ReactElement|null = null
        let icon: string = child.type || 'arrow'
        content = (
            <div>
                {child.type} - {child.name}
                <Button compact floated='right' icon onClick={() => deleteShape(index)}>
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