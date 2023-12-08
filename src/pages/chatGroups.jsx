import React from "react";
import NavbarComponent from "../components/user/Navbar";
import Chat from "../components/chat/Chat";
import NavbarComponentServicer from "../components/servicer/Sidebar";
const ChatGroup = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const isServicer = userData ? userData.is_servicer : false;

  return (
    <div>
    {isServicer ? <NavbarComponentServicer /> : <NavbarComponent />}
     <Chat/>
     </div>
  );
};

export default ChatGroup;