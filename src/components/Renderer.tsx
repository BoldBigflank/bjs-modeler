import React, { useState, useEffect, useRef } from 'react'
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { CreateBox, CreateSphere, CreateCylinder, TexturedMaterial } from '../utilities/RenderUtil'
import { AllShapes, BoxShape, SphereShape, CylinderShape, RefShape, isRefShape, isBoxShape, isSphereShape, isCylinderShape } from '../Types'
import { useStoreState, useStoreActions } from 'src/store';

interface RendererProps {
    activeId: number
}

function Renderer({ activeId }: RendererProps) {
    const { shapes } = useStoreState((state) => state)
    const { updateShape } = useStoreActions((actions) => actions);
    const canvasRef = useRef(null)
    const scene = useRef<BABYLON.Scene|null>(null)
    const engine = useRef<BABYLON.Engine|null>(null)
    const sceneObjects = useRef<BABYLON.Mesh[]>([])
    const gizmoManager = useRef<BABYLON.GizmoManager|null>(null)
    const [positionGizmoEndObservable, setPositionGizmoEndObservable] = useState<BABYLON.Nullable<BABYLON.Observer<unknown>> | undefined>(null)
    let startRotation: BABYLON.Vector3
    let startScaling: BABYLON.Vector3

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

        window.addEventListener('resize', () => {
            engine.current?.resize()
        })
    }, [])

    // Update
    useEffect(() => {
        renderShapes()
    }, [shapes, activeId])

    useEffect(() => {
        listenToActiveShape()
    }, [activeId])

    const resolveRefs = (shape: AllShapes): AllShapes => {
        if (shape.type !== 'ref') return shape
        if (shape.ref < 0 || isNaN(shape.ref)) return shape
        const refShape = shapes.find((c) => c.id === shape.ref)
        if (!refShape) return shape
        if (refShape.id === shape.id) return shape
        const resolvedShape = {
            ...refShape,
            ...shape,
            type: refShape.type,
        }
        if (isRefShape(refShape)) resolvedShape.ref = refShape.ref
        return resolveRefs(resolvedShape)
    }

    const listenToActiveShape = () => {
        if (!gizmoManager.current) return
        if (positionGizmoEndObservable) gizmoManager.current.gizmos.positionGizmo?.onDragEndObservable.remove(positionGizmoEndObservable)

        setPositionGizmoEndObservable(gizmoManager.current.gizmos.positionGizmo?.onDragEndObservable.add(endDragging))
    }

    const renderShapes = () => {
        if (!scene.current) return
        // Clean out old ones
        sceneObjects.current.forEach((o) => {
            o.dispose()
        })
        sceneObjects.current = []
        if (gizmoManager.current) gizmoManager.current.positionGizmoEnabled = (activeId !== -1)
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

    const endDragging = () => {
        if (activeId < 0) return // There's a rogue listener that keeps showing up
        const endPosition = gizmoManager.current!.gizmos.positionGizmo!.attachedMesh!.position.clone()
        const activeShape = shapes.find((shape) => shape.id === activeId)
        if (!activeShape) console.error('endDragging - No active shape found', activeId)
        if (!activeShape) return
        console.log('endDragging - successful', activeShape)
        updateShape({
            ...activeShape,
            position: {
                x: Math.round(endPosition.x),
                y: Math.round(endPosition.y),
                z: Math.round(endPosition.z)
            }
        })
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
        }
        const camera = new BABYLON.ArcRotateCamera("camera1", 
        Math.PI * 3 / 2, // a
        Math.PI / 4, // b
        24,
        new BABYLON.Vector3(0, 6, 0), scene.current);
        camera.upperBetaLimit = 89 * Math.PI / 180;
        camera.wheelPrecision = 32;
        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(canvas, true)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene.current)
        light.intensity = 0.7
        light.diffuse = new BABYLON.Color3(1, 0.9, 0.8);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.groundColor = new BABYLON.Color3(.3, .2, .1);
        
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene.current);
        ground.position.y = -0.01;

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
        />
    )
}

export default Renderer