import React, { useState, useEffect, ReactElement } from 'react'
import { Input } from 'semantic-ui-react'
import Vector3Input from './Vector3Input'
import { Shape, BoxShape } from '../Types'

interface ShapeDetailProps {
    shape: Shape
    updateShape: (name: string, value: any) => void
}

function ShapeDetail({ shape, updateShape }: ShapeDetailProps) {
    const [getName, setName] = useState<string>(shape.name)
    const { position, rotation, scaling } = shape

    useEffect(() => {
        setName(shape.name)
    }, [shape])

    const displayRotation = rotation ? rotation : { x: 0, y: 0, z: 0 }
    const displayScaling = scaling ? scaling : { x: 1, y: 1, z: 1 }
    
    return (
        <div>
            <Input
                label={{content: 'Name'}}
                value={getName}
                onChange={(e) => updateShape('name', e.target.value)}
            />
            <Vector3Input vec={position} name="position" updateShape={updateShape} />
            <Vector3Input vec={displayRotation} name="rotation" updateShape={updateShape} />
            <Vector3Input vec={displayScaling} name="scaling" updateShape={updateShape} />
        </div>
    )
}


export default ShapeDetail