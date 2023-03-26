import React, { useEffect, useRef } from 'react'
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { CreateBox, CreateSphere, CreateCylinder, TexturedMaterial } from '../utilities/RenderUtil'
import { AllShapes, BoxShape, SphereShape, CylinderShape, RefShape, isRefShape, isBoxShape, isSphereShape, isCylinderShape } from '../Types'

interface RendererProps {
    shapes: AllShapes[]
    activeId?: number
}

function Renderer({ shapes, activeId }: RendererProps) {
    const canvasRef = useRef(null)
    const scene = useRef<BABYLON.Scene|null>(null)
    const engine = useRef<BABYLON.Engine|null>(null)
    const sceneObjects = useRef<BABYLON.Mesh[]>([])
    const gizmoManager = useRef<BABYLON.GizmoManager|null>(null)
    let tempGizmoValue: number

    // Initial
    useEffect(() => {
        if (engine.current) return
        engine.current = new BABYLON.Engine(canvasRef.current, true)
        createScene()
        renderShapes()
        engine.current.runRenderLoop(function () {
            if (!scene.current) return
            scene.current.render();
        })
    }, [])

    // Update
    useEffect(() => {
        renderShapes()
    }, [shapes])

    const resolveRefs = (shape: AllShapes): AllShapes => {
        if (shape.type !== 'ref') return shape
        if (shape.ref < 0 || isNaN(shape.ref)) return shape
        const refShape = shapes.find((c) => c.id === shape.ref)
        if (!refShape) return shape
        if (refShape.id === shape.id) return shape
        let resolvedShape = {
            ...refShape,
            ...shape,
            type: refShape.type,
        }
        if (isRefShape(refShape)) resolvedShape.ref = refShape.ref
        return resolveRefs(resolvedShape)
    }

    const renderShapes = () => {
        if (!scene.current) return
        // Clean out old ones
        sceneObjects.current.forEach((o) => {
            o.dispose()
        })
        sceneObjects.current = []
        // Make new ones
        shapes.forEach((shape, i) => {
            const resolvedShape = resolveRefs(shape)
            if (isBoxShape(resolvedShape)) {
                const mesh = CreateBox(resolvedShape as BoxShape, scene.current)
                sceneObjects.current.push(mesh)
                if (shape.id === activeId) gizmoManager.current?.attachToMesh(mesh)
            }
            if (isSphereShape(resolvedShape)) {
                const mesh = CreateSphere(resolvedShape as SphereShape, scene.current)
                sceneObjects.current.push(mesh)
                if (shape.id === activeId) gizmoManager.current?.attachToMesh(mesh)
            }
            if (isCylinderShape(resolvedShape)) {
                const mesh = CreateCylinder(resolvedShape as CylinderShape, scene.current)
                sceneObjects.current.push(mesh)
                if (shape.id === activeId) gizmoManager.current?.attachToMesh(mesh)
            }
            
            // If it's selected, shape.showBoundingBox = true;
        })
        
        // TODO: Highlighting meshes https://doc.babylonjs.com/features/featuresDeepDive/mesh/highlightLayer
        
    }
    const createScene = () => {
        if (!engine.current) {
            return
        }
        const canvas = canvasRef.current
        if (!scene.current) {
            scene.current = new BABYLON.Scene(engine.current!)
        }
        if (!gizmoManager.current) {
            gizmoManager.current = new BABYLON.GizmoManager(scene.current);
            gizmoManager.current.usePointerToAttachGizmos = false;
            gizmoManager.current.positionGizmoEnabled = true;
            gizmoManager.current.gizmos.positionGizmo?.xGizmo.dragBehavior.onDragStartObservable.add(() => {
                console.log('started')
                tempGizmoValue = gizmoManager.current!.gizmos.positionGizmo!.attachedMesh!.position.x
            })
            gizmoManager.current.gizmos.positionGizmo?.xGizmo.dragBehavior.onDragEndObservable.add((s) => {
                tempGizmoValue = gizmoManager.current!.gizmos.positionGizmo!.attachedMesh!.position.x - tempGizmoValue // B - A
                console.log('ended', tempGizmoValue)
            })
        }
        const camera = new BABYLON.ArcRotateCamera('camera1',
        Math.PI * 3 / 2, // a
        Math.PI / 4, // b
        24,
        new BABYLON.Vector3(0, 4, 0),
        scene.current
        )
        camera.wheelPrecision = 32;
        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(canvas, true)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene.current)
        light.intensity = 0.7
        light.diffuse = new BABYLON.Color3(1, 0.9, 0.8);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.groundColor = new BABYLON.Color3(.3, .2, .1);
        
        BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene.current);

        // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene.current);
        // sphere.position.y = 1
        // TexturedMaterial('#ff0000ff', '#c0c0c0ff', 100, scene.current).then((texMat) => {
        //     sphere.material = texMat
        // })
        
        // DEBUG
            // scene.current.debugLayer.show();
    }
    return (
        <canvas
            id="renderCanvas"
            className="renderCanvas"
            ref={canvasRef}
            width={480}
            height={480}
        />
    )
}

export default Renderer