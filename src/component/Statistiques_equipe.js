import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './base/header';
import Footer from './base/footer';

const Statistiques_equipe = () => {
    
    const { teamId } = useParams();
    const [info, setTeamInfo] = useState({});
    const [venue, setTeamVenue] = useState({});
    const [lastMatches, setLastMatches] = useState([]);
    const [nextMatches, setNextMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [coach, setCoach] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            setLoading(true);
            try {
                // Fetch team information
                const teamInfoResponse = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                const teamInfoData = await teamInfoResponse.json();
                const [team] = teamInfoData.response;
                setTeamInfo(team.team);
                setTeamVenue(team.venue);

                // Fetch team coach
                const coachResponse = await fetch(`https://api-football-v1.p.rapidapi.com/v3/coachs?team=${teamId}`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                const coachData = await coachResponse.json();
                if (coachData.response.length > 0) {
                    setCoach(coachData.response[0]);
                } else {
                    setCoach(null);
                }

                // Fetch last matches
                const lastMatchesResponse = await fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${teamId}/last/10?timezone=Europe%2FLondon`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                const lastMatchesData = await lastMatchesResponse.json();
                setLastMatches(lastMatchesData.api.fixtures);

                // Fetch next matches
                const nextMatchesResponse = await fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${teamId}/next/10?timezone=Europe%2FLondon`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                const nextMatchesData = await nextMatchesResponse.json();
                setNextMatches(nextMatchesData.api.fixtures);

                // Fetch team players
                const playersResponse = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${teamId}&season=2023`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                const playersData = await playersResponse.json();
                setPlayers(playersData.response);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching team data:', error);
                setLoading(false);
            }
        };

        fetchTeamData();
    }, [teamId]);

    return (
    <>
      <Header />
      {loading ? (
               <div class="loader"></div>

            ) : (
                <>
    <div className="innner_banner">
        <div className="container">
            <h3>Equipe {info.name}</h3>
            
        </div>
    </div>

    <div className="kode_content_wrap">
        <section className="kf_teamcomparison_page">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="team_comparison_wrap2">
                            <div className="row">
                               
                                <div className="col-md-12 col-sm-12">
                                    <div className="comparison_thumb">
                                        <img src={info.logo} alt={info.name} />
                                        <h5><a href="#">{info.name}</a></h5>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    
                       
                        <div className="match_comparison">
                            <h6 className="kf_hd1 margin_0">
                                <span>Table De Information </span>
                            </h6>
                            <ul className="kf_table border_div">
                                <li className="">
                                <div className="kf_tbresult">
                                        <span>Country :</span>
                                    </div>
                                    <div className="kf_tbtotal">
                                        <span>{info.country}</span>
                                    </div>

                                    <div className="kf_tbresult">
                                        <span>founded :</span>
                                    </div>
                                    <div className="kf_tbtotal">
                                        <span>{info.founded}</span>
                                    </div>
                                   
                                </li>
                                <li>
                                    <div className="kf_tbresult">
                                        <span>city</span>
                                    </div>
                                    <div className="kf_tbtotal">
                                        <span>{venue.city}</span>
                                    </div>

                                    <div className="kf_tbresult">
                                        <span>address</span>
                                    </div>
                                    <div className="kf_tbtotal">
                                        <span>{venue.address}</span>
                                    </div>
                                </li>

                                <li>
                                    <div className="kf_tbresult">
                                        <span>Stade</span>
                                    </div>
                                    <div className="kf_tbtotal">
                                        <span>{venue.name}</span>
                                    </div>

                                    <div className="kf_tbresult">
                                        <span>capacity</span>
                                    </div>
                                    <div className="kf_tbtotal">
                                        <span>{venue.capacity}</span>
                                    </div>
                                </li>
                              
                            </ul>
                        </div>
                        <div class="match_comparison">
                            <h6 class="kf_hd1 margin_0">
                                <span>Image Stade</span>
                            </h6>
                            <ul class="kf_table border_div" style={{padding:"15px"}}>
                                <figure>
                                    <img src={venue.image} alt="" />
                                </figure>
                            </ul>
                        </div>

                        
                       
                   
                       
                        <div className="row">
                            <div className="col-md-6">
                               
        <div className="widget widget_player">
            <h6 className="kf_hd1">
                <span>dernier Matche</span>
            </h6>
            <div className="kf_border">
                <ul>
                    {lastMatches && lastMatches.map(match => (
                        <li key={match.fixture_id}>
                            <span className="date_2">{match.event_date}</span>
                            <div className="kf_opponents_wrap">
                                <div className="kf_opponents_dec">
                                    <span><img src={match.homeTeam.logo} alt="" /></span>
                                    <div className="text">
                                        <h6><a href="#">{match.homeTeam.team_name}</a></h6>
                                    </div>
                                </div>
                                <div className="kf_opponents_gols">
                                    <h5><span>{match.goalsHomeTeam}</span> - <span>{match.goalsAwayTeam}</span></h5>
                                    <p>{match.status}</p>
                                </div>
                                <div className="kf_opponents_dec span_right">
                                    <span><img src={match.awayTeam.logo} alt="" /></span>
                                    <div className="text">
                                        <h6><a href="#">{match.awayTeam.team_name}</a></h6>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
                            </div>
                            <div className="col-md-6">
                            <div className="widget widget_player">
                                <h6 className="kf_hd1">
                                    <span>Prochains Matchs</span>
                                </h6>
                                <div className="kf_border">
                                    <ul>
                                        {nextMatches && nextMatches.map(match => (
                                            <li key={match.fixture_id}>
                                                <span className="date_2">{match.event_date}</span>
                                                <div className="kf_opponents_wrap">
                                                    <div className="kf_opponents_dec">
                                                        <span><img src={match.homeTeam.logo} alt="" /></span>
                                                        <div className="text">
                                                            <h6><a href="#">{match.homeTeam.team_name}</a></h6>
                                                        </div>
                                                    </div>
                                                    <div className="kf_opponents_gols">
                                                        <h5><span>{match.goalsHomeTeam !== null ? match.goalsHomeTeam : '-'}</span> - <span>{match.goalsAwayTeam !== null ? match.goalsAwayTeam : '-'}</span></h5>
                                                        <p>{match.status}</p>
                                                    </div>
                                                    <div className="kf_opponents_dec span_right">
                                                        <span><img src={match.awayTeam.logo} alt="" /></span>
                                                        <div className="text">
                                                            <h6><a href="#">{match.awayTeam.team_name}</a></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                     
                    </div>
                    <aside className="col-md-4">


    <div className="widget widget_ranking widget_league_table">
      <h6 className="kf_hd1">
        <span>Liste des joueurs</span>
      </h6>
      <div className="kf_border">
        <ul className="kf_table">
          <li className="table_head">
            <div className="team_name">
              <strong>Numéro</strong>
            </div>
            <div className="team_logo">
              <strong>Joueur</strong>
            </div>
            <div className="match_loss">
              <strong>Type de poste</strong>
            </div>
          </li>
          {players && players.map((player, index) => (
            <li key={index}>
              <div className="table_no">
                <span>{player.player.id}</span>
              </div>
              <div className="team_logo">
                <span>
                  <img src={player.player.photo} style={{ width: "40px", height: "50px" }} alt="" />
                </span>
                <a href={`/Player/${player.player.id}`}>
                  {player.player.firstname} {player.player.lastname}
                </a>
              </div>
              <div className="match_win">
                <span>{player.statistics[0].games.position}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>


    <div className="widget widget_ranking widget_league_table">
      <h6 className="kf_hd1">
        <span>Coach de l'équipe</span>
      </h6>
      <div className="kf_border">
        {coach ? (
          <div className="coach_info text-center">
            <div className="coach_photo">
              <img src={coach.photo} alt={coach.name} />
            </div>
            <div className="coach_details">
              <h3>{coach.name}</h3>
              <p>
                <strong>Âge:</strong> {coach.age}
              </p>
              <p>
                <strong>Nationalité:</strong> {coach.nationality}
              </p>
              <p>
                <strong>Équipe actuelle:</strong> {coach.team.name}
              </p>
            </div>
          </div>
        ) : (
          <p>Coach information not available</p>
        )}
      </div>
    </div>

                     
                       





                     
                    </aside>
                </div>
            </div>
        </section>
    </div>
</>
      )};
    
      <Footer/>
    </>
  );
};

export default Statistiques_equipe;