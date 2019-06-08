(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        return pushState.apply(history, arguments);
    }
})(window.history);

/*
  window.onpopstate funkcija koja reaguje kad svaki put promjenimo url
  i funkcija ima event, a event u sebi dalje sadrzi event.state i event.state.song
  jer kad mjenjamo neki url sa history.pushState({ ... }, null, url)
  u taj push state posaljemo neke parametre, i onda kad se ovaj onpostate pozove,
  u eventu imamo te parametre koje smo poslali

  i onda dole provjeravamo, ako smo se prebacili na neki song page,
  onda imamo neki taj song parametar u tom objektu,
  a ako se vratimo na homepage, onda nismo nista proslijedili pa je taj event.state prazan
  i tad smo koristili taj else uslov
  a to smo koristili da na osnovu toga prikazemo odredjeni html
  ako postoji u tom state objektu song, onda smo koristili neki html za taj slucaj
  ako nemamo nista u tom state, onda prikazemo html za homepage
  i u tom slucaju sam napravio dvije funkcije getSongPageTemplate i getHomepageTemplate
  koje ti se nalaze u templateFunctions.js
*/
window.onpopstate = history.onpushstate = function(event) {
    const pageBlockElement = document.querySelector("#page-block");
    templates.renderTemplate(event.state, pageBlockElement);
};
