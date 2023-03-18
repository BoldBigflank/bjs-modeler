import React, { useState, useEffect, ReactElement } from 'react'
import { Input } from 'semantic-ui-react'
import Vector3Input from './Vector3Input'
import { Vector3, Vector3Name } from '../Types'
import { useStoreState, useStoreActions } from '../store';

interface ShapeDetailProps {
    shapeId: number | undefined
}

function ShapeDetail({ shapeId }: ShapeDetailProps) {
    const { shapes } = useStoreState((state) => state)
    const { updateShape } = useStoreActions((actions) => actions)
    
    const shape = shapes.find((shape) => shape.id === shapeId)
    if (!shape) return (<div>{shapeId}</div>)
    const { position, rotation, scaling, name } = shape

    const displayRotation = rotation ? rotation : { x: 0, y: 0, z: 0 }
    const displayScaling = scaling ? scaling : { x: 1, y: 1, z: 1 }
    
    const onNameChanged = (value: string) => {
        console.log('onShapeChanged', name, value)
        const newShape = {
            ...shape,
            name: value
        }
        updateShape(newShape)
    }

    const onVectorChanged = (name: Vector3Name, value: Vector3) => {
        console.log('onVectorChanged', name, value)
        const newShape = {
            ...shape
        }
        newShape[name] = value
        updateShape(newShape)
    }

    return (
        <div>
            <Input
                label={{content: 'Name'}}
                value={shape.name}
                onChange={(e) => onNameChanged(e.target.value)}
            />
            <Vector3Input vec={position} name="position" onChanged={(v) => onVectorChanged('position', v)} />
            <Vector3Input vec={displayRotation} name="rotation" onChanged={(v) => onVectorChanged('rotation', v)} />
            <Vector3Input vec={displayScaling} name="scaling" onChanged={(v) => onVectorChanged('scaling', v)} />
        </div>
    )
}


export default ShapeDetail