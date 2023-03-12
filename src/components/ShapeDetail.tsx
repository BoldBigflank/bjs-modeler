import React, { ReactElement } from 'react'
import BoxListItem from './BoxListItem'
import { Shape, BoxShape } from '../Types'

interface ShapeDetailProps {
    shape: Shape
}

function ShapeDetail({ shape }: ShapeDetailProps) {
    if (!shape) return (
        <div>Shape Details</div>
    )
    return (
        <BoxListItem {...shape as BoxShape} ></BoxListItem>
    )
}

export default ShapeDetail