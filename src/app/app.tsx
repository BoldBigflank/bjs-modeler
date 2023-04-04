import React, { useState, KeyboardEvent } from 'react'
import ShapeList from '../components/ShapeList'
import Renderer from '../components/Renderer'
import { BoxShape, SphereShape, CylinderShape, RefShape } from '../Types'
import './app.module.scss';
import ShapeDetailPanel from 'src/components/ShapeDetailPanel'
import { useStoreState, useStoreActions } from '../store';
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

const changeActiveId = (n: number) => {
  const activeIndex = shapes.findIndex((shape) => shape.id === activeId)
  const nextActiveIndex = (activeIndex + n + shapes.length) % shapes.length
  setActiveId(shapes[nextActiveIndex].id)
}

const moveActiveShape = (x: number, y: number, z: number) => {
  if (activeId < 0) return
  const activeShape = shapes.find((shape) => shape.id === activeId)
  if (!activeShape) return
  updateShape({
    ...activeShape,
    position: {
      x: activeShape.position.x + x,
      y: activeShape.position.y + y,
      z: activeShape.position.z + z
    }
  })
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.currentTarget.tagName === 'INPUT') return
  switch (event.key) {
    case 'q':
    case 'Q':
      changeActiveId(-1)
      break
    case 'w':
    case 'W':
      moveActiveShape(0, 0, 1)
      break
    case 'e':
    case 'E':
      changeActiveId(1)
      break
      case 'a':
    case 'A':
      moveActiveShape(-1, 0, 0)
      break
    case 's':
    case 'S':
      moveActiveShape(0, 0, -1)
      break
    case 'd':
      case 'D':
      moveActiveShape(1, 0, 0)
      break
    case 'z':
    case 'Z':
      moveActiveShape(0, -1, 0)
      break;
    case 'x':
    case 'X':
      moveActiveShape(0, 1, 0)
      break
    default:
      break;
  }
}

  return (
    <div className="App" onKeyDown={handleKeyDown}>
      <Renderer shapes={shapes} activeId={activeId} />
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
