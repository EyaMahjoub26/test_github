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


form.addEventListener("submit",(e)=>{
    e.preventDefault();//empeche la page de se recharger
    //recuperer les donnees du formulaire
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value ;
    const phone = document.getElementById("telephone").value ;
    const course = document.getElementById("course").value ;
    const age = document.getElementById("age").value ;
    //photo
    const photoInput = document.getElementById("photo");
    let photoURL = "https://i.pravatar.cc/150"; //image par defaut
    if (photoInput.files && photoInput.files[0]) {
        photoURL = URL.createObjectURL(photoInput.files[0]);
    }
    //creer carte etudiant 
    const studentCard =document.createElement("div");
    studentCard.classList.add("student-card");
    studentCard.innerHTML = `
         <img src="${photoURL}" alt="Photo etudiant">
         <h3>${name}</h3>
         <p>${age}</p>
         <p>${email}</p>
         <p>${phone}</p>
         <p>${course}</p>
         <div class="actions">
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
         </div> `;
    //ajouter carte a la grille 
    studentsGrid.appendChild(studentCard);
    //bouton supprimer
    studentCard.querySelector(".delete-btn").addEventListener("click",()=>{
        studentCard.remove();
    });
    //bouton modifier
    studentCard.querySelector(".edit-btn").addEventListener("click",()=>{
        alert("fonction a implementer");
    });
    //fermer formulaire et reset
    formContainer.classList.remove("show");
    form.reset();

});
