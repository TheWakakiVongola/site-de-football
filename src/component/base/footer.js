import React from 'react';

function Footer() {
  return (
    <div>      
      <footer className="kode_footer_2">
        <div className="container">
          <span className="go-up">
            <i className="fa fa-angle-up"></i>
          </span>
          <div className="row">
            <div className="col-md-3">
              <div className="widget widget_text">
                <div className="logo">
                  <a href="#"><img src="images/logo21.png" alt="" /></a>
                </div>
                <p>SportifElite : Votre source incontournable pour les dernières actualités sportives, analyses, et moments forts. Explorez l'univers de l'élite sportive avec des couvertures complètes, des interviews exclusives, et des analyses approfondies.</p>
                <ul className="kf_contact_meta">
                  <li>
                    <span className="icon-placeholder"></span>
                    <address> 24 rue du Bignon, Rennes 35000, France</address>
                  </li>
                  <li>
                    <span className="icon-mail"></span>
                    <p>SportifElite@contact.com</p>
                  </li>
                  <li>
                    <span className="icon-technology"></span>
                    <p>+ 33 7 49 95 77 20</p>
                  </li>
                </ul>
              </div>
            </div>
            {/* Column 2: Useful Links */}
            <div className="col-md-3">
            <div className="widget widget_link2">
                        <h2 className="kf_hd7">Aider</h2>
                        <ul className="links_dec links_dec2">
                            <li><a href="/Actualites">Actualités</a></li>
                            <li>
                                <a href="/Matchs" tyle="color:#ffbe00;">Matches</a>
                            </li>
                            <li>
                                <a href="/Equipes">Équipes</a>
                            </li>
                            <li>
                                <a href="/Players">Joueurs</a>
                            </li>
                            <li>
                                <a href="/Championnats">Championnats</a>
                            </li>
                            <li><a href="mailto:randomizer@gmail.com">Contactez-Nous</a></li>
                        </ul>
                    </div>
            </div>
            {/* Column 3: Recent Posts */}
            <div className="col-md-3">
            <div className="widget widget_recentpost2">
                        <h2 className="kf_hd7">Aider</h2>
                        <ul className="link_rnt_post">
                            <li>
                                <div className="kf_recentnews">
                                    <figure>
                                        <a href="#"><img src="static/extra-images/recent_3.jpg" alt="" /></a>
                                    </figure>
                                    <div className="text">
                                        <h6><a href="#">Titre des nouvelles récentes</a></h6>
                                        <p>Les Arch Rivals ont deux victoires majeures</p>
                                        <em className="kf_date">Août 23rd, 2023</em>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="kf_recentnews">
                                    <figure>
                                        <a href="#"><img src="static/extra-images/recent_4.jpg" alt=""/></a>
                                    </figure>
                                    <div className="text">
                                        <h6><a href="#">Titre des nouvelles récentes</a></h6>
                                        <p>Les Arch Rivals ont deux victoires majeures</p>
                                        <em className="kf_date">Août 23rd, 2023</em>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
            {/* Column 4: Instagram Widget */}
          </div>
        </div>
      </footer>
      
      <div className="copy_right3">
        <div className="container">
          <p>2024@SportifElite<a href="https://digitallearning.eletsonline.com/wp-content/uploads/2015/10/School-Marks.jpg">B2A</a></p>
          <ul className="kf_social3">
            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
            <li><a href="#"><i className="fa fa-rss"></i></a></li>
          </ul>
        </div>
      </div>

      {/* Search Modal */}
      <div className="modal fade" id="search" tabIndex="-1" role="dialog" aria-labelledby="search">
        <div className="modal-dialog" role="document">
          <div className="input_dec">
            <input type="text" placeholder="Rechercher ..." />
            <button className="btn_icon"><i className="fa fa-search"></i></button>
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default Footer;
