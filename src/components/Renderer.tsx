import React, { useEffect, useRef } from 'react'
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import { CreateBox } from '../utilities/RenderUtil'
import { Shape, BoxShape } from '../Types'

interface RendererProps {
    shapes: Shape[]
}

function Renderer({ shapes }: RendererProps) {
    const canvasRef = useRef(null)
    const scene = useRef<BABYLON.Scene|null>(null)
    const engine = useRef<BABYLON.Engine|null>(null)
    const sceneObjects = useRef<BABYLON.Mesh[]>([])

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

    const renderShapes = () => {
        if (!scene.current) return
        // Clean out old ones
        sceneObjects.current.forEach((o) => {
            o.dispose()
        })
        sceneObjects.current = []
        // Make new ones
        shapes.forEach((shape, i) => {
            if (shape.type === 'box') {
                const box = CreateBox(shape as BoxShape, scene.current)
                sceneObjects.current.push(box)
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
        const camera = new BABYLON.ArcRotateCamera('camera1',
            Math.PI * 3 / 2, // a
            Math.PI / 4, // b
            24,
            new BABYLON.Vector3(0, 4, 0),
            scene.current
        )
        camera.setTarget(BABYLON.Vector3.Zero())
        camera.attachControl(canvas, true)
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene.current)
        light.intensity = 0.7
        light.diffuse = new BABYLON.Color3(1, 0.9, 0.8);
        light.specular = new BABYLON.Color3(1, 1, 1);
        light.groundColor = new BABYLON.Color3(.3, .2, .1);
        
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene.current);
        sphere.position.y = 1
        BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene.current);

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