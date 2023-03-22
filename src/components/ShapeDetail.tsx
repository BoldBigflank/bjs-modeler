import React, { useState, useEffect, ReactElement } from 'react'
import { Input } from 'semantic-ui-react'
import Vector3Input from './Vector3Input'
import { Shape, BoxShape, Vector3, Vector3Name, SphereShape, AllShapes } from '../Types'
import { useStoreState, useStoreActions } from '../store';

interface ShapeDetailProps {
    shapeId: number | undefined
}

// Type Guards
const isBoxShape = (shape: Shape): shape is BoxShape => shape.type === 'box'
const isSphereShape = (shape: Shape): shape is SphereShape => shape.type === 'sphere'

function ShapeDetail({ shapeId }: ShapeDetailProps) {
    const { shapes } = useStoreState((state) => state)
    const { updateShape } = useStoreActions((actions) => actions)
    
    const shape = shapes.find((shape) => shape.id === shapeId)
    if (!shape) return (<div>{shapeId}</div>)
    const { position, rotation, scaling, name } = shape

    const displayRotation = rotation ? rotation : { x: 0, y: 0, z: 0 }
    const displayScaling = scaling ? scaling : { x: 1, y: 1, z: 1 }

    const onShapeChanged = (newShapeData: Partial<AllShapes>) => {
        const newShape = {
            ...shape,
            ...newShapeData
        }
        updateShape(newShape)
    }

    return (
        <div>
            <Input
                label={{content: 'Name'}}
                value={shape.name}
                onChange={(e) => onShapeChanged({name: e.target.value})}
            />
            <Vector3Input vec={position} name="position" onChanged={onShapeChanged} />
            <Vector3Input vec={displayRotation} name="rotation" onChanged={onShapeChanged} />
            <Vector3Input vec={displayScaling} name="scaling" onChanged={onShapeChanged} />
            { isBoxShape(shape) &&
                <Input
                label={{content: 'Size'}}
                value={shape.size}
                onChange={(e) => onShapeChanged({ size: parseFloat(e.target.value) })}
            />
            }
            { isSphereShape(shape) && 
                <Input
                label={{content: 'Diameter'}}
                value={shape.diameter}
                onChange={(e) => onShapeChanged({ diameter: parseFloat(e.target.value) })
            }
            />
            }
        </div>
    )
}


export default ShapeDetail