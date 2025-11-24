//1*Popup:

//recuperer les elements 
const addStudentBtn = document.getElementById("addStudentBtn");
const formContainer = document.getElementById("formContainer");
const cancelBtn = document.getElementById("cancelBtn");


//ouvrir popup
addStudentBtn.addEventListener("click",()=>{
    formContainer.classList.add("show");
});

//fermer popup en cliquant sur cancel
cancelBtn.addEventListener("click",()=>{
    formContainer.classList.remove("show");
})

//fermer popup si  on clique en dehors du formulaire
formContainer.addEventListener("click",(e)=>{
    if(e.target===formContainer){ 
        formContainer.classList.remove("show");
    }
})


//2*Ajout Etudiant

//recuperer element du formulaire
const form = document.getElementById("formulaire");
const studentsGrid = document.getElementById("studentsGrid");


