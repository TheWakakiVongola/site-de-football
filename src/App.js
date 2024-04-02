import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home';
import Championnats from './component/championnats';
import DetailsChampionnats from './component/Details_championnats';
import Equipes from './component/Equipes'
import EquipesStatistiques from './component/Statistiques_equipe';
import Players from './component/Joueurs'
import PlayerStatistique from './component/Statistique_joueur';
import Match from './component/Match';
import MatchStatistique from './component/Statistiques_match';
import H2H from './component/h2h';

import Actualites from './component/Actualites';
import Actualités_détails from './component/Actualités_détails';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Championnats" element={<Championnats />} />
          <Route path="/Details_championnats/:leagueId" element={<DetailsChampionnats />} />
          <Route path="/Equipes" element={<Equipes />} />
          <Route path="/Equipe/:teamId" element={<EquipesStatistiques />} />
          <Route path="/Players" element={<Players />} />
          <Route path="/Player/:playerId" element={<PlayerStatistique />} />
          <Route path="/Matchs" element={<Match />} />
          <Route path="/Match/:matchId/:leagueId" element={<MatchStatistique />} />
          <Route path="/h2h/:teamHome/:teamAway" element={<H2H />} />
          <Route path="/Actualites" element={<Actualites />} />
          <Route path="/Actualités_détails" element={<Actualités_détails />} />
          
          
          {/* Add more routes for other pages */}
        </Routes>
      </>
    </Router>
  );
}

export default App;