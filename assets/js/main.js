//! Common Code __________________________________________________________________________________________________________________________________
// !_________________________________________________________________________________________________________________________________________________

let nombreDeTache = document.getElementById("nombre-de-tache");
let nombre = 0;

let main = document.querySelector("main");

let ul;

function createParagrapheMessage() {
    main.innerHTML = `<p style="text-align: center; padding-top: 30px;" id="para" >Aucune tâche pour le moment</p>`
    main.style.height = "100px";
}

function getDateString() {
    let dateActuelle = new Date();

    let annee = dateActuelle.getFullYear();
    let mois = ('0' + (dateActuelle.getMonth() + 1)).slice(-2);
    let jour = ('0' + dateActuelle.getDate()).slice(-2);

    return `${jour}/${mois}/${annee.toString()}`;
}

function addEventsToButtons(itDone) {

    let allSmallsTodoTitle = document.querySelectorAll(".todo-titre");
    let smallTodoTitle = allSmallsTodoTitle[allSmallsTodoTitle.length - 1];
    let TodoTitle = smallTodoTitle.textContent;

    let allLi = document.querySelectorAll("li");
    let currentLi = allLi[allLi.length - 1];

    function addEventsToDivSupprimerBackground() {

 
        let allDivsSupprimerBackground = document.querySelectorAll(".supprimer-background");
        let divSupprimerBackground = allDivsSupprimerBackground[allDivsSupprimerBackground.length - 1];

        let allDivsCheck = document.querySelectorAll(".check-background");
        let DivCheck = allDivsCheck[allDivsCheck.length - 1];

        divSupprimerBackground.addEventListener("click", function () {

            function supprimerLiTask() {

                let listTodoData = JSON.parse(localStorage.getItem("listTodoData"));

                if (listTodoData.length === 1) {
                    localStorage.clear();
                }
                else {

                    listTodoData = listTodoData.filter(function (todoData) {
                        return todoData.titre != TodoTitle;
                    })

                    localStorage.setItem("listTodoData", JSON.stringify(listTodoData));
                }
                currentLi.remove();

                if (DivCheck.childNodes[1].getAttribute("class") === "fa fa-check") {
                    nombreDeTache.innerText = Number.parseInt(nombreDeTache.innerText) - 1;
                }

            }

            let isConfirmed = window.confirm(`etes-vous sur de vouloir supprimer cette tache : "${TodoTitle}" ? `);

            if (isConfirmed) {
                supprimerLiTask();

                if (ul.childElementCount === 0) {
                    ul.remove();

                    createParagrapheMessage();
                }
            }
        })
    }

    function addEventsToDivCheckBackground() {

        let AllDivsCheckBackground = "";

        if (itDone) {
            AllDivsCheckBackground = document.querySelectorAll(".times-background");
        }
        else {
            AllDivsCheckBackground = document.querySelectorAll(".check-background");
        }

        let divCheckBackground = AllDivsCheckBackground[AllDivsCheckBackground.length - 1];

        let iCheck = divCheckBackground.childNodes[1];

        divCheckBackground.addEventListener("click", function () {

            let listTodoData = JSON.parse(localStorage.getItem("listTodoData"));

            if (iCheck.getAttribute("class") === "fa fa-check") {

                currentLi.style.backgroundColor = "rgb(158, 253, 160)";

                iCheck.setAttribute("class", "fa fa-times");

                iCheck.style.marginLeft = "6px";
                iCheck.style.marginTop = "4px";
                this.style.backgroundColor = "purple";

                listTodoData = listTodoData.map(function (todoData) {
                    if (todoData.titre === TodoTitle) {
                        todoData.itDone = true;
                    }
                    return todoData;
                })

                nombreDeTache.innerText = Number.parseInt(nombreDeTache.innerText) - 1;
            }
            else {

                currentLi.style.backgroundColor = "white";

                iCheck.setAttribute("class", "fa fa-check");

                iCheck.style.marginLeft = "5px";
                iCheck.style.marginTop = "4px";
                this.style.backgroundColor = "green";

                listTodoData = listTodoData.map(function (todoData) {
                    if (todoData.titre === TodoTitle) {
                        todoData.itDone = false;
                    }
                    return todoData;
                })

                nombreDeTache.innerText = Number.parseInt(nombreDeTache.innerText) + 1;
            }

            localStorage.setItem("listTodoData", JSON.stringify(listTodoData));

        })
    }

    function addEventsToDivModifierBackground() {

        let allDivsModifierBackground = document.querySelectorAll(".modifier-background");
        let divModifierBackground = allDivsModifierBackground[allDivsModifierBackground.length - 1];

        divModifierBackground.addEventListener("click", function () {

            function isValidNewTodoTitre() {
                if (newTodoTitre === "") {
                    window.alert("Saisissez un titre !!!");
                    return false;
                }
                if (newTodoTitre === null) {
                    return false;
                }

                if (TodoTitle === newTodoTitre) {
                    window.alert("Vous n'avez pas modifié le titre de la tache !");
                    return false;
                }

                listTodoData = JSON.parse(localStorage.getItem("listTodoData"));
                if (listTodoData !== null) {

                    for (let i = 0; i < listTodoData.length; i++) {

                        if (listTodoData[i].titre.toLowerCase() === newTodoTitre.toLowerCase()) {
                            window.alert("cette tache existe déja !, Choisissez un autre titre");
                            return false;
                        }
                    }
                }

                return true;
            }

            let listTodoData;
            let newTodoTitre = window.prompt(`Saisissez le nouveau titre de cette tache`, TodoTitle);
            if (isValidNewTodoTitre()) {

                smallTodoTitle.textContent = newTodoTitre;
                TodoTitle = newTodoTitre;

                listTodoData = listTodoData.map(function (todoData) {
                    if (todoData.titre === TodoTitle) {
                        todoData.titre = newTodoTitre;
                    }
                    return todoData;
                })

                localStorage.setItem("listTodoData", JSON.stringify(listTodoData));
            }

        })
    }


    addEventsToDivSupprimerBackground();
    addEventsToDivCheckBackground();
    addEventsToDivModifierBackground();
}

function createNewLiTask(todoTitre, todoDate, itDone) {

    let liTask = document.createElement("li");

    if (itDone) {
        liTask.style.backgroundColor = "rgb(158, 253, 160)";
    }
    else {
        nombre++;
        liTask.style.backgroundColor = "white";
    }

    liTask.innerHTML = `
        <div class="row align-items-center my-row">

            <div class="col-12 col-sm-8" style="margin-bottom: 10px;">
                <small class="todo-titre">${todoTitre}</small>
                <br>
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <small class="todo-date">${todoDate}</small>
            </div>

            <div class="col-0 col-sm-1"></div>

            <div class="col-4 col-sm-1">
                <div class="supprimer-background">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
            </div>

            <div class="col-4 col-sm-1">
                <div class="${itDone ? "times-background" : "check-background"}">
                    <i class="${itDone ? "fa fa-times" : "fa fa-check"}" aria-hidden="true"></i>
                </div>
            </div>

            <div class="col-4 col-sm-1">
                <div class="modifier-background">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    
    `;

    return liTask;
}

function createNewUL() {
    main.innerHTML = `<ul></ul>`;
    main.style.backgroundColor = "#EEEEEC";
    main.style.height = "auto";
}

//! On Window Load __________________________________________________________________________________________________________________________________
// !_________________________________________________________________________________________________________________________________________________

if (localStorage.getItem('listTodoData') === null) {
    createParagrapheMessage();
}
else {
    let listTodoData = JSON.parse(localStorage.getItem("listTodoData"));

    createNewUL();

    ul = document.querySelector("ul");

    for (let i = 0; i < listTodoData.length; i++) {
        let liTask = createNewLiTask(listTodoData[i].titre, listTodoData[i].date, listTodoData[i].itDone);
        ul.appendChild(liTask);

        addEventsToButtons(listTodoData[i].itDone);
    }
}

nombreDeTache.innerText = nombre;



//! bouton ajouter __________________________________________________________________________________________________________________________________
// !_________________________________________________________________________________________________________________________________________________


let btnAjouter = document.getElementById("btn-ajouter");

btnAjouter.addEventListener("mouseover", function () {
    this.style.backgroundColor = "#522E91";
    this.style.border = "solid 1px white";
    document.querySelector(".plus-background i").style.color = "white";
})

btnAjouter.addEventListener("mouseout", function () {
    this.style.backgroundColor = "white";
    this.style.border = "none";
    document.querySelector(".plus-background i").style.color = "#522E91";
})

btnAjouter.addEventListener("click", function () {

    function addDataToLocalStorage(todoDate) {
        let todoData = {
            titre: todoTitre,
            date: todoDate,
            itDone: false
        };

        let listTodoData = JSON.parse(localStorage.getItem("listTodoData"));

        if (listTodoData === null) {
            listTodoData = [];
        }

        listTodoData.push(todoData);
        localStorage.setItem("listTodoData", JSON.stringify(listTodoData));
    }

    function isValidTodoTitre() {
        if (todoTitre === "") {
            window.alert("Saisissez un titre !!!");
            return false;
        }
        if (todoTitre === null) {
            return false;
        }

        let listTodoData = JSON.parse(localStorage.getItem("listTodoData"));
        if (listTodoData !== null) {
            for (let i = 0; i < listTodoData.length; i++) {
                if (listTodoData[i].titre.toLowerCase() === todoTitre.toLowerCase()) {
                    window.alert("La tache est déja enregistré");
                    return false;
                }
            }
        }


        return true;
    }


    let todoTitre = window.prompt("Saisissez le titre de la tache");
    if (isValidTodoTitre(todoTitre)) {

        let todoDate = getDateString();

        if (main.firstElementChild.id === "para") {

            document.getElementById("para").remove();
            createNewUL();
        }

        ul = document.querySelector("ul");

        let liTask = createNewLiTask(todoTitre, todoDate, false);

        ul.appendChild(liTask);

        addEventsToButtons();

        nombreDeTache.innerText = Number.parseInt(nombreDeTache.innerText) + 1;
        addDataToLocalStorage(todoDate);
    }


})



// !_________________________________________________________________________________________________________________________________________________

