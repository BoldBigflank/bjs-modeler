import { Shape, BoxShape } from '../Types'
import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export const RenderMeshJSON = (json: string, scene: BABYLON.Scene) => {
    RenderMeshes(JSON.parse(json), scene)
}

export const RenderMeshes = (meshes: Shape[], scene: BABYLON.Scene) => {
    meshes.forEach((mesh, i) => {
        if (mesh.type === 'box') {
            CreateBox(mesh as BoxShape, scene)
        }
        // The rest of the shapes

    })
}

export const CreateBox = ({ 
        name,
        type,
        position,
        rotation,
        scaling,
        height,
        width,
        depth,
        size
    }: BoxShape, scene: BABYLON.Scene|null): BABYLON.Mesh => {
        const boxProps: BoxShape = {
            name,
            type,
            position,
            wrap: true
        }
        if (height !== undefined) boxProps.height = height
        if (width !== undefined) boxProps.width = width
        if (depth !== undefined) boxProps.depth = depth
        if (size !== undefined) boxProps.size = size

    const box = BABYLON.MeshBuilder.CreateBox(name, boxProps, scene)
    if (position) {
        box.position = new BABYLON.Vector3(position.x, position.y, position.z)
    }
    if (rotation) {
        box.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z)
    }
    if (scaling)  {
        box.scaling = new BABYLON.Vector3(scaling.x, scaling.y, scaling.z)
    }
    return box
}