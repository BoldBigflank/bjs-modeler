import React, { useState } from 'react'
import { Button, Grid, Icon } from 'semantic-ui-react'
import ShapeList from '../components/ShapeList'
import Renderer from '../components/Renderer'
import { Shape } from '../Types'
import './app.module.scss';
import ShapeDetail from 'src/components/ShapeDetail'


function App() {
  const [shapeList, setShapeList] = useState<Shape[]>([])
  const [activeId, setActiveId] = useState(-1)
  const [lastId, setLastId] = useState(0)

  const addBox = () => {
    const nextId = lastId + 1
    setLastId(nextId)
    setShapeList([
      ...shapeList,
      {
        id: nextId,
        type: 'box',
        name: 'alex',
        position: {
          x: Math.floor(Math.random() * 1000) / 100 - 5,
          y: Math.floor(Math.random() * 1000) / 100,
          z: Math.floor(Math.random() * 1000) / 100 - 5
        }
      }
    ])
  }

  function updateShape(name: string, value: any) {
    const newShapeList: Shape[] = shapeList.map((shape) => {
      if (shape.id !== activeId) return shape
      const newShape = {...shape}
      newShape[name] = value
      return newShape
    })
    if (newShapeList) setShapeList(newShapeList)
  }

  function deleteShape(id: number) {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Are you sure?')
    if (!confirmed) return
    setShapeList(shapeList.filter((shape, index) => index !== id))
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
                shapes={shapeList}
                activeId={activeId}
                deleteShape={deleteShape}
                setActiveId={setActiveId}
              />
              <Button
                icon
                labelPosition='right'
                onClick={addBox}>
                Box
                <Icon name='plus' />
              </Button>
            </div>
            
            <div>The JSON</div>
          </Grid.Column>
          <Grid.Column width={8}>
            <Renderer shapes={shapeList} />
            <div>View buttons</div>
          </Grid.Column>
          <Grid.Column width={4}>
            { activeId !== -1 &&
              <ShapeDetail shape={shapeList.find(c => c.id == activeId)} updateShape={updateShape}/>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
