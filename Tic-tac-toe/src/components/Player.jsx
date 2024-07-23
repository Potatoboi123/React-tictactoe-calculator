import { useState } from "react";

export default function Player({initialName,symbol,isActive,onChangeName}){
    const [editName,setEditName]=useState(initialName);
    const [isEditing,setEditing]=useState(false);

    function handleEditClick(){
        setEditing(editing=>!editing);

        if(isEditing){
          onChangeName(symbol,editName)
        }
    }
    function handleUpdateName(event){
      setEditName(event.target.value);
    }

    let playerName=<span className="player-name">{editName}</span>;
    if(isEditing){
        playerName=<input type="text" onChange={handleUpdateName} value={editName} required/>;
    }

    return (
        <li className={isActive ? "active" : undefined}>
        <span className="player">
          { playerName }
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save': 'Edit'}</button>
      </li>
    );
}