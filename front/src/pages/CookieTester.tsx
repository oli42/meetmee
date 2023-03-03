import { useState } from 'react'
import NavBarIn from '../components/NavBarIn';

interface User {
  firstName: string;
  lastName: string;
  email: string;
};

function CookieTester() {
  
  const [data, setData] = useState<User[]>([])
  const userId = localStorage.getItem('data');

  async function handleTest() {

    let url: string = '/api/users';
    const response = await fetch(url, { method: "GET",
    headers: {
    'Access-Control-Allow-Origin' : '*',
    credentials: 'include'}
  })
    const res = await response.json();
    const result: any = Object.values(res)
    setData(result)
  }

  return (
    <div className="container">
        <NavBarIn />
          <div className="test">
            {/* <div className='wrapper'> */}
            <button onClick={()=> handleTest()}>Thx to the cookie, click and get the list of users</button>
              <div>
                {
                data?.map((item: any, index: any) => (
                  <h2 key = {index}>{item.firstName} - {item.lastName} - {item.email} </h2> 
                  ))
                }
                {/* </div> */}
              </div>
          </div>
        <div className="footer"></div>
    </div>
  )
}

export default CookieTester
