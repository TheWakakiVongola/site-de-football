import Header from './base/header';
import Footer from './base/footer';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PredictionsDisplay from './pro'; // Import the PredictionsDisplay component



const Statistiques_match = () => {
  const { matchId } = useParams();
  const { leagueId } = useParams();
  const [info, setTeamInfo] = useState({});
  const [standings, setStandings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${matchId}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setTeamInfo(result.response[0]);
        
        setLoading(false);
  
      } catch (error) {
        console.error(error);
        // Handle error state here
      } finally {
        setLoading(false);
      }

    };

    async function fetchStandings() {
        const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${leagueId}`;
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
            const standingsData = data.response[0].league.standings[0];
            
            setStandings(standingsData);
            setLoading(false);
           
        } catch (error) {
            console.error(error);
        }
        
    }
    fetchData();
    fetchStandings();
  }, [matchId]);

  // Destructure properties from info object
  const { statistics = {}, goals = {}, events = [], teams = {} } = info;
  // Filter events for home and away teams
  const homeTeamEvents = events.filter(event => event.team.id === teams.home?.id);
  const awayTeamEvents = events.filter(event => event.team.id === teams.away?.id);

  // Render loading state
 
  // Render match statistics




 // Filter card events for home and away teams
const homeCards = events.filter(event => event.team.id === info.teams.home.id && event.type === "Card");
const awayCards = events.filter(event => event.team.id === info.teams.away.id && event.type === "Card");

// Count yellow and red cards for home and away teams
const homeYellowCards = homeCards.filter(card => card.detail === "Yellow Card").length;
const homeRedCards = homeCards.filter(card => card.detail === "Red Card").length;
const awayYellowCards = awayCards.filter(card => card.detail === "Yellow Card").length;
const awayRedCards = awayCards.filter(card => card.detail === "Red Card").length;
// Get the substitutes for home and away teams
// Get the substitutes for home and away teams
let homeSubstitutesLength = 0;
let awaySubstitutesLength = 0;

if (info.lineups) {
    const homeLineup = info.lineups.find(team => team.team_id === info.teams.home.id);
    const awayLineup = info.lineups.find(team => team.team_id === info.teams.away.id);

    if (homeLineup && homeLineup.substitutes) {
        homeSubstitutesLength = homeLineup.substitutes.length;
    }

    if (awayLineup && awayLineup.substitutes) {
        awaySubstitutesLength = awayLineup.substitutes.length;
    }
}




  return (
    <>
      <Header />

      <div className="innner_banner">
        <div className="container">
        {info && info.league && info.fixture && info.teams && info.teams.home && info.teams.away && (
            <h3> Match  : {info.teams.home.name} VS {info.teams.away.name}</h3>
        )}
        </div>
    </div>
    <div className="kode_content_wrap">
        <section className="kf_overview_page">
            <div className="container">
                <div className="overview_wrap">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="kf_overview kf_current_match_wrap">
                                <h6 className="kf_hd1 margin_0">
                                    <span>Résultat du dernier match</span>
                                    {/*<a className="prv_btn" href="#">Vérifier le résultat précédent</a>*/}
                                </h6>
                               
                                {info && info.league && info.fixture && info.teams && info.teams.home && info.teams.away && (

                                <div className="kf_opponents_outerwrap">
                                    <h6 className="kf_h4">
                                        <span>{info.league.name}</span>
                                        <em>{info.fixture.date}</em>
                                    </h6>
                                    <div className="kf_opponents_wrap">
                                        <div className="kf_opponents_dec">
                                            <span><img src={info.teams.home.logo} alt="" /></span>
                                            <div className="text">
                                                <h6><a href="#">{info.teams.home.name}</a></h6>

                                                {homeTeamEvents.map((event, index) => (
                                                        <p key={index} style={{ marginBottom: "10px" }}>
                                                            {event.detail === "Yellow Card" && (
                                                                <i className="fa-solid fa-square" style={{ color: "yellow" }}></i>
                                                            )}
                                                            {event.detail === "Red Card" && (
                                                                <i className="fa-solid fa-square" style={{ color: "red" }}></i>
                                                            )}
                                                            {event.detail === "Normal Goal" || event.detail === "Penalty" && (
                                                                            <i className="fa-solid fa-futbol"></i>
                                                                        )}

                                                            {event.detail !== "Yellow Card" && event.detail !== "Red Card" && (
                                                               <i className="fa-solid fa-volleyball"></i>                                                           )}
                                                            {event.detail} by {event.player?.name} at {event.time.elapsed}
                                                        </p>
                                                    ))}

                                                 
                                                
                                               
                                                <p><i className="fa-solid fa-futbol"></i></p>
                                            </div>
                                        </div>
                                        <div className="kf_opponents_gols">
                                           
                                            <h5><span>{info.goals.home} -</span><span>- {info.goals.away}</span></h5>
                                            <p>{info.fixture.status.short !== 'FT' ? `${info.fixture.status.long}`  : ''}</p>
                                            <p>{info.fixture.status.short !== 'FT' ? `${info.fixture.status.elapsed}'` : ''}</p>


                                        </div>
                                        <div className="kf_opponents_dec span_right">
                                            <span><img src={info.teams.away.logo} alt="" /></span>
                                            <div className="text">
                                                <h6><a href="#">{info.teams.away.name}</a></h6>

                                                  {awayTeamEvents.map((event, index) => (
                                                    <p key={index} style={{ marginBottom: "10px" }}>
                                                    {event.detail === "Yellow Card" && (
                                                        <i className="fa-solid fa-square" style={{ color: "yellow" }}></i>
                                                    )}
                                                    {event.detail === "Red Card" && (
                                                        <i className="fa-solid fa-square" style={{ color: "red" }}></i>
                                                    )}
                                                    {event.detail === "Normal Goal" || event.detail === "Penalty" && (
                                                                    <i className="fa-solid fa-futbol"></i>
                                                                )}

                                                    {event.detail !== "Yellow Card" && event.detail !== "Red Card" && (
                                                       <i className="fa-solid fa-volleyball"></i>                                                           )}
                                                    {event.detail} by {event.player?.name} at {event.time.elapsed}
                                                </p>
                                                  ))}
                                            </div>
                                        </div>
                                        
                                        
                                                <PredictionsDisplay fixtureId={matchId} />
                                            
                                    </div>
                                   
                                    <div className="kf_scorecard" >
                                     
                                        <ul className="kf_table" >
                                                <li>
                                                    <div className="table_info">
                                                        <span><b>Tableu</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>1er</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>2eme</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>t</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>Yellow</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>Red</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>Substitutes</b></span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="table_info">
                                                        <span><b>{info.teams.home.name}</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{info.score.halftime.home}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{info.score.fulltime.home}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>{info.goals.home}</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{homeYellowCards}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{homeRedCards}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{homeSubstitutesLength}</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="table_info">
                                                        <span><b>{info.teams.away.name}</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{info.score.halftime.away}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{info.score.fulltime.away}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span><b>{info.goals.away}</b></span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{awayYellowCards}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{awayRedCards}</span>
                                                    </div>
                                                    <div className="table_info">
                                                        <span>{awaySubstitutesLength}</span>
                                                    </div>
                                                </li>
                                            </ul>


                                     
                                    </div>
                                </div>
)};
                            </div>

                            {info && info.league && info.fixture && info.teams && info.teams.home && info.teams.away && (
                                <a  style={{width:"100%"}}className="input-btn text-center"  href={`/h2h/${info.teams.home.id}/${info.teams.away.id}`}>Statistiques supplémentaires</a>
                            )}

                           
                         
                          
                        </div>


                        <aside className="col-md-4">

                        {loading ? (
                            <div>Chargement...</div>
                        ) : (
                                        <div className="widget widget_ranking widget_league_table">
                                                                
                                                                <h6 className="kf_hd1">
                                                                    <span>CLASSEMENT</span>
                                                                </h6>
                                                            
                                                                <div className="kf_border">
                                                            
                                                                    <ul className="kf_table">
                                                                        <li className="table_head">
                                                                            <div className="team_name">
                                                                                <strong>Team</strong>
                                                                            </div>
                                                                            <div className="team_logo">
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <strong>D</strong>
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <strong>L</strong>
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <strong>W</strong>
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <strong>P</strong>
                                                                            </div>
                                                                            
                                                                        </li>
                                                                        {standings.map(team => (
                                                                        <li key={team.rank}>
                                                                            <div className="table_no">
                                                                                <span>{team.rank}</span>
                                                                            </div>
                                                                            <div className="team_logo">
                                                                                <span><img src={team.team.logo} alt={team.team.name} title={team.team.name} style={{ width:'20px', height:'20px' }}  /></span>
                                                                                <a href={`/Equipe/${team.team.id}`}>{team.team.name}</a>
                                                                            </div>
                                                                        
                                                                            <div className="match_loss">
                                                                                <span>{team.all.draw}</span>
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <span>{team.all.lose}</span>
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <span>{team.all.win}</span>
                                                                            </div>
                                                                            <div className="match_loss">
                                                                                <span>{team.points}</span>
                                                                            </div>
                                                                            
                                                                        </li>
                                                                        ))}
                                                                    </ul>
                                                                
                                                                </div>
                                                            </div>
                        )};

                        </aside>
                    </div>
                </div>
            </div>
        </section>
    </div>
     



      <Footer/>
    </>
  );
}

export default Statistiques_match;