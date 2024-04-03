import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './base/header';
import Footer from './base/footer'

function Home() {
    const [liveMatches, setLiveMatches] = useState([]);
    const [fixtures, setTodayFixtures] = useState([]);
    //const [LastDayFixtures, setLastDayFixtures] = useState([]);
    //const [TomorrowFixtures, setTomorrowFixtures] = useState([]);
    //const [loading, setLoading] = useState(false);

    const [visibleMatches, setVisibleMatches] = useState(20);

    const [standings, setStandings] = useState([]);
    const [lastleague, setLast] = useState([]);
    useEffect(() => {
      

        async function fetchlastmatch() {
            try {
                const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=61&last=10`, {
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
            } catch (error) {
                console.error('Error fetching last match:', error);
            }
        }
        
        fetchlastmatch();

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
                const liveMatch = data.response[0]; // Récupère le premier match du tableau
                setLiveMatches([liveMatch]); // Définit le tableau avec un seul match
            } catch (error) {
                console.error('Error fetching live matches:', error);
            }
        };

        fetchLiveMatches();

        async function fetchStandings() {
            try {
                const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=61`;
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
            } catch (error) {
                console.error('Error fetching standings:', error);
            }
        }

        fetchStandings();
    }, []);

  return (
    <>
      <Header />
      {liveMatches.slice(0, visibleMatches).map((match, index) => (
    <div className="kode_banner_1">
        <div className="main_banner">
            <div className="thumb">
                <img src="static/extra-images/banner1.jpg" alt="" />
                <div className="container">
                    <div className="banner_caption text-center">
                        <h6 className="kf_h4">
                            <div className="team_logo">
                                <span><img src={match.league.logo} alt={match.league.logo} title={match.league.logo} style={{ width: '50px', height: '50px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} /></span>
                                <a href={`/Details_championnats/${match.league.id}`}>
                                    <span><br/>{match.league.name}</span>
                                </a>
                            </div>
                            <em>En Direct</em>
                        </h6>
                        <div className="kf_opponents_wrap">
                            <div className="kf_opponents_dec">
                                <span><img src={match.teams.home.logo} alt="" /></span>
                                <div className="text">
                                    <p style={{ fontSize: 'large' }}><a href={`/Equipe/${match.teams.away.id}`}>{match.teams.home.name}</a></p> 
                                    <p><br/>{match.league.country}</p>
                                </div>
                            </div>
                            <div className="kf_opponents_gols">
                                <span style={{color : 'white'}}>{match.fixture.status.short !== 'FT' ? `${match.fixture.status.long}` : ''}
                                    <p>{match.fixture.status.short !== 'FT' ? `${match.fixture.status.elapsed}'` : ''}</p>
                                    <br/>{match.goals.home} - {match.goals.away}
                                </span>
                                <h5><a style={{ width: "100%" }} href={`/Match/${match.fixture.id}/${match.league.id}`} className="input-btn">Match En Direct </a></h5>
                            </div>
                            <div className="kf_opponents_dec span_right">
                                <span><img src={match.teams.away.logo} alt="" /></span>
                                <div className="text">
                                    <p style={{ fontSize: 'large' }}><a href={`/Equipe/${match.teams.away.id}`}>{match.teams.away.name}</a></p>
                                    <p><br/>{match.league.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
))}
      



    <div className="kf_ticker-wrap">
        <div className="container">
            <div className="kf_ticker">
                <span >Urgent</span>
                <div className="kf_ticker_slider">
                    <ul className="ticker">
                        <li><p> Kylian Mbappé bat un dernier record avant son départ ? </p></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className="kode_content_wrap">
      
      
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                     
                        <div className="kf_featured_slider">
                       
                            <h6 className="kf_hd1">
                                <span>Dernières actualité</span>
                            </h6>
                       
                            <div className="featured_slider">
                                <div>
                                    <div className="kf_featured_thumb">
                                        <figure>
                                            <img src="static/extra-images/feature_slider.jpg" alt="" />
                                        </figure>
                                        <div className="text">
                                            <h6>Coupe d'Afrique des Nations 2024</h6>                                
                                            <h2><a href="">Maroc vs Côte d'Ivoire</a></h2>
                                            <span>11 Jan, 2024 / Grand Stade de Casablanca</span>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                 
                        <div className="kf_featured_wrap2">
                        
                            <div className="kf_featured_thumb">
                                <figure>
                                    <img src="static/extra-images/feature_1.jpg" alt="" />
                                </figure>
                                <div className="text_wrper">
                                    <div className="text">
                                        <h6>Fifa Europa League 2023</h6>                                
                                        <h2><a href="#">Rennes</a> <small>VS</small><a href="#"> AC Milan</a></h2>
                                        <span>11 Sep, 2024 / Roazhon Park</span>
                                        <p>Rennes crée la surprise en battant l'AC Milan 3-2 lors d'un match palpitant de l'Europa League ... </p>
                                        <a className="btn_2" href="/Actualités_détails">Lire plus</a>
                                    </div>
                                    <div className="thumb_footer">
                                        <div className="admin_thumb">
                                            <figure><img src="static/extra-images/admin.jpg" alt="" /></figure>
                                            <h6><a href="#">Alba Smith</a></h6>
                                        </div>
                                        <ul className="blog_meta">
                                            <li>
                                                <span><i className="fa fa-eye"></i>169</span>
                                            </li>
                                            <li>
                                                <span className="heart"><i className="fa fa-heart-o"></i>477</span>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fa fa-comment-o"></i>09</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="kf_featured_thumb">
                                <div className="text_wrper">
                                    <div className="text">
                                        <h6>Le courrier de l'Ouest</h6>                                
                                       <h2><a href="#">Italy</a> <small>VS</small><a href="#"> England</a></h2>
                                        <h2><a href="https://www.ouest-france.fr/sport/football/foot-amateur/deux-sevres-football-club-au-tallud-les-desnoues-sont-au-stade-comme-a-la-maison-47fc844c-e50b-11ee-b685-1479f5265e87">Deux-Sèvres football club. Au Tallud, les Desnoues sont au stade comme à la maison</a></h2>
                                        <span>Mardi 19 mars</span>
                                        <p>Il est bien rare qu’on ne trouve pas plusieurs fois le même patronyme sur les feuilles de match de foot amateur. Fidèles du Tallud, Corentin et Clément Desnoues, qui y évoluent </p>
                                        <a className="btn_2" href="https://www.ouest-france.fr/sport/football/foot-amateur/deux-sevres-football-club-au-tallud-les-desnoues-sont-au-stade-comme-a-la-maison-47fc844c-e50b-11ee-b685-1479f5265e87">Lire plus</a>
                                    </div>
                                    <div className="thumb_footer">
                                        <div className="admin_thumb">
                                            <figure><img src="static/extra-images/admin.jpg" alt="" /></figure>
                                            <h6><a href="#">Alba Smith</a></h6>
                                        </div>
                                        <ul className="blog_meta">
                                            <li>
                                                <span><i className="fa fa-eye"></i>169</span>
                                            </li>
                                            <li>
                                                <span className="heart"><i className="fa fa-heart-o"></i>477</span>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fa fa-comment-o"></i>09</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <figure>
                                    <img src="https://media.ouest-france.fr/v1/pictures/MjAyNDAzMTM4YTkxY2JkYmE5ZTQ5Zjk2Mjk0NTRhOGNmNzM4NjA?width=940&focuspoint=50%2C25&cropresize=1&client_id=bpeditorial&sign=57947d55c2b5feebe3c0d4d593a47a024389870ad1113849a31593b6d23ac232" alt="" />
                                </figure>
                            </div>
                         
                        </div>
                        <div className="kf_featured_wrap3">
                            <div className="row">
                                <div className="col-md-6">
                            
                                    <div className="kf_featured_thumb">
                                        <figure>
                                            <img src="https://maville.com/photosmvi/2024/03/18/P34015895D6205146G.jpg" alt="" />
                                        </figure>
                                        <div className="text_wrper">
                                            <div className="text">
                                                <h6>Ouest France</h6>                                
                                                <h2><a href="https://dinan.maville.com/sport/detail_-football.-apres-le-chaos-contre-trabzonspor-fenerbahce-envisage-de-quitter-la-super-lig-_54135-6205146_actu.Htm">Après le chaos contre Trabzonspor, Fenerbahçe envisage de quitter la Süper Lig</a></h2>
                                                <span>Lundi 18 mars 2024</span>
                                                <p>Au lendemain d’une violente bagarre successive à l’envahissement du terrain à Trabzon, la direction du club de Fenerbahçe a annoncé, ce lundi 18 mars, envisager de se retirer de la Süper Lig, le championnat turc de football. </p>
                                                <a className="btn_2" href="https://dinan.maville.com/sport/detail_-football.-apres-le-chaos-contre-trabzonspor-fenerbahce-envisage-de-quitter-la-super-lig-_54135-6205146_actu.Htm">Lire plus</a>
                                            </div>
                                            <div className="thumb_footer">
                                                <div className="admin_thumb">
                                                    <figure><img src="static/extra-images/admin.jpg" alt="" /></figure>
                                                    <h6><a href="#">Alba Smith</a></h6>
                                                </div>
                                                <ul className="blog_meta">
                                                    <li>
                                                        <span><i className="fa fa-eye"></i>169</span>
                                                    </li>
                                                    <li>
                                                        <span className="heart"><i className="fa fa-heart-o"></i>477</span>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa fa-comment-o"></i>09</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                            
                                </div>
                                <div className="col-md-6">
                              
                                    <div className="kf_featured_thumb">
                                        <figure>
                                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2-prod.mirror.co.uk%2Fincoming%2Farticle1928210.ece%2FALTERNATES%2Fs615%2FBrazil-v-England-International-Friendly.jpg&f=1&nofb=1&ipt=e12329075decf8f66d827a3f93c0d6f12b53a7e43b13e14a0bf04e931581f903&ipo=images" alt="" />
                                        </figure>
                                        <div className="text_wrper">
                                            <div className="text">
                                                <h6>Fifa world cup 2023</h6>                                
                                                <h2><a href="#">Angleterre</a> <small>VS</small><a href="#"> Brésil</a></h2>
                                                <span>23 Mar, 2024 / Wembley Stadium</span>
                                                <p>Suivez en live sur Foot Mercato, le match de Friendlies 1 de Matchs Amicaux entre Angleterre et Brésil. Ce match aura lieu le samedi 23 mars 2024 à 20:00. Retrouvez les stats, les compositions, les buts et les buteurs pour suivre le score en direct. N'hésitez pas à commenter et débattre du match en direct avec la communauté. </p>
                                                <a className="btn_2" href="/Actualités_détails">Lire plus</a>
                                            </div>
                                            <div className="thumb_footer">
                                                <div className="admin_thumb">
                                                    <figure><img src="static/extra-images/admin.jpg" alt="" /></figure>
                                                    <h6><a href="#">Alba Smith</a></h6>
                                                </div>
                                                <ul className="blog_meta">
                                                    <li>
                                                        <span><i className="fa fa-eye"></i>169</span>
                                                    </li>
                                                    <li>
                                                        <span className="heart"><i className="fa fa-heart-o"></i>477</span>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa fa-comment-o"></i>09</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                              
                                </div>
                                <div class="col-md-6">
                                    <div class="kf_featured_thumb">
                                        <figure>
                                            <img src="https://assets-fr.imgfoot.com/media/cache/1200x675/thierry-henry-60521394ab51f.jpg" alt=""/>
                                        </figure>
                                        <div class="text_wrper">
                                            <div class="text">
                                                <h6>JO, Real Mardrid</h6>                                
                                                <h2><a href="https://www.footmercato.net/a7823694062334534699-jo-real-madrid-les-espoirs-et-les-doutes-de-thierry-henry-sur-kylian-mbappe">JO, Real Madrid : les espoirs et les doutes de Thierry Henry sur Kylian Mbappé</a></h2>
                                                <span>20 Mar, 2024</span>
                                                <p>Thierry Henry ne renonce pas facilement. Il assure encore espérer bénéficier de l’apport de Kylian Mbappé dans son équipe pour les Jeux Olympiques. Et attend de voir où l’attaquant va véritablement signer… </p>
                                                <a class="btn_2" href="https://www.footmercato.net/a7823694062334534699-jo-real-madrid-les-espoirs-et-les-doutes-de-thierry-henry-sur-kylian-mbappe">Lire plus</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="text_wrap">
                                        <div class="text_2">
                                            <span class="label2">beIN Sport</span>
                                            <h6><a href="https://www.beinsports.com/fr-fr/football/articles/dani-alves-pourrait-sortir-de-prison-ds-aujourdhui-2024-03-19">Dani Alves pourrait sortir de prison dès aujourd'hui</a></h6>
                                            <em class="kf_date">10 September, 2023</em>
                                            <p>Condamné à quatre ans et demi de prison, Dani Alves pourrait se voir accorder une liberté provisoire dès aujourd'hui. </p>
                                        </div>
                                        <div class="text_2">
                                            <span class="label2">MSN</span>
                                            <h6><a href="https://www.msn.com/fr-fr/sport/football/le-slogan-et-le-logo-de-la-coupe-du-monde-de-football-2030-d%C3%A9voil%C3%A9s/ar-BB1kcEZf">Le slogan et le logo de la Coupe du monde de football 2030 dévoilés</a></h6>
                                            <em class="kf_date">20 Mar, 2024</em>
                                            <p>L’Espagne, le Maroc et le Portugal co-organiseront le Mondial 2030. Le slogan et le logo de cette Coupe du monde ont été dévoilés. « Yalla Va... </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kf_featured_wrap2">
                            <h6 class="kf_hd1">
                                <span>Nouvelles Tendances</span>
                            </h6>
                            <div class="kf_featured_thumb">
                                <div class="text_wrper">
                                    <div class="text">
                                        <h6>Foot Mercato</h6>                                
                                        <h2><a href=" https://www.footmercato.net/a2843034648612498821-que-devient-la-selection-de-la-russie">Que devient la sélection de la Russie ?</a></h2>
                                        <span>19 Mar, 2024</span>
                                        <p>En guerre avec l’Ukraine depuis deux ans, la Russie n’a pas disputé un match officiel depuis novembre 2021. Une longue période en marge du footba... </p>
                                        <a class="btn_2" href=" https://www.footmercato.net/a2843034648612498821-que-devient-la-selection-de-la-russie">Lire plus</a>
                                    </div>
                                    <div class="thumb_footer">
                                        <div class="admin_thumb">
                                            <figure><img src="extra-images/admin.jpg" alt=""/></figure>
                                            <h6><a href="#">Alba Smith</a></h6>
                                        </div>
                                        <ul class="blog_meta">
                                            <li>
                                                <span><i class="fa fa-eye"></i>169</span>
                                            </li>
                                            <li>
                                                <span class="heart"><i class="fa fa-heart-o"></i>477</span>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fa fa-comment-o"></i>09</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <figure>
                                    <img src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2023/03/29/3671198-74732888-2560-1440.jpg" alt=""/>
                                </figure>
                            </div>
                            <div class="kf_featured_thumb">
                                <figure>
                                    <img src="static/extra-images/feature_1.jpg" alt=""/>
                                </figure>
                                <div class="text_wrper">
                                    <div class="text">
                                        <h6>Fifa world cup 2023</h6>                                
                                        <h2><a href="https://www.lequipe.fr/Football/Actualites/Fin-de-saison-pour-thibaut-courtois-de-nouveau-gravement-blesse-a-un-genou/1455653">Fin de saison pour Thibaut Courtois, de nouveau gravement blessé à ...</a></h2>
                                        <span>19 Mar, 2024</span>
                                        <p>Quelques semaines après son retour après une rupture du ligament croisé antérieur du genou gauche, Thibaut Courtois s'est blessé à l'entraînement avec le Real Madrid. Il souffre cette fois-ci d'une rupture du ménisque du genou droit. </p>
                                        <a class="btn_2" href="https://www.lequipe.fr/Football/Actualites/Fin-de-saison-pour-thibaut-courtois-de-nouveau-gravement-blesse-a-un-genou/1455653">Lire plus</a>
                                    </div>
                                    <div class="thumb_footer">
                                        <div class="admin_thumb">
                                            <figure><img src="static/extra-images/admin.jpg" alt=""/></figure>
                                            <h6><a href="#">Alba Smith</a></h6>
                                        </div>
                                        <ul class="blog_meta">
                                            <li>
                                                <span><i class="fa fa-eye"></i>169</span>
                                            </li>
                                            <li>
                                                <span class="heart"><i class="fa fa-heart-o"></i>477</span>
                                            </li>
                                            <li>
                                                <a href="#"><i class="fa fa-comment-o"></i>09</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kf_featured_wrap4">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="kf_featured_thumb4">
                                        <figure>
                                            <img src="https://assets-fr.imgfoot.com/media/cache/640xauto/maillots-adidas-euro.jpg" alt=""/>
                                        </figure>
                                        <div class="text">
                                            <h5 class="lable_1">Euro 2024</h5>
                                            <h6><a href="https://www.lequipe.fr/Football/Actualites/Decouvrez-les-maillots-des-selections-pour-l-euro-2024/1455466">Découvrez les maillots des sélections pour l'Euro 2024</a></h6>
                                            <span>18 Mar, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="kf_featured_thumb4">
                                        <figure>
                                            <img src="https://assets-fr.imgfoot.com/media/cache/1200x675/om-tudor.jpg" alt=""/>
                                        </figure>
                                        <div class="text">
                                            <h5 class="lable_1">Olympique de Marseille</h5>
                                            <h6><a href="https://www.footmercato.net/a7789688547385768845-lazio-igor-tudor-veut-piller-lom">Lazio : Igor Tudor veut piller l’OM !</a></h6>
                                            <span>20 Mar, 2024</span>
                                        </div>
                                    </div>                                  
                                </div>
                            </div>
                        </div>
                     
                    </div>
                    <aside className="col-md-4">
                     
                    <div className="widget widget_ranking widget_league_table">
                                        <h6 className="kf_hd1">
                                            <span>CLASSEMENT LEAGUE 1</span>
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
                    
                        {/*<div className="widget widget_recentnews gallery">
                         
                            <h6 className="kf_hd1">
                                <span>Actualité</span>
                            </h6>
                          
                            <div className="kf_border">
                               
                                <div className="kf_recentnews">
                                    <figure>
                                        <a href="static/extra-images/recent_1.jpg">
                                            <img src="static/extra-images/recent_1.jpg" alt="" />
                                        </a>
                                    </figure>
                                    <div className="text">
                                        <h6><a href="#">Recent News Heading</a></h6>
                                        <p>Les Arch Rivals ont deux victoires majeures</p>
                                        <em className="kf_date">Août 23rd, 2023</em>
                                    </div>
                                </div>
                               
                                <div className="kf_recentnews">
                                    <figure>
                                        <a href="#"><img src="static/extra-images/recent_2.jpg" alt="" /></a>
                                    </figure>
                                    <div className="text">
                                        <h6><a href="#">Recent News Heading</a></h6>
                                        <p>Les Arch Rivals ont deux victoires majeures</p>
                                        <em className="kf_date">Août 23rd, 2023</em>
                                    </div>
                                </div>
                               
                                <div className="kf_recentnews">
                                    <figure>
                                        <a href="#"><img src="static/extra-images/recent_3.jpg" alt="" /></a>
                                    </figure>
                                    <div className="text">
                                        <h6><a href="#">Recent News Heading</a></h6>
                                        <p>Les Arch Rivals ont deux victoires majeures</p>
                                        <em className="kf_date">Août 23rd, 2023</em>
                                    </div>
                                </div>
                               
                                <div className="kf_recentnews">
                                    <figure>
                                        <a href="#"><img src="static/extra-images/recent_4.jpg" alt="" /></a>
                                    </figure>
                                    <div className="text">
                                        <h6><a href="#">Recent News Heading</a></h6>
                                        <p>Les Arch Rivals ont deux victoires majeures</p>
                                        <em className="kf_date">Août 23rd, 2023</em>
                                    </div>
                                </div>
                             
                            </div>
                                                </div>    */}                   
                        <div className="widget widget_newsletter">
                          
                            <h6 className="kf_hd1">
                                <span>bulletins d'information</span>
                            </h6>
                          
                            <div className="kf_border">
                                <div className="newsletter_dec">
                                    <h6>Inscrivez-vous maintenant!</h6>
                                    <p>Lorem 9 ipsum dolor sit amet, sadipscing elitr, sed diam nonumy eirmod tempor </p>
                                  
                                    <div className="input_dec">
                                        <input type="text" placeholder="Votre Nom" />
                                    </div>
                                  
                                    <div className="input_dec">
                                        <input type="text" placeholder="Votre Adresse E-mail" />
                                    </div>
                                  
                                  
                                   
                                    <input className="input-btn" type="button" value="Subscribe" />
                                </div>
                            </div>
                        </div>
                       
                        <div className="widget widget_poll">
                           
                            <h6 className="kf_hd1">
                                <span>Le meilleur du foot</span>
                            </h6>
                        
                            <div className="kf_poll_dec">
                                <h6>Qui sera le meilleur vainqueur de la Golden League</h6>
                             
                                <div className="radio_style1">
                                    <label className="radio_dec">
                                        <span className="radio">
                                            <input name="foo" value="1" checked={true} type="radio"/>
                                            <span className="radio-value" aria-hidden="true"></span>
                                        </span>
                                        <span>Leonal Messi</span>
                                    </label>
                                    <label className="radio_dec">
                                        <span className="radio">
                                            <input name="foo" value="1" type="radio"/>
                                            <span className="radio-value" aria-hidden="true"></span>
                                        </span>
                                        <span>Cristiano Ronaldo</span>
                                    </label>
                                    <label className="radio_dec">
                                        <span className="radio">
                                            <input name="foo" value="1" type="radio"/>
                                            <span className="radio-value" aria-hidden="true"></span>
                                        </span>
                                        <span>Mbappé</span>
                                    </label>
                                </div>
                            
                                <input className="input-btn" type="button" value="submit" />
                            </div>
                          
                        </div>
                       
                    
                      
                    </aside>
                </div>
            </div>
        </section>
    </div>
      <Footer/>
      </>
    );
};


export default Home;