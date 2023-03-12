import React from 'react'
import { Input } from 'semantic-ui-react'
import Vector3Input from './Vector3Input'
import { BoxShape } from '../Types'

function BoxListItem({ name, position, rotation, scaling }: BoxShape) {
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.log('onChange', event)
    }

    const displayRotation = rotation ? rotation : { x: 0, y: 0, z: 0 }
    const displayScaling = scaling ? scaling : { x: 1, y: 1, z: 1 }

    return (
        <div>
            <Input
                label={{content: 'Name'}}
                value={name}
            />
            <Vector3Input vec={position} name="Position" onChange={onChange} />
            <Vector3Input vec={displayRotation} name="Rotation" onChange={onChange} />
            <Vector3Input vec={displayScaling} name="Scaling" onChange={onChange} />
        </div>
    )
}

export default BoxListItem