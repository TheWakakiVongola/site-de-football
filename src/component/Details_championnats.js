import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './base/header';
import Footer from './base/footer';

const DetailsChampionnats = () => {
    const { leagueId } = useParams();
    const [standings, setStandings] = useState([]);
    const [league, setLeague] = useState({});
    const [lastleague, setLast] = useState([]);
    const [topleague, setTop] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getTopScorersByLeague() {
            try {
                const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${leagueId}&season=2023`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const data = await response.json();
                setTop(data.response);
            } catch (error) {
                console.error('Error fetching top scorers:', error);
            }
        }
        
        getTopScorersByLeague();

        async function fetchlastmatch() {
            try {
                const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&last=10`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setLast(data.response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching last match:', error);
            }
        }
        
        fetchlastmatch();

        async function fetchStandings() {
            try {
                const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${leagueId}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                };
                const response = await fetch(url, options);
                const data = await response.json();
                const standingsData = data.response[0]?.league?.standings[0];
                const leagueData = data.response[0]?.league;
                setStandings(standingsData || []);
                setLeague(leagueData || {});
            } catch (error) {
                console.error('Error fetching standings:', error);
            }
        }

        fetchStandings();
    }, [leagueId]);

    return (
        <>
            <Header />
            <div className="innner_banner">
                <div className="container">
                    <h3>{league.name}</h3>
                </div>
            </div>
            <div className="kode_content_wrap">
                <section className="kf_teamcomparison_page">
                    <div className="container">
                        {loading ? (
                            <div>Chargement...</div>
                        ) : (
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="team_comparison_wrap2">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <div className="comparison_thumb">
                                                    <img src={league.logo} style={{ width:'250px', height:'250px' }} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="kf_topscores">
                                        <h6 className="kf_hd1 margin_0">
                                            <span>Informations</span>
                                        </h6>
                                        <div className="border_div">
                                            <ul className="kf_table">
                                                <li className="table_head">
                                                    <div className="team_logo">
                                                        <strong>Logo</strong>
                                                    </div>
                                                    <div className="team_gb">
                                                        <strong>League</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="team_logo">
                                                        <span><img src={league.logo} alt="" style={{ width:'25px', height:'25px' }}  /></span>
                                                    </div>
                                                    <div className="team_point">
                                                        <span>{league.name}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className="kf_table">
                                                <li className="table_head">
                                                    <div className="team_logo">
                                                        <strong>Flag</strong>
                                                    </div>
                                                    <div className="team_gb">
                                                        <strong>Country</strong>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="team_logo">
                                                        <span><img src={league.flag} alt="" style={{ width:'25px', height:'25px' }}  /></span>
                                                    </div>
                                                    <div className="team_point">
                                                        <span>{league.country}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="kf_topscores">
                                        <h6 className="kf_hd1 margin_0">
                                            <span>Liste des buteurs</span>
                                        </h6>
                                        <ul className="kf_table2">
                                            <li className="table_head">
                                                <div className="team_logo"></div>
                                                <div className="match_win">
                                                    <strong>Player</strong>
                                                </div>
                                                <div className="team_gb">
                                                    <strong> Team</strong>
                                                </div>
                                                <div className="team_gb">
                                                    <strong> Goals</strong>
                                                </div>
                                            </li>
                                            {topleague.map((player, index) => (
                                                <li key={index} className="table_row">
                                                    <div className="team_logo">
                                                        <img src={player.player.photo} alt="" style={{ width:'40px', height:'40px' }} />
                                                    </div>
                                                    <div className="match_win">
                                                        {player.player.name}
                                                    </div>
                                                    <div className="team_gb">
                                                        <img src={player.statistics[0].team.logo} alt="" style={{ width:'40px', height:'40px' }} />
                                                    </div>
                                                    <div className="team_gb">
                                                        {player.statistics[0].goals.total}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <aside className="col-md-4">
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
                                                    <div className="team_logo"></div>
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
                                    <div className="widget widget_player">
                                        <h6 className="kf_hd1">
                                            <span> Dernier Matches</span>
                                        </h6>
                                        <div className="kf_border">
                                            <ul>
                                                {lastleague.map(last => (
                                                    <li key={last.fixture.id}>
                                                        <span className="date_2">{last.fixture.date}</span>
                                                        <div className="kf_opponents_wrap">
                                                            <div className="kf_opponents_dec">
                                                                <span><img src={last.teams.home.logo} alt="" /></span>
                                                                <div className="text">
                                                                    <h6><a href={`/Equipe/${last.teams.home.id}`}>{last.teams.home.name}</a></h6>
                                                                    <p>{last.teams.home.name} institute</p>
                                                                </div>
                                                            </div>
                                                            <div className="kf_opponents_gols">
                                                                <h5><span>{last.goals.home} -</span><span>- {last.goals.away}</span></h5>
                                                                <p>{last.league.country} ({last.league.name})</p>
                                                            </div>
                                                            <div className="kf_opponents_dec span_right">
                                                                <span><img src={last.teams.away.logo} alt="" /></span>
                                                                <div className="text">
                                                                    <h6><a href={`/Equipe/${last.teams.away.id}`}>{last.teams.away.name}</a></h6>
                                                                    <p>{last.teams.away.name} institute</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default DetailsChampionnats;
