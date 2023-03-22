// Common Props
export interface Vector3 {
    x: number
    y: number
    z: number
}

export type Vector3Name = 'position' | 'rotation' | 'scaling'

export interface Shape {
    id: number
    type: string
    name: string
    position: Vector3
    rotation?: Vector3
    scaling?: Vector3
    children?: AllShapes[]
}

export interface RefShape extends Shape {
    type: 'ref'
    ref: number
}

export interface BoxShape extends Shape {
    type: 'box'
 
    wrap?: boolean
    height?: number
    width?: number
    depth?: number
    size?: number
}

export interface SphereShape extends Shape {
    type: 'sphere'
    diameter?: number
    diameterX?: number
    diameterY?: number
    diameterZ?: number
    segments?: number
    arc?: number
    slice?: number
    updatable?: boolean
    sideOrientation?: number
}

export type AllShapes = RefShape | BoxShape | SphereShape
// export interface Jar {
//     orientation: number
//     mesh: InteractiveMesh
// }

// export interface Tile {
//     face: number
//     slot: number
//     mesh: InteractiveMesh
// }

// export interface InteractiveMesh extends BABYLON.Mesh {
//     onPointerPick?: (pointerInfo: BABYLON.PointerInfo) => void
// }

// export interface MeshOpts {
//     baseColor?: BABYLON.Color4
//     rippleColor?: BABYLON.Color4
//     frozen?: boolean
// }

// Type Guards
export const isRefShape = (shape: Shape): shape is RefShape => shape.type === 'ref'
export const isBoxShape = (shape: Shape): shape is BoxShape => shape.type === 'box'
export const isSphereShape = (shape: Shape): shape is SphereShape => shape.type === 'sphere'
