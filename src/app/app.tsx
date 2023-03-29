import React, { useState } from 'react'
import { Button, Grid, Icon, TextArea } from 'semantic-ui-react'
import ShapeList from '../components/ShapeList'
import Renderer from '../components/Renderer'
import { BoxShape, SphereShape, CylinderShape, RefShape } from '../Types'
import './app.module.scss';
import ShapeDetail from 'src/components/ShapeDetail'
import { useStoreState, useStoreActions } from '../store';


function App() {
  const { shapes } = useStoreState((state) => state)
  const [activeId, setActiveId] = useState(0)
  const [lastId, setLastId] = useState(-1)
  const [copyState, setCopyState] = useState(0)
  const { addShape } = useStoreActions((actions) => actions);

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

  const addBox = () => {
    const id = getNextId()
    addShape({
      id,
      type: 'box',
      name: 'alex',
      position: {
        x: Math.floor(Math.random() * 1000) / 100 - 5,
        y: Math.floor(Math.random() * 1000) / 100,
        z: Math.floor(Math.random() * 1000) / 100 - 5
      },
      size: 1
    } as BoxShape)
  }

  const addSphere = () => {
    const id = getNextId()
    addShape({
      id,
      type: 'sphere',
      name: 'kevin',
      position: {
        x: Math.floor(Math.random() * 1000) / 100 - 5,
        y: Math.floor(Math.random() * 1000) / 100,
        z: Math.floor(Math.random() * 1000) / 100 - 5
      },
      diameter: 1
    } as SphereShape)
  }

  const addCylinder = () => {
    const id = getNextId()
    addShape({
      id,
      type: 'cylinder',
      name: 'cami',
      position: {
        x: Math.floor(Math.random() * 1000) / 100 - 5,
        y: Math.floor(Math.random() * 1000) / 100,
        z: Math.floor(Math.random() * 1000) / 100 - 5
      },
      height: 1
    } as CylinderShape)
  }

  const addRefShape = () => {
    const id = getNextId()
    addShape({
      id,
      type: 'ref',
      name: 'miles',
      position: {
        x: Math.floor(Math.random() * 1000) / 100 - 5,
        y: Math.floor(Math.random() * 1000) / 100,
        z: Math.floor(Math.random() * 1000) / 100 - 5
      },
      ref: -1
    } as RefShape)
  }

  const copyShapes = () => {
    navigator.clipboard.writeText(JSON.stringify(shapes, null, 2))

  }

  return (
    <div className="App">
      <Grid columns={3} celled='internally'>
        <Grid.Row>
          The Header
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <div>A toolbar (Save, Load, Export)</div>
            <div>
              <Button
                icon
                onClick={addBox}>
                <Icon name='cube' />
              </Button>
              <Button
                icon
                onClick={addSphere}>
                <Icon name='circle' />
              </Button>
              <Button
                icon
                onClick={addRefShape}>
                <Icon name='arrow right' />
              </Button>
              <Button
                icon
                onClick={addCylinder}>
                <Icon name='database' />
              </Button>
              <ShapeList 
                shapes={shapes}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            </div>
            
            <div>
              <form>
                <TextArea style={{display:'inline-block'}}value={JSON.stringify(shapes, null, 2)} readOnly/>
                <Button
                  icon
                  onClick={copyShapes}>
                  <Icon name={'copy'} />
                </Button>
              </form>
              
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Renderer shapes={shapes} activeId={activeId} />
            <div>View buttons</div>
          </Grid.Column>
          <Grid.Column width={4}>
            <ShapeDetail key={activeId} shapeId={activeId} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
