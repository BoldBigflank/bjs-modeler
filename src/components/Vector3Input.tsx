import React, { useState, useEffect } from 'react'
import { Form, Input, Accordion, Label } from 'semantic-ui-react'
import { AllShapes, Vector3, Vector3Name } from '../Types'

interface Vector3InputProps {
    vec: Vector3
    name: Vector3Name
    onChanged: (newShape: Partial<AllShapes>) => void
}

function Vector3Input({vec, name, onChanged}: Vector3InputProps) {
    const [x, setX] = useState<string>(`${vec.x}`)
    const [y, setY] = useState<string>(`${vec.y}`)
    const [z, setZ] = useState<string>(`${vec.z}`)
    
    useEffect(() => {
        console.log('Vector3Input useEffect vec updated')
        setX(`${vec.x}`)    
        setY(`${vec.y}`)
        setZ(`${vec.z}`)

    }, [vec])
    const handleOnBlur = () => {
        if (!isNaN(parseFloat(x))) setX(`${vec.x}`)
        if (!isNaN(parseFloat(y))) setY(`${vec.y}`)
        if (!isNaN(parseFloat(z))) setZ(`${vec.z}`)
    }

    const blurOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleOnBlur()
    }

    const handleChange = (axis: 'x'|'y'|'z', value: string) => {
        if (axis === 'x') setX(value)
        if (axis === 'y') setY(value)
        if (axis === 'z') setZ(value)

        if (isNaN(parseFloat(value))) return
        const newVec: Partial<AllShapes> = {}
        newVec[name] = {
            ...vec
        }
        newVec[name]![axis] = parseFloat(value)
        onChanged(newVec)
    }

    return (
        <Form>
            <Label>{name}</Label>
            <Form.Group inline widths={2}>
                <Form.Input
                    fluid
                    label='x'
                    value={x}
                    onKeyDown={blurOnEnter}
                    onChange={(e) => handleChange('x', e.target.value)}
                    onBlur={handleOnBlur}
                />
                <Form.Input
                    fluid
                    label='y'
                    value={y}
                    onKeyDown={blurOnEnter}
                    onChange={(e) => setY(e.target.value)}
                    onBlur={handleOnBlur}
                />
                <Form.Input
                    fluid
                    label='z'
                    value={z}
                    onKeyDown={blurOnEnter}
                    onChange={(e) => setZ(e.target.value)}
                    onBlur={handleOnBlur}
                />
            </Form.Group>
        </Form>
    )
}

export default Vector3Input