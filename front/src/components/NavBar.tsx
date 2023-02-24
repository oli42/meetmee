import '../styles/Styles.scss'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  let navigation = useNavigate()
  return (
    <div className="header">
        <h2 className='title'>MEETMEE</h2>
      <div className='buttons'>
        <span><button onClick={() => navigation('/register')} className='button-register'>Register</button>
        /
        <button onClick={() => navigation('/login')} className='button-login'>Login</button></span>
      </div>
    </div>
  )
}

export default NavBar
