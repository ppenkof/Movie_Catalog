import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import CreateComent from "./create-comment/CreateComent";
import request from "../../utils/request";
import DetailsComments from "./details-comments/DetailsComments";

export default function Details({
    user
}) {

    const {gameId} = useParams();
    const[game, setGame] = useState({});
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        // fetch(`http://localhost:3030/jsonstore/games/${gameId}`)
        //     .then(response => response.json())
        //     .then(result => {
        //         setGame(result);
        //     })
        //     .catch(err => alert(err.message));

        request(`/games/${gameId}`)
            .then(result => {
                setGame(result);
            })
            .catch(err => alert(err.message));

    }, [gameId]);

    const deleteGameHandler = async () => {
        const isConfirmed = confirm('Are you sure you want to delete this game?');
        if(!isConfirmed){
            return;
        }
        try {
            await fetch(`http://localhost:3030/jsonstore/games/${gameId}`, {
            method: 'DELETE'
            });
            navigate('/games');
        } catch (error) {
            alert('Unable to delete game:', error.message);  
        }    
    }

    const refreshHandler = () => {
        setRefresh(state => !state);
    }

    return (
        <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">
    
            <div className="header-and-image">
                <img className="game-img" src={game.imageUrl} alt={game.title} />
                
                <div className="meta-info">
                    <h1 className="game-name">{game.title}</h1>
                    
                    <p className="data-row">
                        <span className="label">Genre:</span>
                        <span className="value">{game.genre}</span>
                    </p>
    
                    <p className="data-row">
                        <span className="label">Active Players:</span>
                        <span className="value">{game.players}</span>
                    </p>
    
                    <p className="data-row">
                        <span className="label">Release Date:</span>
                        <span className="value">{game.date}</span>
                    </p>
                </div>
                <div className="summary-section">
                <h2>Summary:</h2>
                <p className="text-summary">{game.summary}</p>
            </div>
            </div>
    
            
             {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
            <div className="buttons">
                <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                {/* <Link to={`/games/${gameId}/delete`} className="button">Delete</Link> */}
                <button className="button" onClick={deleteGameHandler}>Delete</button>
            </div>
            
            <DetailsComments refresh={refresh}/>
    
        </div>
     {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
        
        {user && <CreateComent user={user} onCreate={refreshHandler}/>}

    </section>
    );
}