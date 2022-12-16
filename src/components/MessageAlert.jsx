import React from "react";


export default function MessageAlert({message, handleClose}) {
  return (
    message ? <div className="Reward-Snackbar">
        <span onClose={handleClose}>
            {message}
        </span>
    </div>:null
  )
}