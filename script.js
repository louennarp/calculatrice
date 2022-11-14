const res = document.getElementById("result");
const toast = document.getElementById("toast");
let historique = [];
var compteurId = 0; // ce compteur permettra de donner un identifiant à chaque ligne de l'historique

function calcul(value) {
  const calculatedValue = eval(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Error";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    historique.push(new lineHisto(res.value, calculatedValue)) // mème si ici je n'en fais rien, je crée une liste pour des améliorations futures.
    document.getElementById('historique').innerHTML = ('<div id="lineN'+ compteurId +'"><div class="lineHisto">' + res.value + ' = ' + calculatedValue + '</div><input type="button" id="del-button" value="X" onclick="suprLine(\'lineN'+ compteurId +'\')"/> </div>') + document.getElementById('historique').innerHTML
    /*
    chaque nouvelle ligne de l'historique s'écrit comme suit

    --------------------------------------------

    <div id="lineN'+ compteurId +'">                                                                   <-- donne un identifiant à l'ensemble pour pouvoir le supprimer

      <div class="lineHisto">' + res.value + ' = ' + calculatedValue + '</div>                         <-- affiche le calcul
      <input type="button" id="del-button" value="X" onclick="suprLine(\'lineN'+ compteurId +'\')"/>   <-- bouton de suppression
    </div>
    */
    compteurId++
    res.value = calculatedValue;
  }
}

// fonction d'update du calcul
function liveScreen(enteredValue) {
  if (!res.value) {
    res.value = "";
  }
  if(enteredValue=='supr'){
    res.value = res.value.slice(0, -1); //on supprime le dernier caractère de la pile
  } else {
    res.value += enteredValue; //on ajoute ce caratère à la pile
  }
}

// fonction de copie dans le presse-papier
function copyToClipboard() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(res.value);
  }
}

function lineHisto(calcul,resultat){
  this.calcule = calcul;
  this.resulta = resultat;
}

function suprLine(lindID) {
  document.getElementById(lindID).remove()
}
