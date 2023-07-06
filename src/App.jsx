import { useState } from "react";
import PasswordReqForm from "./PasswordReqForm";
function App() {

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-800">
      {/* Password Reqiruement form */}
      <PasswordReqForm />
    </div>
    </>
  )
}

export default App
