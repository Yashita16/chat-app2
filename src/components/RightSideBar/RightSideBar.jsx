import React from 'react'
import './RightSideBar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/Firebase'

const RightSideBar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />

        <h3>Chayank Agarwal <img src={assets.green_dot} className='dot' alt="" /></h3>
        <p>Hey There, I am Chayank Agarwal</p>
      </div>

      <hr />

      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          
          
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4}alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={
        ()=>{
          logout()
        }
      }> Log Out</button>
      
    </div>
  )
}

export default RightSideBar
