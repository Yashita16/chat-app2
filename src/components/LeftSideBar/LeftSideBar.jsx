import React from 'react'
import './LeftSideBar.css'
import assets from '../../assets/assets'

const LeftSideBar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className='logo'/>
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p>Edit Profile</p>
              <hr />
              <p>Log Out</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder='Search Here' />
        </div>
        </div> 

        <div className="ls-list">
          {Array(12).fill("").map(
            (item,index)=>(
              <div key= {index}className="friends">
            <img src={assets.profile_img} alt="" />
            <div>
              <p>
                Chayank Agarwal

              </p>

              <span>Hello , How are you? </span>
            </div>
          </div>
            )
          )}

        </div>

      
    </div>
  )
}

export default LeftSideBar
