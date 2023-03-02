import { useState } from 'react'
import NavBarIn from '../components/NavBarIn';

function CookieTester() {
  
  const [data, setData] = useState<any>([])

  async function handleTest() {

    let url: string = '/api/users';
    const response = await fetch(url, { method: "GET",
    headers: {
    'Access-Control-Allow-Origin' : '*',
    credentials: 'include'}
  })
    const res2 = await response.json();
    const result: any = Object.values(res2)
    setData(result)
  }

  return (
    <div className="container">
        <NavBarIn />
          <div className="test">
            <div className='wrapper'>
            <button onClick={()=> handleTest()}>CLICK AND PROOVE THAT THE COOKIE IS WORKING</button>
            <p>If the cookie is working, the list of users will appear down below</p>
              <div>
                {
                data?.map((item: any, index: any) => (
                  <h2 key = {index}>{item.firstName}</h2> 
                  ))
                }
                </div>
              </div>
          </div>
        <div className="footer"></div>
    </div>
  )
}

export default CookieTester
