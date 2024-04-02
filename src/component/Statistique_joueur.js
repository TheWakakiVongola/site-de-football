import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './base/header';
import Footer from './base/footer';

function Statistique_joueur() {

    const { playerId } = useParams();
    const [info, setPlayerInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [trophies, setTrophies] = useState([]);
    const [visibleTrophies, setVisibleTrophies] = useState(20);

    useEffect(() => {
        const fetchPlayerData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${playerId}&season=2023`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch player data');
                }
                const playerInfo = await response.json();
                const player = playerInfo.response[0];
                setPlayerInfo(player);
                
                // Fetch player trophies
                const fetchPlayerTrophies = async () => {
                    const url = `https://api-football-v1.p.rapidapi.com/v3/trophies?player=${playerId}`;
                    const options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                        }
                    };
        
                    try {
                        const response = await fetch(url, options);
                        const data = await response.json();
                        setTrophies(data.response);

                    } catch (error) {
                        console.error('Error fetching player trophies:', error);
                    }
                };
    
                fetchPlayerTrophies(); // Invoke fetchPlayerTrophies function after setting player info
            } catch (error) {
                console.error('Error fetching player data:', error);
            } finally {
                setLoading(false);
            }

        };

        fetchPlayerData();
    }, [playerId]);

    const handleLoadMore = () => {
        setVisibleTrophies(prevVisibleTrophies => prevVisibleTrophies + 20); // Load 20 more trophies
    };
    const totalWinnerTrophies = trophies.filter(trophy => trophy.place === "Winner").length;


    return (
        <>
            <Header />

            {loading ? (
                                           <div class="loader"></div>
                                        ) : (
                                            <>
            <div className="innner_banner">
                <div className="container">
                    <h3>{info && info.player && info.player.name}</h3>
                </div>
            </div>
            <div className="kode_content_wrap">
                <section className="roster_page">
                    <div className="container">
                        <div className="kf_roster_wrap">
                            <div className="row">



                                <div className="col-md-4">
                                    <div className="roster_sidebar">
                                        <h6 className="kf_hd1 margin_0">
                                            <span>le Joueur</span>
                                        </h6>
                                        <div id="playerInfoContainer"></div>
                                        <div className="kf_roster_dec">
                                            <figure>
                                                <img src={info && info.player && info.player.photo} alt="Player Image" />
                                            </figure>
                                            <div className="text">
                                                <span>{info && info.player && info.player.number}</span>
                                                {info && info.statistics && info.statistics.length > 0 && (
                                                    <div className="text_overflow text-center">
                                                        <h3>
                                                            <a href="#">
                                                                <span>{info.player.name}</span>
                                                            </a>
                                                        </h3>
                                                        <em>{info.statistics[0].games.position}</em>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="kf_plyer_rating" >
                                            <div>
                                            <span style={{ width: '100%' }}>
                                                <strong>Total des trophées gagnées</strong>
                                                <b>{totalWinnerTrophies}</b>
                                              
                                            </span>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <ul className="kf_table2 kf_tableaside">
    <li>
        <div>
            <span>Ligue</span>
        </div>
        <div>
            <span>Pays</span>
        </div>
        <div>
            <span>Place</span>
        </div>
    </li>
    {trophies.slice(0, visibleTrophies).map((trophy, index) => (
        <li key={index}>
            <div>
                <em>{trophy.league}</em>
                <em> | {trophy.season}</em>
            </div>
            <div>
                <em>{trophy.country}</em>
            </div>
            <div>
                <em>{trophy.place}</em>
            </div>
        </li>
    ))}
</ul>
{visibleTrophies < trophies.length && (
    <span>
        <button onClick={handleLoadMore} className="list-title kf_hd1 margin_0">Voir plus</button>
    </span>
)}



                                
                                </div>



                                
                                <div className="col-md-8">
                                    <div className="kf_overview_contant">
                                    <h6 className="list-title kf_hd1 margin_0">
                                            <span>Informations générales</span>
                                        </h6>
                                        <ul className="kf_table2" id="generalInfo" style={{marginBottom:"20px"}}>
                                            <li className="table_head">
                                                <div className="tb2_type"><span>Prénom</span></div>
                                                <div className="tb2_age"><span>Nom</span></div>
                                                <div className="tb2_birthdate"><span>Âge</span></div>
                                            </li>
                                            <li>
                                                <div className="tb2_type"><span>{info && info.player && info.player.firstname}</span></div>
                                                <div className="tb2_age"><span>{info && info.player && info.player.lastname}</span></div>
                                                <div className="tb2_age"><span>{info && info.player && info.player.age}</span></div>
                                            </li>
                                            <li className="table_head">
                                                <div className="tb2_type"><span>Nationalité</span></div>
                                                <div className="tb2_age"><span>Lieu de naissance</span></div>
                                                <div className="tb2_birthdate"><span>Pays de naissance</span></div>
                                            </li>
                                            <li>
                                                <div className="tb2_type"><span>{info && info.player && info.player.birth && info.player.nationality}</span></div>
                                                <div className="tb2_age"><span>{info && info.player && info.player.birth && info.player.birth.place}</span></div>
                                                <div className="tb2_age"><span>{info && info.player && info.player.birth && info.player.birth.country}</span></div>
                                            </li>
                                            <li className="table_head">
                                                <div className="tb2_type"><span>Taille</span></div>
                                                <div className="tb2_age"><span>Poids</span></div>
                                                <div className="tb2_birthdate"><span>Blessé</span></div>
                                            </li>
                                            <li>
                                                <div className="tb2_age"><span>{info && info.player && info.player.height}</span></div>
                                                <div className="tb2_age"><span>{info && info.player && info.player.weight}</span></div>
                                                {info && info.player && info.player.injured !== undefined && (
                                                    <div>
                                                        <span>
                                                            <em>{info.player.injured ? 'Oui' : 'Non'}</em>
                                                        </span>
                                                    </div>
                                                )}
                                            </li>
                                        </ul>
                                 
                                        <h6 className="list-title kf_hd1 margin_0" >
                                            <span>Statistiques détaillées</span>
                                        </h6>
                                        <ul className="kf_table2" id="detailedStats" style={{marginBottom:"20px"}}>
                                            <li className="table_head">
                                                <div className="tb2_team_name"><span>Nom de l'équipe</span></div>
                                                <div className="tb2_goals_conceded"><span>Buts encaissés</span></div>
                                                <div className="tb2_fouls_committed"><span>Fautes commises</span></div>
                                                <div className="tb2_clearances"><span>Dégagements</span></div>
                                                <div className="tb2_blocks"><span>Contres</span></div>
                                                <div className="tb2_rating"><span>Évaluation</span></div>
                                            </li>

                                            {info && info.statistics && info.statistics.map((statistic, index) => (
                                                <li key={index}>
                                                     <div className="team_logo">
                                                            <span><img src={statistic.team.logo} alt={statistic.team.name} title={statistic.team.name} style={{ width:'20px', height:'20px' }}  /></span>
                                                            <a href={`/Equipe/${statistic.team.id}`}>{statistic.team.name}</a>
                                                        </div>
                                                    <div className="tb2_goals_conceded"><span>{statistic.goals.conceded  || '--'}</span></div>
                                                    <div className="tb2_fouls_committed"><span>{statistic.fouls.committed  || '--'}</span></div>
                                                    <div className="tb2_clearances"><span>{statistic.clearances  || '--'}</span></div>
                                                    <div className="tb2_blocks"><span>{statistic.blocks  || '--'}</span></div>
                                                    <div className="tb2_rating"><span>{statistic.rating  || '--'}</span></div>
                                                </li>
                                            ))}
                                        </ul>

                                                                        <div>
                                    <h6 className="list-title kf_hd1 margin_0">
                                        <span>Autres statistiques</span>
                                    </h6>
                                    <ul className="kf_table2" id="otherStats">
                                        <li className="table_head">
                                            <div className="tb2_team_name"><span>Nom de l'équipe</span></div>
                                            <div className="tb2_goals_conceded"><span>Buts encaissés</span></div>
                                            <div className="tb2_assists"><span>Passes décisives</span></div>
                                            <div className="tb2_yellow_cards"><span>Cartons jaunes</span></div>
                                            <div className="tb2_red_cards"><span>Cartons rouges</span></div>
                                            <div className="tb2_minutes_played"><span>Minutes jouées</span></div>
                                            <div className="tb2_total_shots"><span>Tirs totaux</span></div>
                                        </li>
                                        {info && info.statistics && info.statistics.map((statistic, index) => (
                                            <li key={index}>
                                                <div className="team_logo">
                                                    <span><img src={statistic.team.logo} alt={statistic.team.name} title={statistic.team.name} style={{ width:'20px', height:'20px' }}  /></span>
                                                    <a href={`/Equipe/${statistic.team.id}`}>{statistic.team.name}</a>
                                                </div>
                                                <div className="tb2_goals_conceded"><span>{statistic.goals.conceded  || '--'}</span></div>
                                                <div className="tb2_assists"><span>{statistic.goals.assists  || '--'}</span></div>
                                                <div className="tb2_yellow_cards"><span>{statistic.cards.yellow  || '--'}</span></div>
                                                <div className="tb2_red_cards"><span>{statistic.cards.red  || '--'}</span></div>
                                                <div className="tb2_minutes_played"><span>{statistic.games.minutes  || '--'}</span></div>
                                                <div className="tb2_total_shots"><span>{statistic.shots.total  || '--'}</span></div>
                                            </li>
                                        ))}
                                    </ul>

    <div>
    <h6 className="list-title kf_hd1 margin_0"  style={{marginTop:"20px"}}>
        <span>Autres statistiques</span>
    </h6>
    <ul className="kf_table2" id="otherStats">
        <li className="table_head">
            <div className="tb2_team_name"><span>Nom de l'équipe</span></div>
            <div className="tb2_goals_conceded"><span>Buts encaissés</span></div>
            <div className="tb2_assists"><span>Passes décisives</span></div>
            <div className="tb2_yellow_cards"><span>Cartons jaunes</span></div>
            <div className="tb2_red_cards"><span>Cartons rouges</span></div>
            <div className="tb2_minutes_played"><span>Minutes jouées</span></div>
            <div className="tb2_total_shots"><span>Tirs totaux</span></div>
        </li>
        {info && info.statistics && info.statistics.map((statistic, index) => (
            <li key={index}>
                <div className="team_logo">
                    <span><img src={statistic.team.logo} alt={statistic.team.name} title={statistic.team.name} style={{ width:'20px', height:'20px' }}  /></span>
                    <a href={`/Equipe/${statistic.team.id}`}>{statistic.team.name}</a>
                </div>
                <div className="tb2_goals_conceded"><span>{statistic.goals.conceded || '--'}</span></div>
                <div className="tb2_assists"><span>{statistic.goals.assists || '--'}</span></div>
                <div className="tb2_yellow_cards"><span>{statistic.cards.yellow || '--'}</span></div>
                <div className="tb2_red_cards"><span>{statistic.cards.red || '--'}</span></div>
                <div className="tb2_minutes_played"><span>{statistic.games.minutes || '--'}</span></div>
                <div className="tb2_total_shots"><span>{statistic.shots.total || '--'}</span></div>
            </li>
        ))}
    </ul>
</div>

</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </>
)}
            <Footer />
        </>
    );
}

export default Statistique_joueur;
