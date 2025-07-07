import React, { useEffect, useState } from 'react'
import './Profile.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth,db } from '../../config/Firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/Upload';

const Profile = () => {
  const navigate=useNavigate();

  const [image , setimage]=useState(false);
  const [name,setname]=useState("");
  const [bio,setbio]=useState("");
const [uid,setuid]=useState("");
const [avatar,setavatar]=useState("");

const profileupdate= async(event)=>{
  event.preventDefault();
  try {
    if(!avatar && !image){
      toast.error("upload profile picture")
    }
    const docRef=doc(db,"users",uid);
    if(image){
      const imageUrl=await upload(image);
      setavatar(imageUrl);
      await updateDoc(docRef,{
        avatar:imageUrl,
        bio:bio,
        name:name
      })

    }
    else{
      await updateDoc(docRef,{
        bio:bio,
        name:name
      })

    }
  } catch (error) {
    
  }



}
  useEffect(()=>{
    onAuthStateChanged(auth,async()=>{
      if(user){
        setuid(user.uid)
        const docRef=doc(db,"users",user.uid);
        const docsnap= await getDoc(docRef);
        if((await docsnap).data().name){
          setname((await docsnap).data().name);
        }
        if((await docsnap).data().bio){
          setbio((await docsnap).data().bio);
        }
        if((await docsnap).data().avatar){
          setavatar((await docsnap).data().avatar);
        }

      }

      else{
        navigate('/')

      }
    })

  },[])





  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileupdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=>setimage(e.target.files[0])} type="file" id='avatar' accept='.png,.jpg , .jpeg' hidden/>
            <img src={image? URL.createObjectURL(image):assets.avatar_icon} alt="" />
            upload profile image
          </label>
          <input  onChange={
            (e)=>setname(e.target.value)
          }  value={name}
          
          type="text" placeholder='Your name' required />
          <textarea  onChange={(e)=>setbio(e.target.bio)} value={bio}  placeholder='Write Profile Bio' required></textarea>
          <button type='submit'> Save</button>


        </form>

        <img  className='profile-pic' src={image? URL.createObjectURL(image):assets.logo_icon} alt="" />

      </div>
      
      
    </div>
  )
}

export default Profile
