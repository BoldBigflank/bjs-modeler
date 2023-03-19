import { Shape, BoxShape, SphereShape } from '../Types'
import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export const RenderMeshJSON = (json: string, scene: BABYLON.Scene) => {
    RenderMeshes(JSON.parse(json), scene)
}

export const RenderMeshes = (meshes: Shape[], scene: BABYLON.Scene) => {
    meshes.forEach((mesh, i) => {
        switch(mesh.type) {
            case 'box':
                CreateBox(mesh as BoxShape, scene)
                break
            case 'sphere':
                CreateSphere(mesh as SphereShape, scene)
                break
            // The rest of the shapes
            default:
                break
        }
    })
}

export const CreateBox = ({ 
        id,
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
        const boxOptions: BoxShape = {
            id,
            name,
            type,
            position,
            wrap: true
        }
        if (height !== undefined) boxOptions.height = height
        if (width !== undefined) boxOptions.width = width
        if (depth !== undefined) boxOptions.depth = depth
        if (size !== undefined) boxOptions.size = size

    const mesh = BABYLON.MeshBuilder.CreateBox(name, boxOptions, scene)
    if (position) {
        mesh.position = new BABYLON.Vector3(position.x, position.y, position.z)
    }
    if (rotation) {
        mesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z)
    }
    if (scaling)  {
        mesh.scaling = new BABYLON.Vector3(scaling.x, scaling.y, scaling.z)
    }
    return mesh
}

export const CreateSphere = ({ 
    id,
    name,
    type,
    position,
    rotation,
    scaling,
    diameter
}: SphereShape, scene: BABYLON.Scene|null): BABYLON.Mesh => {
    const sphereOptions: SphereShape = {
        id,
        name,
        type,
        position
    }
    if (diameter !== undefined) sphereOptions.diameter = diameter

const mesh = BABYLON.MeshBuilder.CreateSphere(name, sphereOptions, scene)
if (position) {
    mesh.position = new BABYLON.Vector3(position.x, position.y, position.z)
}
if (rotation) {
    mesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z)
}
if (scaling)  {
    mesh.scaling = new BABYLON.Vector3(scaling.x, scaling.y, scaling.z)
}
return mesh
}