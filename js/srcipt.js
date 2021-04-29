/* -------------------FONCTIONS---------------------- */

// fonction calcul de la somme desPrix TTC
function calculSommePrixTtc() {
    let tableauTotalTtc = $('.prixTtc');
    let somme = 0;
    for (let i = 0; i < tableauTotalTtc.length; i++) {

        let tableauTotalTtc = $('.prixTtc');
        somme += parseFloat($(tableauTotalTtc[i]).val());

    }
    $('#total').val(somme);
};

/* fonction affichage des alerte */
function affichageAlert(couleurBootrap, text) {

    // Vide l'ID si elle existe deja
    $('#hiddenDiv').replaceWith();
    /* création de la nvlle ID */
    let newHiddenDiv = $('<div id="hiddenDiv" class="w-75 m-auto alert alert-' + couleurBootrap + ' alert-dismissible fade show" role="alert"><strong>' + text + '</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    /* affichage */
    $('header').append(newHiddenDiv);
};

// --------------- ACTION SUR LA 1ERE LIGNE ----------------

// BOUTON CALCULER / class="btnCalculer
let btnCalculer = $('.btnCalculer');
/* event */
btnCalculer.on('click', function() {

    // Vide l'ID si elle existe deja
    $('#hiddenDiv').replaceWith();
    /* selection des valeurs Ht et TVA selectionnée, et de la case Ttc */
    let valeurPrixHt = $(this).closest('tr').find('.prixHt').val();
    let valeurTvaSelect = $(this).closest('tr').find('.seclectTVA').val();
    let casePrixTtc = $(this).closest('tr').find('.prixTtc');
    casePrixTtc.removeClass("bg_lightYellow").addClass("bg_lightGreen");
    // calcul de la TVA arrondie a 2 chiffre apres la virgule
    let valeurPrixTtc = parseFloat((valeurPrixHt * valeurTvaSelect)).toFixed(2);
    // affichage du calcul dans la cas prixTtc
    casePrixTtc.val(valeurPrixTtc);

    /* une foi le calcul fait, faire évoluer le total si on change la TVA*/
    let seclectTVA = $(this).closest('tr').find('.seclectTVA');
    /* event */
    seclectTVA.on('click', function() {

        let newValeurTvaSelect = $(this).closest('tr').find('.seclectTVA').val();
        let newValeurPrixTtc = parseFloat(valeurPrixHt * newValeurTvaSelect).toFixed(2);
        casePrixTtc.val(newValeurPrixTtc);
        //appel fonction calculSommePrixTtc pour recalculer la somme
        calculSommePrixTtc();
    });
    //appel fonction calculSommePrixTtc pour recalculer la somme
    calculSommePrixTtc();

});

// BOUTON EFFACER / class="btnEffacer
let btnEffacer = $('.btnEffacer');
/* event */
btnEffacer.on('click', function() {
    /* (new_line.find("input:number")).val("") */
    // Vide l'ID si elle existe deja
    $('#hiddenDiv').replaceWith();
    /* Vide les champs */
    $(this).closest('tr').find("input").val("");
    $(this).closest('tr').find('.prixTtc').val('0.00');
    $(this).closest('tr').find('.prixTtc').removeClass().addClass("prixTtc form-control bg_lightYellow");
    //appel fonction calculSommePrixTtc pour recalculer la somme
    calculSommePrixTtc();

});

// BOUTON SUPPRIMER / class="btnSupprimer
let btnSupprimer = $('.btnSupprimer');
/* event */
btnSupprimer.on('click', function() {

    // Vide l'ID si elle existe deja
    $('#hiddenDiv').replaceWith();
    /* Condition : Si le clic du bouton se faite sur la tr du tbody qui possede l'index 0 (1ere ligne) => alert; sinon on la supprime*/
    if ($(this).closest('tbody tr').index() == 0) {
        affichageAlert("danger", "Vous ne pouvez pas supprimer la 1ere ligne !");
    } else {

        $(this).closest('tr').replaceWith();

    }
    //appel fonction calculSommePrixTtc pour recalculer la somme
    calculSommePrixTtc();
});

// ---------------- BOUTONS DU HEADER ------------------------


// AJOUTER UNE LIGNE
let btnAddHeader = $('#btnAddHeader');
/* event */
btnAddHeader.on('click', function() {

    // Action du bouton : cloner la 1ère ligne, retirer l'id, vider les champs, afficher à la fin de tbody , afficher l'alerte ******

    //  Clonage de la ligne de base
    ligneClone = $('#ligne').clone(true).attr('id', '');
    ligneClone.find("input").val('');
    ligneClone.find('.prixTtc').removeClass().addClass("prixTtc form-control bg_lightYellow");

    // affichage de la ligne
    $('tbody').append(ligneClone);

    // affichage du message alert ********
    affichageAlert("success", "Ligne ajoutée!");
});

// SUPPRIMER UNE LIGNE
let btnSuppressHeader = $('#btnSuppressHeader');
btnSuppressHeader.on('click', function() {

    // Action du bouton : supprimer la derniere tr du tableau (sauf la 1ère) , afficher le message d'alerte, recalculer la somme******
    $("tbody tr:last:not(#ligne)").replaceWith();
    // affichage du message alert ******
    affichageAlert("warning", "La dernière ligne a été supprimée!");
    //appel fonction calculSommePrixTtc pour recalculer la somme
    calculSommePrixTtc();

});

/* SUPPRIMER TOUS LES CHAMPS */
let btnDeleteHeader = $('#btnDeleteHeader');
/* event */
btnDeleteHeader.on('click', function() {

    // Action du bouton  : vider les champs, mettre la somme a 0, afficher le message d'alerte. ******
    $("input").val("");
    // affichage du message alert ******
    affichageAlert("danger", "Vous avez vider tous les Champs !");
    ligneClone.find('.prixTtc').removeClass().addClass("prixTtc form-control bg_lightYellow");

});