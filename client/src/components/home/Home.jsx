import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard";
import request from "../../utils/request";

export default function Home() {

    const[lastestGames, setLastestGames] = useState([]);  

    useEffect(() => {
        request('http://localhost:3030/jsonstore/games')
        // fetch('http://localhost:3030/jsonstore/games')
        //     .then(response => response.json())
            .then(result => {
                // Process and display the latest games
                const resultGames = Object.values(result)
                    .sort((a, b) => b._createdOn - a._createdOn)
                    .slice(0, 3);
                setLastestGames(resultGames);
            })
            .catch(err => alert(err.message));
    }, []);

    return (
      <section id="welcome-world">

        <div className="welcome-message">
            <h2>ALL new games are</h2>
            <h3>Only in </h3>
            <img id="logo-left" src="./images/logo.png" alt="logo" />
        </div>

        <div id="home-page">
            <h1>Latest Games</h1>
            <div id="latest-wrap">
                {/* <!-- Display div: with information about every game (if any) --> */}
                <div className="home-container">
                    
                    {lastestGames.length === 0 && <p className="no-articles">No games yet</p>}
                    {lastestGames.map(game => <GameCard key={game._id} {...game} />)}
                  
                </div>
            </div>
        </div>  
    </section>
    );
}