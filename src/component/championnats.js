import React, { useState, useEffect } from 'react';
import Header from './base/header';
import Footer from './base/footer';

const Championnats = () => {
  const [leagues, setLeagues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 36;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?current=true', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'c46f0acb14msh545a438d97f102fp1024c9jsn1fa302832bfe',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        });
        const result = await response.json();
        setLeagues(result.response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredLeagues = leagues.filter(league =>
    league.league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredLeagues.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="innner_banner">
        <div className="container">
          <h3>Championnats</h3>
        </div>
      </div>
      <div className="kode_content_wrap">
        <section className="team_schedule_page">
          <div className="container">
            <h6 className="kf_hd1" style={{ marginLeft: '0' }}>
              <span>Championnats</span>
              <div id="search" tabIndex="-1" role="dialog" aria-labelledby="search">
                <div className="modal-dialog" role="document">
                  <div className="input_dec" style={{ width: "98%" }}>
                    <input
                      type="text"
                      placeholder="Search by league name..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button className="btn_icon"><i className="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </h6>
            {loading ? (
              <div>Chargement...</div>
            ) : filteredLeagues.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <div className="row">
                {currentItems.map(league => (
                  <li key={league.league.id} className="col-md-2 col-xs-6 mb-5">
                    <div className="card">
                      <div className="card-body">
                        <div className="widget widget_add">
                          <div className="add_banner">
                            <a href={`/Details_championnats/${league.league.id}`}>
                              <img
                                src={league.league.logo}
                                alt={league.league.name}
                                style={{ width: '200px', height: '200px', margin: '10px', border: '1px solid #ffbe00', padding: '10px' }}
                                title={league.league.name + ' ' + league.country.name}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            )}
            <div className="kode-pagination text-center">
              {Array.from({ length: Math.ceil(filteredLeagues.length / itemsPerPage) }, (_, i) => {
                const pageNumber = i + 1;
                const isCurrentPage = currentPage === pageNumber;
                const pageClass = isCurrentPage ? 'page-numbers current' : 'page-numbers';
                const isWithinRange = Math.abs(currentPage - pageNumber) <= 1;
                const isBoundary = pageNumber === 1 || pageNumber === Math.ceil(filteredLeagues.length / itemsPerPage);
                const isNearBoundary = pageNumber <= 3 || pageNumber > Math.ceil(filteredLeagues.length / itemsPerPage) - 2;
                const shouldDisplayPage = isCurrentPage || isBoundary || isNearBoundary || isWithinRange;

                return (
                  shouldDisplayPage && (
                    <span key={i} className={pageClass}>
                      {isCurrentPage ? (
                        <span>{pageNumber}</span>
                      ) : (
                        <a href="#" onClick={() => paginate(pageNumber)}>
                          {pageNumber}
                        </a>
                      )}
                    </span>
                  )
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Championnats;
