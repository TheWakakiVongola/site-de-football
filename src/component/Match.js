import Header from './base/header';
import Footer from './base/footer';
import React, { useState, useEffect } from 'react';

function Match() {
    const [liveMatches, setLiveMatches] = useState([]);
    const [fixtures, setTodayFixtures] = useState([]);
    const [LastDayFixtures, setLastDayFixtures] = useState([]);
    const [TomorrowFixtures, setTomorrowFixtures] = useState([]);
    const [loading, setLoading] = useState(false);

    const [visibleMatches, setVisibleMatches] = useState(20);

    useEffect(() => {
        const fetchLiveMatches = async () => {
            try {
                const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch live matches');
                }

                const data = await response.json();
                setLiveMatches(data.response);
            } catch (error) {
                console.error('Error fetching live matches:', error);
            }
        };

        const fetchFixtures = async () => {
            try {
                // Get today's date
                const today = new Date();
                // Get the last day's date
                const lastDay = new Date(today);
                lastDay.setDate(today.getDate() - 1); // Subtract 1 day
        
                // Get tomorrow's date
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1); // Add 1 day
        
                // Format dates to 'YYYY-MM-DD' format
                const formatDate = date => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                };
        
                // Fetch fixtures for the last day, today, and tomorrow
                const [lastDayData, todayData, tomorrowData] = await Promise.all([
                    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formatDate(lastDay)}`, {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                        }
                    }),
                    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formatDate(today)}`, {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                        }
                    }),
                    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${formatDate(tomorrow)}`, {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                        }
                    })
                ]);
        
                // Check if all responses are ok
                if (!lastDayData.ok || !todayData.ok || !tomorrowData.ok) {
                    throw new Error('Failed to fetch fixtures');
                }
        
                // Parse responses
                const lastDayFixtures = await lastDayData.json();
                const todayFixtures = await todayData.json();
                const tomorrowFixtures = await tomorrowData.json();
        
                // Set fixtures state
                setLastDayFixtures(lastDayFixtures.response);
                setTodayFixtures(todayFixtures.response);
                setTomorrowFixtures(tomorrowFixtures.response);
                
               
            } catch (error) {
                console.error('Error fetching fixtures:', error);
            }
        };
        
        fetchLiveMatches();
        fetchFixtures();

        // Re-fetch live matches every 30 seconds
        const intervalId = setInterval(fetchLiveMatches, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const handleLoadMore = () => {
        setVisibleMatches(prevVisibleMatches => prevVisibleMatches + 20);
    };

    // Define the formatTime function to format the time
    // Define the formatTime function to format the time in GMT
// Define the formatTime function to format the time with time zone
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const options = { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        return date.toLocaleTimeString('en-US', options);
    };

  return (
    <>
      <Header />
     
      {loading ? (
               <div className="loader"></div>

            ) : (
                <>
      <div className="innner_banner">
        <div className="container">
            <h3>Matches</h3>
        </div>
    </div>
    <div className="kode_content_wrap">
        <section className="kf_overview margin-0">
            <div className="container">
                <div className="kf_overview_nav">
                    <ul className="row" role="tablist">
                        <li role="presentation" className="active col-md-2">
                            <a href="#overview" aria-controls="overview" role="tab" data-toggle="tab">
                            <em>Matches</em>
                            <span>maintenant</span>
                            </a>
                        </li>
                        <li role="presentation" className="col-md-2">
                            <a href="#roster" aria-controls="roster" role="tab" data-toggle="tab">
                                <em>Matches</em>
                                <span>Aujourd'hui</span>
                        </a>
                        </li>
                        <li role="presentation" className="col-md-2">
                            <a href="#standing" aria-controls="standing" role="tab" data-toggle="tab">
                                <em>Matches</em>
                                <span>Demain</span>
                            </a>
                        </li>
                        <li role="presentation" className="col-md-2">
                            <a href="#latest" aria-controls="latest" role="tab" data-toggle="tab">
                            <em>Matches</em>
                            <span>Hier</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content">



                    <div role="tabpanel" className="tab-pane active" id="overview">
                        <div className="overview_wrap">
                        <div className="row">
                    <div className="col-md-12">
                        <div className="kf_overview kf_current_match_wrap">
                            <h6 className="kf_hd1 margin_0">
                                <span>Matches En Direct Live :  {liveMatches.length} </span>
                                <a className="prv_btn" href="#">Check Previous Result</a>
                            </h6>
                            {liveMatches.slice(0, visibleMatches).map((match, index) => (
                                <div key={index} className="kf_opponents_outerwrap"  style={{marginBottom:"20px"}}>
                                    <h6 className="kf_h4">

                                    <div className="team_logo">
                                        <span><img src={match.league.logo} alt={match.league.logo} title={match.league.logo} style={{ width:'20px', height:'20px' }}  /></span>
                                        <a href={`/Details_championnats/${match.league.id}`}>

                                        <span>{match.league.name} {match.fixture.id}</span>
                                        </a>
                                </div>
                                       
                                        <em>En Direct</em>
                                    </h6>
                                    <div className="kf_opponents_wrap">
                                        <div className="kf_opponents_dec">
                                            <span><img src={match.teams.home.logo} alt="" /></span>
                                            <div className="text">
                                                <h6><a href={`/Equipe/${match.teams.away.id}`}>{match.teams.home.name}</a></h6>
                                                <p>{match.league.country}</p>
                                            </div>
                                        </div>
                                        <div className="kf_opponents_gols">
                                            <span >{match.fixture.status.short !== 'FT' ? `${match.fixture.status.long}` : ''}
                                            <p>{match.fixture.status.short !== 'FT' ? `${match.fixture.status.elapsed}'` : ''}</p>

                                              {match.goals.home} - {match.goals.away}</span>
                                            <h5><a style={{width:"100%"}} href={`/Match/${match.fixture.id}/${match.league.id}`} className="input-btn">Match En Direct </a></h5>

                                        </div>
                                        <div className="kf_opponents_dec span_right">
                                            <span><img src={match.teams.away.logo} alt="" /></span>
                                            <div className="text">
                                                <h6><a href={`/Equipe/${match.teams.away.id}`}>{match.teams.away.name}</a></h6>
                                                <p>{match.league.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {liveMatches.length > visibleMatches && (
                                <div className="load-more-btn text-center">
                                    <button  style={{width:"100%"}}className="input-btn" onClick={handleLoadMore}>Voir plus</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                        </div>
                    </div>

                    <div role="tabpanel" className="tab-pane" id="roster">
                        <div className="overview_wrap">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="kf_overview kf_current_match_wrap">
                                        <h6 className="kf_hd1 margin_0">
                                            <span>Matches Aujourd'hui Total : {fixtures.length}</span>
                                            <a className="prv_btn" href="#">Check Previous Result</a>
                                        </h6>

                                        <div className="kf_opponents_outerwrap">
                                            <h6 className="kf_h4">
                                                <span>Matches Aujourd'hui</span>
                                                <em>Aujourd'hui</em>
                                            </h6>
                                            {fixtures.slice(0, visibleMatches).map((fixture, index) => (
                        <div key={fixture.fixture_id} className="kf_opponents_wrap">
                            <div className="kf_opponents_dec">
                                {fixture.teams && fixture.teams.home && (
                                    <>
                                        <span><img src={fixture.teams.home.logo} alt={fixture.teams.home.name} /></span>
                                        <div className="text">
                                            <h6><a  style={{width:"100%"}} href={`/Equipe/${fixture.teams.home.id}`}>{fixture.teams.home.name}</a></h6>
                                            <p>{fixture.league.country}</p>
                                        </div>
                                    </>
                                )}
                                
                            </div>
                            <div className="kf_opponents_gols">
                            <h5><span>{fixture.goals.home} -</span><span>- {fixture.goals.away}</span></h5>
                            <h5><a style={{width:"100%"}}  className="input-btn" href={`/Match/${fixture.fixture.id}/${fixture.league.id}`}>statistiques du match</a></h5>
                            <em> <a href={`/Equipe/${fixture.league.id}`}>{fixture.league.name}</a></em>
                            </div>
                            <div className="kf_opponents_dec span_right">
                                {fixture.teams && fixture.teams.away && (
                                    <>
                                        <span><img src={fixture.teams.away.logo} alt={fixture.teams.away.name} /></span>
                                        <div className="text">
                                            <h6><a href={`/Equipe/${fixture.teams.away.id}`}>{fixture.teams.away.name}</a></h6>
                                            <p>{fixture.league.country}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}


                    {fixtures.length > visibleMatches && (
                                                    <div className="load-more-btn text-center">
                                                        <button style={{width:"100%"}} className="input-btn" onClick={handleLoadMore}>Voir plus</button>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div role="tabpanel" className="tab-pane" id="standing">
                    
                        <div className="overview_wrap">

                        <div className="row">
            <div className="col-md-12">
                <div className="kf_overview kf_current_match_wrap">
                    <h6 className="kf_hd1 margin_0">
                        <span>Matches Demain Total : {TomorrowFixtures.length}</span>
                        <a className="prv_btn" href="#">Check Previous Result</a>
                    </h6>

                    <div className="kf_opponents_outerwrap">
                        <h6 className="kf_h4">
                            <span>Matches Demain</span>
                            <em>Time GMT</em>
                        </h6>
                        {TomorrowFixtures.slice(0, visibleMatches).map((TomorrowFixture, index) => (
    <div key={TomorrowFixture.fixture_id} className="kf_opponents_wrap">
        <div className="kf_opponents_dec">
            {TomorrowFixture.teams && TomorrowFixture.teams.home && (
                <>
                    <span><img src={TomorrowFixture.teams.home.logo} alt={TomorrowFixture.teams.home.name} /></span>
                    <div className="text">
                        <h6><a href={`/Equipe/${TomorrowFixture.teams.home.id}`}>{TomorrowFixture.teams.home.name}</a></h6>
                        <p>{TomorrowFixture.league.country}</p>
                    </div>
                </>
            )}
            
        </div>
        <div className="kf_opponents_gols">
        <h6><span>{formatTime(TomorrowFixture.fixture.date)}</span></h6>
        <h5><a className="input-btn" href={`/Match/${TomorrowFixture.fixture.id}/${TomorrowFixture.league.id}`} style={{width:"100%"}}>statistiques du match</a></h5>

        <em> <a href={`/Equipe/${TomorrowFixture.league.id}`}>{TomorrowFixture.league.name}</a></em>
        </div>
        <div className="kf_opponents_dec span_right">
            {TomorrowFixture.teams && TomorrowFixture.teams.away && (
                <>
                    <span><img src={TomorrowFixture.teams.away.logo} alt={TomorrowFixture.teams.away.name} /></span>
                    <div className="text">
                        <h6><a href={`/Equipe/${TomorrowFixture.teams.away.id}`}>{TomorrowFixture.teams.away.name}</a></h6>
                      

                        <p>{TomorrowFixture.league.country}</p>
                    </div>
                </>
            )}
        </div>
    </div>
))}


{TomorrowFixtures.length > visibleMatches && (
                                <div className="load-more-btn text-center">
                                    <button className="input-btn" onClick={handleLoadMore}>Voir plus</button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
                            
                         
                        </div>
                   
                    </div>




                    <div role="tabpanel" className="tab-pane" id="latest">
                     
                        <div className="overview_wrap">
                        <div className="row">
            <div className="col-md-12">
                <div className="kf_overview kf_current_match_wrap">
                    <h6 className="kf_hd1 margin_0">
                        <span>Matches Hier Total : {LastDayFixtures.length}</span>
                        <a className="prv_btn" href="#">Check Previous Result</a>
                    </h6>

                    <div className="kf_opponents_outerwrap">
                        <h6 className="kf_h4">
                            <span>Matches Hier</span>
                            <em>Hier</em>
                        </h6>
                        {LastDayFixtures.slice(0, visibleMatches).map((LastDayFixture, index) => (
    <div key={LastDayFixture.fixture_id} className="kf_opponents_wrap">
        <div className="kf_opponents_dec">
            {LastDayFixture.teams && LastDayFixture.teams.home && (
                <>
                    <span><img src={LastDayFixture.teams.home.logo} alt={LastDayFixture.teams.home.name} /></span>
                    <div className="text">
                        <h6><a href={`/Equipe/${LastDayFixture.teams.home.id}`} style={{width:"100%"}}>{LastDayFixture.teams.home.name}</a></h6>
                        <p>{LastDayFixture.league.country}</p>
                    </div>
                </>
            )}
            
        </div>
        <div className="kf_opponents_gols">
        <h5><span>{LastDayFixture.goals.home} -</span><span>- {LastDayFixture.goals.away}</span></h5>
        <h5><a className="input-btn" href={`/Match/${LastDayFixture.fixture.id}/${LastDayFixture.league.id}`}>statistiques du match</a></h5>
        <em> <a href={`/Equipe/${LastDayFixture.league.id}`}>{LastDayFixture.league.name}</a></em>
        </div>
        <div className="kf_opponents_dec span_right">
            {LastDayFixture.teams && LastDayFixture.teams.away && (
                <>
                    <span><img src={LastDayFixture.teams.away.logo} alt={LastDayFixture.teams.away.name} /></span>
                    <div className="text">
                        <h6><a href={`/Equipe/${LastDayFixture.teams.away.id}`}>{LastDayFixture.teams.away.name}</a></h6>
                        <p>{LastDayFixture.league.country}</p>
                    </div>
                </>
            )}
        </div>
    </div>
))}


{LastDayFixtures.length > visibleMatches && (
                                <div className="load-more-btn text-center">
                                    <button style={{width:"100%"}} className="input-btn" onClick={handleLoadMore}>Voir plus</button>
                                </div>
                            )}
                    </div>
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
      )};
      <Footer/>
    </>
  );
}

export default Match;