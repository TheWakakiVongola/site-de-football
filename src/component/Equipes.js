import React, { useState, useEffect } from 'react';
import Header from './base/header';
import Footer from './base/footer';

const Equipes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [teamsPerPage] = useState(20);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery]); // Fetch data when currentPage or searchQuery changes

    const fetchData = async () => {
        setLoading(true);
        const url = `https://api-football-v1.p.rapidapi.com/v2/teams/search/${searchQuery}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setSearchResults(result.api.teams || []);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset current page to 1 when performing a new search
        fetchData();
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = searchResults.slice(indexOfFirstTeam, indexOfLastTeam);

    return (
        <>
            <Header />
            <div className="innner_banner">
                <div className="container">
                    <h3>Equipes</h3>
                </div>
            </div>
            <div className="kode_content_wrap">
                <section className="team_schedule_page">
                    <div className="container">
                        <div className="kf_overview_contant">
                            <h6 className="kf_hd1 margin_0">
                                <span>List des Equipes</span>
                            </h6>
                            <div className="input_dec">
                                <input
                                    type="text"
                                    placeholder="Search teams..."
                                    value={searchQuery}
                                    onChange={handleChange}
                                />
                                <button className="btn_icon" onClick={handleSearch}><i className="fa fa-search"></i></button>
                            </div>
                            {loading ? (
                                <div>Chargement...</div>
                            ) : (
                                <>
                                    <ul className="kf_table2" style={{ minWidth: "0" }}>
                                        <li className="table_head">
                                            <div className="tb2_date">
                                                <span> </span>
                                            </div>
                                            <div className="tb2_date">
                                                <span>Equipe</span>
                                            </div>
                                            <div className="tb2_date">
                                                <span>Country</span>
                                            </div>
                                        </li>
                                        {currentTeams.map((team, index) => (
                                            <li key={index}>
                                                <div className="table_no">
                                                    <span>{team.rank}</span>
                                                </div>
                                                <div className="versus">
                                                    <div>
                                                        <div className="team_logo">
                                                            <span><img src={team.logo} alt={team.name} title={team.name} style={{ width: '20px', height: '20px' }} /></span>
                                                            <a href={`/Equipe/${team.team_id}`}>{team.name} </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="match_loss">
                                                    <span>{team.country}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="kode-pagination text-center">
                                        {[...Array(Math.ceil(searchResults.length / teamsPerPage)).keys()].map(number => (
                                            <span key={number} className={number + 1 === currentPage ? "page-numbers current" : "page-numbers"} onClick={() => paginate(number + 1)}>
                                                {number + 1}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Equipes;
