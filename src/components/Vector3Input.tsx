import React, { useState, Dispatch } from 'react'
import { Input, Accordion } from 'semantic-ui-react'
import { Vector3 } from '../Types'

interface Vector3InputProps {
    vec: Vector3
    name: string
    onChange: (event:React.FormEvent<HTMLInputElement>) => void
}

// Needs a name and an onchange prop
function Vector3Input({vec, name, onChange}: Vector3InputProps) {
    const [x, setX] = useState<number>(vec.x)
    const [y, setY] = useState<number>(vec.y)
    const [z, setZ] = useState<number>(vec.z)
    
    const handleChange = (stateVar: Dispatch<number>, val: string) => {
        if (isNaN(parseFloat(val))) return
        stateVar(parseFloat(val))
    }

    return (
        <Accordion
            defaultActiveIndex={-1}
            panels={[{
                key: '0',
                title: `${name}: ${vec.x}, ${vec.y}, ${vec.z}`,
                content: {
                    content: (
                        <div>
                        <Input
                            label='x'
                            value={x}
                            onChange={(e) => handleChange(setX, e.target.value)}
                            fluid
                        />
                        <Input
                            label='y'
                            value={y}
                            onChange={(e) => handleChange(setY, e.target.value)}
                            fluid
                        />
                        <Input
                            label='z'
                            value={z}
                            onChange={(e) => handleChange(setZ, e.target.value)}
                            fluid
                        />
                        </div>
                    )
                }
            }]}
        />
    )
}

export default Vector3Input