import React, { useState, useEffect, ReactElement } from 'react'
import { Input } from 'semantic-ui-react'
import Vector3Input from './Vector3Input'
import { Shape, RefShape, BoxShape, Vector3, Vector3Name, SphereShape, AllShapes, isBoxShape, isSphereShape, isRefShape, isCylinderShape } from '../Types'
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

    const onShapeChanged = (newShapeData: Partial<AllShapes>) => {
        // TODO: Research TS object union. I think it's sad bc it's defining the
        // fields multiple times
        const newShape: AllShapes = {
            ...shape,
            ...newShapeData
        }
        updateShape(newShape)
    }

    return (
        <div>
            <div>id: {shape.id}</div>
            <Input
                label={{content: 'Name'}}
                value={shape.name}
                onChange={(e) => onShapeChanged({name: e.target.value})}
            />
            <Vector3Input key={`pos-${shape.id}`} vec={position} name="position" onChanged={onShapeChanged} />
            <Vector3Input key={`rot-${shape.id}`} vec={displayRotation} name="rotation" onChanged={onShapeChanged} />
            <Vector3Input key={`sca-${shape.id}`} vec={displayScaling} name="scaling" onChanged={onShapeChanged} />
            { isRefShape(shape) && 
                <Input
                    label={{content: 'Ref'}}
                    value={shape.ref}
                    onChange={(e) => onShapeChanged({ ref: parseInt(e.target.value)})}
                />
            }
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
                    onChange={(e) => onShapeChanged({ diameter: parseFloat(e.target.value) })}
                />
            }
            { isCylinderShape(shape) &&
                <>
                    <Input
                        label={{content: 'Height'}}
                        value={shape.height}
                        onChange={(e) => onShapeChanged({ height: parseFloat(e.target.value) })}
                    />
                    <Input
                        label={{content: 'Diameter'}}
                        value={shape.diameter}
                        onChange={(e) => onShapeChanged({ diameter: parseFloat(e.target.value) })}
                    />
                    <Input
                        label={{content: 'Diamater Top'}}
                        value={shape.diameterTop}
                        onChange={(e) => onShapeChanged({ diameterTop: parseFloat(e.target.value) })}
                    />
                    <Input
                        label={{content: 'Tessellation'}}
                        value={shape.tessellation}
                        onChange={(e) => onShapeChanged({ tessellation: parseFloat(e.target.value) })}
                    />
                </>
            }
        </div>
    )
}


export default ShapeDetail