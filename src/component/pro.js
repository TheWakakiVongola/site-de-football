import React, { useState, useEffect } from 'react';

const PredictionsDisplay = ({ fixtureId }) => {
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPredictions = async () => {
            const url = `https://api-football-v1.p.rapidapi.com/v2/predictions/${fixtureId}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe', // Replace with your API key
                    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error('Failed to fetch predictions');
                }
                const data = await response.json();
                setPredictions(data.api.predictions[0]);
                setLoading(false);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        fetchPredictions();
    }, [fixtureId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!predictions) {
        return <div>No predictions available</div>;
    }
    
    const prediction = predictions;
    const league = prediction.league;
    const homeTeam = prediction.teams.home;
    const awayTeam = prediction.teams.away;
    

    return (
        <div className="predictions-container">

<div className="kf_scorecard">
    <ul className="kf_table">
        <li>
            <div className="table_info">
                <span><b>Prédiction</b></span>
            </div>
            <div className="table_info">
                <span><b>Buts à Domicile</b></span>
            </div>
            <div className="table_info">
                <span><b>Buts à l'Extérieur</b></span>
            </div>
            <div className="table_info">
                <span><b>Conseil</b></span>
            </div>
            <div className="table_info">
                <span><b>Pourcentage de Victoire (1N2)</b></span>
            </div>
        </li>
        <li>
            <div className="table_info">
                <span>{prediction.match_winner}</span>
            </div>
            <div className="table_info">
                <span>{prediction.goals_home}</span>
            </div>
            <div className="table_info">
                <span>{prediction.goals_away}</span>
            </div>
            <div className="table_info">
                <span>{prediction.advice}</span>
            </div>
            <div className="table_info">
                <span>({prediction.winning_percent.home}), Match Nul ({prediction.winning_percent.draws}), Extérieur ({prediction.winning_percent.away})</span>
            </div>
        </li>
    </ul>
</div>



          
        </div>
        
       


    );
};

export default PredictionsDisplay;
