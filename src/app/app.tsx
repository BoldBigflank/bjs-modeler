import React, { useEffect, useState } from 'react'
import { Grid} from 'semantic-ui-react'
import ShapeList from '../components/ShapeList'
import Renderer from '../components/Renderer'
import { BoxShape, SphereShape, CylinderShape, RefShape } from '../Types'
import './app.module.scss';
import ShapeDetailPanel from 'src/components/ShapeDetailPanel'
import { useStoreState, useStoreActions } from '../store';
import { Vector3 } from '@babylonjs/core'
import NewShapePanel from 'src/components/NewShapePanel'
import ExportPanel from 'src/components/ExportPanel'


function App() {
  const { shapes } = useStoreState((state) => state)
  const [activeId, setActiveId] = useState(-1)
  const [lastId, setLastId] = useState(-1)
  const { addShape, updateShape } = useStoreActions((actions) => actions);

  const getNextId = () => {
    let highestId = lastId
    if (lastId === -1) {
      highestId = 0
      // Initialize
      shapes.forEach((shape) => {
        highestId = Math.max(shape.id, highestId)
      })
    }
    const nextId = highestId + 1
    setLastId(nextId)
    return nextId
  }

  const newShape = (name: string) => {
    console.log('newShape', name)
    const id = getNextId()
    const baseShape = {
      id,
      type: name,
      name: name,
      position: {
        x: Math.floor(Math.random() * 1000) / 100 - 5,
        y: Math.floor(Math.random() * 1000) / 100,
        z: Math.floor(Math.random() * 1000) / 100 - 5
      }
    }
    switch (name) {
      case 'box':
        addShape({
          ...baseShape,
          size: 1
        } as BoxShape)
        break
      case 'sphere':
        addShape({
          ...baseShape,
          diameter: 1
        } as SphereShape)
        break
      case 'cylinder':
        addShape({
          ...baseShape,
          height: 1
        } as CylinderShape)
        break
      case 'ref':
        addShape({
          ...baseShape,
          ref: -1
        } as RefShape)
        break
      default:
        return // Don't set the active id
    }
    setActiveId(id)
  }

  const updateActiveShape = (name: 'position'|'scaling'|'rotation', diff: Vector3) => {
    console.log('updateActiveShape', activeId) // WHY IS THIS ALWAYS THE INITIAL VALUE
    console.log('shapes', shapes)
    const activeShape = shapes.find((shape) => shape.id === activeId)
    console.log('active shape', activeShape)
    if (!activeShape) return
    const vec = activeShape[name]
    if (!vec) return
    activeShape[name] = {
      x: Math.round(vec.x + diff.x),
      y: Math.round(vec.y + diff.y),
      z: Math.round(vec.z + diff.z)
    }
    console.log('updating shape', activeShape)
    updateShape(activeShape)
  }

  return (
    <div className="App">
      <Renderer shapes={shapes} activeId={activeId} updateActiveShape={updateActiveShape} />
      <div className="panels">
        <NewShapePanel newShape={newShape} />
        <ShapeList 
          shapes={shapes}
          activeId={activeId}
          setActiveId={(e) => {setActiveId(e)}}
        />
        <ExportPanel />
        <ShapeDetailPanel key={activeId} shapeId={activeId} />
      </div>
    </div>
  );
}

export default App;
