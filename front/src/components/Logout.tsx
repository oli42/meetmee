import { useNavigate } from 'react-router-dom'

function Logout() {

    let navigation = useNavigate();


    const handleLogout = async () => {
        let url: string = '/api/logout';
        const response = await fetch(url, { method: "GET",
        headers: {
        'Access-Control-Allow-Origin' : '*',
        credentials: 'include'}
        })
        localStorage.clear()
        navigation('/');
    }
  return (
    <div className='button-logout'>
        <button onClick={() => handleLogout()} className='button-logout'>Logout</button>
    </div>
  )
}

export default Logout
