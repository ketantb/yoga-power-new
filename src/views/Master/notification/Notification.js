// src/Notification.js
import { getDatabase, ref, set } from "firebase/database";
import { useEffect } from "react";



function Notification() {

  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }
  

  // const sendMessage = () => {
  //   if (message) {
  //     database.ref('messages').push({ text: message });
  //     setMessage('');
  //   }
  // };

  useEffect(()=>{
    writeUserData('eqkjhfuefhfe','syed abdullah ali','syedabdullahali380gmail.com','')
  },[])

  return (
    <div>
      {/* <div>
        {messages.map((msg, index) => (
          
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button> */}
    </div>
  );
}

export default Notification;

