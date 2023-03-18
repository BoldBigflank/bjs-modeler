import React, { useState, useEffect } from 'react'
import { Input, Accordion } from 'semantic-ui-react'
import { Vector3 } from '../Types'

interface Vector3InputProps {
    vec: Vector3
    name: string
    onChanged: (value: Vector3) => void
}

function Vector3Input({vec, name, onChanged}: Vector3InputProps) {
    const [x, setX] = useState<string>(`${vec.x}`)
    const [y, setY] = useState<string>(`${vec.y}`)
    const [z, setZ] = useState<string>(`${vec.z}`)
    
    const handleOnBlur = () => {
        if (isNaN(parseFloat(x))) setX(`${vec.x}`)
        if (isNaN(parseFloat(y))) setX(`${vec.y}`)
        if (isNaN(parseFloat(z))) setX(`${vec.z}`)
    }

    const blurOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleOnBlur()
    }

    // Changes coming from parent
    useEffect(() => {
        setX(`${vec.x}`)
        setY(`${vec.y}`)
        setZ(`${vec.z}`)
    }, [vec])

    // Changes coming from user input
    useEffect(() => {
        if (isNaN(parseFloat(x))) return
        if (isNaN(parseFloat(y))) return
        if (isNaN(parseFloat(z))) return
        onChanged({x: parseFloat(x), y: parseFloat(y), z: parseFloat(z)})
    }, [x, y, z])

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
                            onKeyDown={blurOnEnter}
                            onChange={(e) => setX(e.target.value)}
                            onBlur={handleOnBlur}
                            fluid
                        />
                        <Input
                            label='y'
                            value={y}
                            onKeyDown={blurOnEnter}
                            onChange={(e) => setY(e.target.value)}
                            onBlur={handleOnBlur}
                            fluid
                        />
                        <Input
                            label='z'
                            value={z}
                            onKeyDown={blurOnEnter}
                            onChange={(e) => setZ(e.target.value)}
                            onBlur={handleOnBlur}
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