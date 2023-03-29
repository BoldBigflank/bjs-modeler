import { Shape, BoxShape, SphereShape, CylinderShape } from '../Types'
import * as BABYLON from '@babylonjs/core/Legacy/legacy';

export const TexturedMaterial = async (color1: string, color2: string, scale: number, scene: BABYLON.Scene|undefined) => {
    const nodeMaterial = await BABYLON.NodeMaterial.ParseFromSnippetAsync("#87Y2T8#2", scene)
    const inputBlocks = nodeMaterial.getInputBlocks()
    inputBlocks.forEach((inputBlock) => {
        if (inputBlock.name === 'color1') inputBlock.value = BABYLON.Color4.FromHexString(color1)
        if (inputBlock.name === 'color2') inputBlock.value = BABYLON.Color4.FromHexString(color2)
        if (inputBlock.name === 'scale') inputBlock.value = scale
    })
    
    return nodeMaterial
}

let _tempTexMat: BABYLON.Material|null = null
const tempTexMat = async (): Promise<BABYLON.Material> => {
    if (_tempTexMat) return _tempTexMat
    const nodeMaterial = await TexturedMaterial('#ffffff', '#dddddd', 15, undefined)
    _tempTexMat = nodeMaterial
    return _tempTexMat
}

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
            case 'cylinder':
                CreateCylinder(mesh as CylinderShape, scene)
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

    tempTexMat().then((tempTexMat) => {
        mesh.material = tempTexMat
    })
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
    tempTexMat().then((tempTexMat) => {
        mesh.material = tempTexMat
    })
    return mesh
}

export const CreateCylinder = ({
    id,
    name,
    type,
    position,
    rotation,
    scaling,
    height,
    diameterTop,
    diameterBottom,
    diameter,
    tessellation,
    subdivisions,
    arc,
    hasRings,
    enclose,
    sideOrientation,
}: CylinderShape, scene: BABYLON.Scene|null): BABYLON.Mesh => {
    const cylinderOptions: CylinderShape = {
        id,
        name,
        type,
        position
    }
    
    if (height !== undefined) cylinderOptions.height = height
    if (diameterTop !== undefined) cylinderOptions.diameterTop = diameterTop
    if (diameterBottom !== undefined) cylinderOptions.diameterBottom = diameterBottom
    if (diameter !== undefined) cylinderOptions.diameter = diameter
    if (tessellation !== undefined) cylinderOptions.tessellation = tessellation
    if (subdivisions !== undefined) cylinderOptions.subdivisions = subdivisions
    if (arc !== undefined) cylinderOptions.arc = arc
    if (hasRings !== undefined) cylinderOptions.hasRings = hasRings
    if (enclose !== undefined) cylinderOptions.enclose = enclose
    if (sideOrientation !== undefined) cylinderOptions.sideOrientation = sideOrientation

    const mesh = BABYLON.MeshBuilder.CreateCylinder(name, cylinderOptions, scene)
    if (position) {
        mesh.position = new BABYLON.Vector3(position.x, position.y, position.z)
    }
    if (rotation) {
        mesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z)
    }
    if (scaling)  {
        mesh.scaling = new BABYLON.Vector3(scaling.x, scaling.y, scaling.z)
    }
    tempTexMat().then((tempTexMat) => {
        mesh.material = tempTexMat
    })
    return mesh
}