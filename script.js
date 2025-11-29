//1*Popup:

//recuperer les elements 
const addStudentBtn = document.getElementById("addStudentBtn");
const formContainer = document.getElementById("formContainer");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("formulaire");
const studentsGrid = document.getElementById("studentsGrid");


//ouvrir popup
addStudentBtn.addEventListener("click",()=>{
    editIndex = null;  // repasser en mode ajout
    form.reset(); 
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
//-------------------------------------------------------------------------------------------------------------------

//2* LocalStorage

//charger les etudiants au demarage
let students = JSON.parse(localStorage.getItem("students")) || [];

//sauvegarder dans localStorage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}
//---------------------------------------------------------------------------------------------------------------------

//3* Affichage des etudiants
function displayStudents() {
    studentsGrid.innerHTML = ""; //vider laffichage avant de reconstruire
    students.forEach((student,index) => {
        const card = document.createElement("div");
        card.classList.add("student-card");
        card.innerHTML = `
           <img src="${student.photo}" alt="Photo etudiant">
           <h3>${student.name}</h3>
           <p>Age : ${student.age}</p>
           <p>Email : ${student.email}</p>
           <p>Phone : ${student.phone}</p>
           <p>Course : ${student.course}</p>
           <div class ="actions">
              <button class="delete-btn" data-index="${index}">Delete</button>
              <button class="edit-btn" data-index="${index}">Edit</button>
           </div>
        `;
        studentsGrid.appendChild(card);
    });
    attachDeleteButtons();
    attachEditButtons();
}
//--------------------------------------------------------------------------------------------------------------

//4* ajout etudiant

form.addEventListener("submit",(e)=>{
    e.preventDefault(); //empeche la page de se recharger

//recuperer les donnees du formulaire
const name = document.getElementById("name").value;
const email = document.getElementById("email").value ;
const phone = document.getElementById("telephone").value ;
const course = document.getElementById("course").value ;
const age = document.getElementById("age").value ;

//photo
const photoInput = document.getElementById("photo");
let photoURL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; //image par defaut
if (photoInput.files && photoInput.files[0]) {
    photoURL = URL.createObjectURL(photoInput.files[0]);
}

 //mode ajout
if(editIndex === null) {
const newStudent = {
    name,
    email,
    phone,
    course,
    age,
    photo: photoURL || "https://i.pravatar.cc/150"
};
students.push(newStudent);
}
//mode edit
else {
    students[editIndex].name = name;
    students[editIndex].email = email;
    students[editIndex].phone = phone;
    students[editIndex].course = course;
    students[editIndex].age = age;
    // mettre à jour la photo uniquement si une nouvelle est choisie
    if (photoURL) {
        students[editIndex].photo = photoURL;
    }
    editIndex = null; // reset
}
saveStudents();
//reafficher
displayStudents();
//fermer popup et reset form
formContainer.classList.remove("show");
form.reset();
});
//---------------------------------------------------------------------------------------------------------------------------

//5* delete student
function attachDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index"); //recupere lindice
            students.splice(index,1); // supprime letudiant du tableau
            saveStudents(); //met a jur localstorage
            displayStudents(); //reafiche grille
        });
    });

}
//---------------------------------------------------------------------------------------------------------------------------


//6* edit studnent
let editIndex = null; //sauvegarde lindex de letudiant a modifier
function attachEditButtons () {
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            editIndex = btn.getAttribute("data-index"); // on sauvegarde l'index
            // récupérer l'étudiant a modifier
            const student = students[editIndex];
            // remplir le formulaire
            document.getElementById("name").value = student.name;
            document.getElementById("email").value = student.email;
            document.getElementById("telephone").value = student.phone;
            document.getElementById("course").value = student.course;
            document.getElementById("age").value = student.age;
            document.getElementById("photo").value = ""; // réinitialiser input file
            // ouvrir le popup
            formContainer.classList.add("show");
        });
    });

}
//---------------------------------------------------------------------------------------------------------------------


// 6* Recherche 
// Récupérer les éléments
const searchInput = document.getElementById("search");
const searchType = document.getElementById("searchType");

//Fonction pour filtrer et afficher les etudiants
function filterStudents() {
    const query = searchInput.value.toLowerCase(); // texte saisi en minuscules
    const criterion = searchType.value; // nom du champ choisi pour la recherche

    // on filtre les etudiants selon le critere choisi
    const filtered = students.filter(student => {
        // conversion en string pour eviter les erreurs sur age ou phone
        return String(student[criterion]).toLowerCase().includes(query);
    });

//fonction affichage filtre
studentsGrid.innerHTML = ""; // vider la grille avant d'afficher
filtered.forEach((student, index) => {
    const card = document.createElement("div");
    card.classList.add("student-card");
    card.innerHTML = `
        <img src="${student.photo}" alt="Photo etudiant">
        <h3>${student.name}</h3>
        <p>Age : ${student.age}</p>
        <p>Email : ${student.email}</p>
        <p>Phone : ${student.phone}</p>
        <p>Course : ${student.course}</p>
        <div class="actions">
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="edit-btn" data-index="${index}">Edit</button>
        </div>
        `;
    studentsGrid.appendChild(card);
    });
    attachDeleteButtons();
    attachEditButtons();
}

// Appeler filterStudents quand on tape dans l'input
searchInput.addEventListener("input", filterStudents);

// Appeler filterStudents quand on change le critere
searchType.addEventListener("change", filterStudents);
//-----------------------------------------------------------------------------------------------------------------------------

//7* tri
const sortType = document.createElement("select"); // creer un select pour le tri
sortType.innerHTML = `
    <option value="">Sort By...</option>
    <option value="name">Name</option>
    <option value="age">Age</option>
    <option value="course">Course</option>
`;
sortType.classList.add("search-select");
document.querySelector(".search-section").appendChild(sortType);

// Fonction pour trier les étudiants
function sortStudents() {
    const criterion = sortType.value;
    if (criterion) {
        students.sort((a, b) => {
            if (criterion === "age") {
                return a.age - b.age; // tri num pour age
            } else {
                // tri alpha pour name ou course
                return a[criterion].localeCompare(b[criterion]);
            }
        });
    }
    filterStudents(); // reaffiche les etudiants apres tri en gardant le filtre si active
}
// evenement quand on change le critere de tri
sortType.addEventListener("change", sortStudents);




//mode claire
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
});
