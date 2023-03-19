import React, { useState } from 'react'
import { Button, Grid, Icon } from 'semantic-ui-react'
import ShapeList from '../components/ShapeList'
import Renderer from '../components/Renderer'
import { Shape, BoxShape, SphereShape } from '../Types'
import './app.module.scss';
import ShapeDetail from 'src/components/ShapeDetail'
import { useStoreState, useStoreActions } from '../store';


function App() {
  const { shapes } = useStoreState((state) => state)
  const [activeId, setActiveId] = useState(-1)
  const [lastId, setLastId] = useState(0)
  const { addShape } = useStoreActions((actions) => actions);

  const getNextId = () => {
    const nextId = lastId + 1
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
      }
    })
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
    })
  }

  function updateShape(name: string, value: any) {
    const newShapeList: Shape[] = shapes.map((shape) => {
      if (shape.id !== activeId) return shape
      const newShape = {...shape}
      newShape[name] = value
      return newShape
    })
    if (newShapeList) setShapeList(newShapeList)
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
            <div> The list of objects
              <ShapeList 
                shapes={shapes}
                activeId={activeId}
                setActiveId={setActiveId}
              />
              <Button
                icon
                labelPosition='right'
                onClick={addBox}>
                Box
                <Icon name='plus' />
              </Button>
              <Button
                icon
                labelPosition='right'
                onClick={addSphere}>
                Sphere
                <Icon name='plus' />
              </Button>
            </div>
            
            <div>The JSON</div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Renderer shapes={shapes} />
            <div>View buttons</div>
          </Grid.Column>
          <Grid.Column width={4}>
            <ShapeDetail shapeId={activeId} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
