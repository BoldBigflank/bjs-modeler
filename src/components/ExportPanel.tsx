import { Button, Icon, TextArea } from 'semantic-ui-react'
import { useStoreState } from "../store"

const ExportPanel = () => {
    const { shapes } = useStoreState((state) => state)
    
    const copyShapes = (e: React.MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(JSON.stringify(shapes, null, 2))
    }

    return (
        <div className='exportPanel'>
        <form>
          <TextArea style={{display:'inline-block'}}value={JSON.stringify(shapes, null, 2)} readOnly/>
          <button
            className="panelButton"
            onClick={copyShapes}>
            <Icon name={'copy'} />
          </button>
        </form>
        
      </div>
    )
}

export default ExportPanel