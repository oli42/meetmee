import '../styles/Styles.scss'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout'

function NavBarIn() {

    return (
        <div className="header">
            <h2 className='title'>MEETMEE</h2>
            <Logout />
        </div>
      )
}

export default NavBarIn
