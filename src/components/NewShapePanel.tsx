import { Button, Icon } from "semantic-ui-react"

type NewShapeProps = {
    newShape: (name: string) => void
}

const NewShapePanel = ({newShape}: NewShapeProps) => {
    return (<div className='newShapePanel'>
        <Button
          className='newShape'
          icon
          primary
          color="pink"
          onClick={() => newShape('box')}>
          <Icon name='cube' />
        </Button>
        <Button
          className='newShape'
          icon
          color="pink"
          onClick={() => newShape('sphere')}>
          <Icon name='circle' />
        </Button>
        <Button
          className='newShape'
          icon
          color="pink"
          onClick={() => newShape('ref')}>
          <Icon name='arrow right' />
        </Button>
        <Button
          className='newShape'
          icon
          color="pink"
          onClick={() => newShape('cylinder')}>
          <Icon name='database' />
        </Button>
      </div>)
}

export default NewShapePanel