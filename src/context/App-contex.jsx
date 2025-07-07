import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";


export const Appcontext = createContext();

const AppcontextProvider = (props) => {
  const navigate = useNavigate();

  const [userdata, setuserdata] = useState(null);
  const [chatdata, setchatdata] = useState(null);//here we store chat data


  const loaduserdata = async (uid) => {
    try {
      const userRef = doc(db, "users", uid)
      const usersnap = await getDoc(userRef);
      const userdata = usersnap.data();
      setuserdata(userdata);
      if (userdata.avatar && userdata.name) {
        navigate('/chat');


      }
      else {
        navigate('/profile');

      }
      await updateDoc(userRef, {
        lastseen: Date.now()
      })
      setInterval(async () => {
        if (auth.chatUser) {
          await updateDoc(userRef, {
            lastseen: Date.now()
          })

        }

      }, 60000)

    } catch (error) {

    }

  }
  //object


  const value = {
    userdata, setuserdata, chatdata, setchatdata, loaduserdata

  }

  return (
    <>
      <Appcontext.Provider value={value}

      >{props.children}</Appcontext.Provider>
    </>
  )

}

export default AppcontextProvider;