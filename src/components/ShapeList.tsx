import React, { ReactElement } from 'react'
import { Button, Icon, Accordion, List } from 'semantic-ui-react'
import BoxListItem from './BoxListItem'
import { Shape, BoxShape } from '../Types'

interface ShapeListProps {
    shapes: Shape[]
    activeIndex: number
    deleteShape: (id: number) => void
    setActiveIndex: (index: number) => void
}

function ShapeList({ shapes, activeIndex, setActiveIndex: setActiveIndex, deleteShape }: ShapeListProps) {
    const items = shapes.map((child, index) => {
        let content: ReactElement|null = null
        let icon: string = child.type || 'arrow'
        content = (
            <div>
                {child.type} - {child.name}
            </div>
        )
        if (child.type === 'box') {
            icon = 'cube'
        }
        const handleItemClick = () => {
            if (activeIndex === index) setActiveIndex(-1)
            else setActiveIndex(index)
        }
        return (
            <List.Item 
                active={index===activeIndex}
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