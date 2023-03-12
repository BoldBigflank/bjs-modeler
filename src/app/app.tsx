import React, { useState } from 'react'
import { Button, Grid, Icon } from 'semantic-ui-react'
import ShapeList from '../components/ShapeList'
import Renderer from '../components/Renderer'
import { Shape } from '../Types'
import './app.module.scss';
import ShapeDetail from 'src/components/ShapeDetail'


function App() {
  const [shapeList, setShapeList] = useState<Shape[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  const addBox = () => {
    setShapeList([
      ...shapeList,
      {
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

  function deleteShape(id: number) {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Are you sure?')
    if (!confirmed) return
    console.log('deleteShape', id)
    setShapeList(shapeList.filter((shape, index) => index !== id))
  }

  return (
    <div className="App">
      <Grid celled='internally'>
        <Grid.Row>
          The Header
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <div>A toolbar (Save, Load, Export)</div>
            <div> The list of objects
              <ShapeList 
                shapes={shapeList}
                activeIndex={activeIndex}
                deleteShape={deleteShape}
                setActiveIndex={setActiveIndex}
              />
              <Button
                icon
                labelPosition='right'
                onClick={addBox}>
                Box
                <Icon name='plus' />
              </Button>
            </div>
            <ShapeDetail shape={shapeList[activeIndex]} />
            <div>The JSON</div>
          </Grid.Column>
          <Grid.Column width={6}>
            <Renderer shapes={shapeList} />
            <div>View buttons</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
