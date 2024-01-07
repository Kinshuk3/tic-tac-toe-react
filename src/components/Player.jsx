import { useState } from "react"

export default function Player({initialName, symbol}){

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName)

    function clickHandler(){
        setIsEditing((editing)=> !editing)
    }

    function handleNameChange(event){
        setPlayerName(event.target.value)
    }
    return (
        <li>
            <span className="player">
                {!isEditing ? <span className="player-name">{initialName}</span> : <input type="text" required value={playerName} onChange={handleNameChange}/>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={clickHandler}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}