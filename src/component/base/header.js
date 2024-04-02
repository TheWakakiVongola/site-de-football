import React from 'react';

import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="kode_header_2">
      <div className="kf_top_bar">
        <div className="container">
          <div className="pull-left">
            <ul className="kf_social2">
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-youtube"></i></a></li>
              <li><a href="#"><i className="fa fa-instagram"></i></a></li>
            </ul>
          </div>
          <div className="kf_right_dec">
            <ul className="kf_user">
              <li><a href="#"><i className="fa fa-lock"></i>S'inscrire</a></li>
              <li><a href="#">Connexion</a></li>
            </ul>
            <Link to="/" data-toggle="modal" data-target="#search" className="kode_search"><i className="fa fa-search"></i></Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="kode_logo_bar">
          <div className="logo">
            <Link to="/">
              <img src="/static/images/logo21.png" height="80px" alt="Logo" />
            </Link>
          </div>
          <div className="kode_navigation">
            <ul className="nav">
              <li><Link to="/"  style={{ color: window.location.pathname === "/" ? "#ffbe00" : "" }}>Accueil</Link></li>
              <li><Link to="/Actualites"  style={{ color: window.location.pathname === "/Actualites" ? "#ffbe00" : "" }}>Actualités</Link></li>
              <li><Link to="/Matchs"  style={{ color: window.location.pathname === "/Matchs" ? "#ffbe00" : "" }}>Matches</Link></li>
              <li><Link to="/Equipes"  style={{ color: window.location.pathname === "/Equipes" ? "#ffbe00" : "" }}>Équipes</Link></li>
              <li><Link to="/Players"  style={{ color: window.location.pathname === "/Players" ? "#ffbe00" : "" }}>Joueurs</Link></li>
              <li><Link to="/Championnats"  style={{ color: window.location.pathname === "/Championnats" ? "#ffbe00" : "" }}>Championnats</Link></li>
              <li><a href="#"  style={{ color: window.location.pathname === "/contact" ? "#ffbe00" : "" }}>Contactez-Nous</a></li>
            </ul>

            <div id="kode-responsive-navigation" className="dl-menuwrapper">
              <button className="dl-trigger">Open Menu</button>
              <ul className="dl-menu">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/Actualites">Actualités</Link></li>                <li>
                  <Link to="/Matches" style={{ color: '#ffbe00' }}>Matches</Link>
                </li>
                <li>
                  <Link to="/Equipes">Équipes</Link>
                </li>
                <li>
                  <Link to="/Joueurs">Joueurs</Link>
                </li>
                <li>
                  <Link to="/Championnats">Championnats</Link>
                </li>
                <li><Link to="#">Contactez-Nous</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}

export default Header;