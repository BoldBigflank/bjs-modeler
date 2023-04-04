import { useState } from 'react'
import { Button, Icon, TextArea } from 'semantic-ui-react'
import { useStoreState } from "../store"
import { sleep } from 'src/utilities/Utils'

const ExportPanel = () => {
    const { shapes } = useStoreState((state) => state)
    const [confirmed, setConfirmed] = useState(false)
    
    const copyShapes = async (e: React.MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(JSON.stringify(shapes, null, 2))
        setConfirmed(true)
        await sleep(1000)
        setConfirmed(false)
    }

    return (
        <div className='exportPanel'>
        <form>
          {/* <TextArea style={{display:'inline-block'}}value={JSON.stringify(shapes, null, 2)} readOnly/> */}
          <button
            className={`copyShapes panelButton ${confirmed ? 'confirmed' : ''}`}
            onClick={copyShapes}>
            <Icon name={'copy'} />
          </button>
        </form>
        
      </div>
    )
}

export default ExportPanel