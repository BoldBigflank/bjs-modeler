import { Icon } from "semantic-ui-react"

type NewShapeProps = {
    newShape: (name: string) => void
}

const NewShapePanel = ({newShape}: NewShapeProps) => {
    return (<div className='newShapePanel'>
        <button
          className='newShape panelButton'
          onClick={() => newShape('box')}>
          <Icon name='cube' />
        </button>
        <button
          className='newShape panelButton'
          onClick={() => newShape('sphere')}>
          <Icon name='circle' />
        </button>
        <button
          className='newShape panelButton'
          onClick={() => newShape('ref')}>
          <Icon name='arrow right' />
        </button>
        <button
          className='newShape panelButton'
          onClick={() => newShape('cylinder')}>
          <Icon name='database' />
        </button>
      </div>)
}

export default NewShapePanel