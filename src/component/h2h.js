import React, { useState, useEffect } from 'react';
import Header from './base/header';
import Footer from './base/footer';
import { useParams } from 'react-router-dom';

const StatisticTable = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState({ totalHomeWins: 0, totalAwayWins: 0, totalDraws: 0 });
  const [visibleTrophies, setVisibleTrophies] = useState(10);
  const fixturesPerPage = 10; // Set the number of fixtures per page
  const { teamHome, teamAway } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/${teamHome}/${teamAway}?timezone=Europe%2FLondon`;
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
        setFixtures(result.api.fixtures);
        setTotalResults(calculateTotalResults(result.api.fixtures));
      } catch (error) {
        console.error(error);
        // Handle error state here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamHome, teamAway]);

  const getMatchResult = (fixture) => {
    const homeGoals = fixture.goalsHomeTeam;
    const awayGoals = fixture.goalsAwayTeam;
  
    if (homeGoals > awayGoals) {
      return fixture.homeTeam.team_name + ' Won';
    } else if (awayGoals > homeGoals) {
      return fixture.awayTeam.team_name + ' Won';
    } else {
      return 'Draw';
    }
  };

  const calculateTotalResults = (fixtures) => {
    let totalHomeWins = 0;
    let totalAwayWins = 0;
    let totalDraws = 0;
  
    fixtures.forEach((fixture) => {
      const homeGoals = fixture.goalsHomeTeam;
      const awayGoals = fixture.goalsAwayTeam;
  
      if (homeGoals > awayGoals) {
        totalHomeWins++;
      } else if (awayGoals > homeGoals) {
        totalAwayWins++;
      } else {
        totalDraws++;
      }
    });
  
    return { totalHomeWins, totalAwayWins, totalDraws };
  };
  
  const handleLoadMore = () => {
    setVisibleTrophies((prevVisibleTrophies) => prevVisibleTrophies + fixturesPerPage);
  };

  return (
    <>
      <Header />



      <div class="innner_banner">
        <div class="container">
            <h3>Résultats totaux des matchs</h3>
        </div>
    </div>



    <div class="kode_content_wrap">
        <section class="team_schedule_page">
            <div class="container">
              
               
                
                   
      <div>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div>

<div className="kf_topscores">
              <h6 className="kf_hd1 margin_0">
                <span>Résultats totaux des matchs</span>
              </h6>
              <ul className="kf_table2">
                <li className="table_head">
                 
                  <div className="team_gb">
                    <strong>{fixtures.length > 0 ? fixtures[0].homeTeam.team_name : 'Home Team'}</strong>
                  </div>
                  <div className="team_gb">
                    <strong>{fixtures.length > 0 ? fixtures[0].awayTeam.team_name : 'Away Team'}</strong>
                  </div>
                 
                  <div className="team_gb">
                    <strong>Total Matchs Nuls</strong>
                  </div>
                </li>
              
                  <li >
                    <div className="match_win">
                    <strong> Victoires :  {totalResults.totalHomeWins}</strong>
                    </div>
                    <div className="match_win">
                    <strong> Victoires :   {totalResults.totalAwayWins}</strong>
                    </div>
                    <div className="team_gb">
                    <strong>  Matchs Nuls :     {totalResults.totalDraws}</strong>
                    </div>
                   
                   
                   
                  </li>
              </ul>
            </div>






            <div className="kf_topscores ">
              <h6 className="kf_hd1 margin_0">
                <span>Détails des matchs</span>
              </h6>
              <ul className="kf_table2">
              <li className="table_head">
                            <div className="match_win">
                              <strong>Ligue</strong>
                            </div>
                            <div className="match_win">
                              <strong>Date</strong>
                            </div>
                            <div className="team_gb">
                              <strong>Lieu</strong>
                            </div>
                            <div className="team_gb">
                              <strong>Round</strong>
                            </div>
                            <div className="team_gb">
                              <strong>{fixtures.length > 0 ? fixtures[0].homeTeam.team_name : 'Équipe Domicile'}</strong>
                            </div>
                            <div className="team_gb">
                              <strong>{fixtures.length > 0 ? fixtures[0].awayTeam.team_name : 'Équipe Extérieur'}</strong>
                            </div>
                            <div className="team_gb">
                              <strong>Score à la mi-temps</strong>
                            </div>
                            <div className="team_gb">
                              <strong>Score final</strong>
                            </div>
                            <div className="team_gb">
                              <strong>Résultat du match</strong>
                            </div>
                          </li>
                {fixtures.length > 0 && fixtures.slice(0, visibleTrophies).map((fixture, index) => (
                  <li key={index}>
                    <div className="match_win">
                      <span>{fixture.league.name}</span>
                    </div>
                    <div className="match_win">
                      <span>{fixture.event_date}</span>
                    </div>
                    <div className="team_gb">
                      <span>{fixture.venue}</span>
                    </div>
                    <div className="team_gb">
                      <span>{fixture.round}</span>
                    </div>
                    <div className="team_gb">
                      <span>{fixture.goalsHomeTeam}</span>
                    </div>
                    <div className="team_gb">
                      <span>{fixture.goalsAwayTeam}</span>
                    </div>
                    <div className="team_gb">
                      <span>{fixture.score.halftime}</span>
                    </div>
                    <div className="team_gb">
                      <span>{fixture.score.fulltime}</span>
                    </div>
                    <div className="team_gb">
                      <span>{getMatchResult(fixture)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {visibleTrophies < fixtures.length && (
              <button onClick={handleLoadMore} className="list-title kf_hd1 margin_0">Charger plus</button>
            )}
          </div>
        )}
      </div>
                        
                  
                    
                
            </div>
        </section>
    </div>








   
      <Footer />
    </>
  );
};

export default StatisticTable;
