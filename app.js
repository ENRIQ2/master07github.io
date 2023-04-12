// VARIABLES
let form = document.querySelector(".form-register");
let progressOptions = document.querySelectorAll(".progressbar__option");

const $patientsRegistered = document.getElementById("patients-registered");
const $patientsRegisteredList = document.getElementById("patients-registered-list");

const $seeFormButton = document.getElementById("see-form");
const $seePatientsButton = document.getElementById("see-patients");

const $registerButton = document.getElementById("register-patient");

const $modalContainer = document.getElementById("modal-container");

// DATOS ACTUALES DE LOS PASOS (1,2,3 Y 4)
const currentData = {
  step_1: {
    name: undefined,
    lastname: undefined,
    phoneNumber: undefined,
    nationality: undefined,
    gender: undefined,
    typeBlood: undefined,
    address: undefined,
  },
  step_2: {
    familiarName: undefined,
    familiarLastname: undefined,
    familiarAge: undefined,
    familiarRelationship: undefined,
    familiarContact: undefined,
    familiarDetails: undefined,
  },
  step_3: {
    conditionDisease: undefined,
    conditionTimeDisease: undefined,
    conditionDetails: undefined,
  },
  step_4: {
    date: undefined,
    medicalCenter: undefined,
    diagnosis: undefined,
  },
};

// FUNCIONES
// LIMPIAR DATOS DE "currentData" Y LOS INPUT Y TEXTAREA DEL FORMULARIO
function clearAllData() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  document.querySelectorAll("textarea").forEach((textarea) => (textarea.value = ""));

  currentData.step_1.name = undefined;
  currentData.step_1.lastname = undefined;
  currentData.step_1.nationality = undefined;
  currentData.step_1.gender = undefined;
  currentData.step_1.phoneNumber = undefined;
  currentData.step_1.typeBlood = undefined;
  currentData.step_1.address = undefined;

  currentData.step_2.familiarName = undefined;
  currentData.step_2.familiarLastname = undefined;
  currentData.step_2.familiarAge = undefined;
  currentData.step_2.familiarContact = undefined;
  currentData.step_2.familiarRelationship = undefined;
  currentData.step_2.familiarDetails = undefined;

  currentData.step_3.conditionDisease = undefined;
  currentData.step_3.conditionTimeDisease = undefined;
  currentData.step_3.conditionDetails = undefined;

  currentData.step_4.date = undefined;
  currentData.step_4.medicalCenter = undefined;
  currentData.step_4.diagnosis = undefined;
}

// EVENTOS
form.addEventListener("click", function (e) {
  let element = e.target;

  let isButtonNext = element.classList.contains("step__button--next");
  let isButtonBack = element.classList.contains("step__button--back");

  if (isButtonNext || isButtonBack) {
    let currentStep = document.getElementById("step-" + element.dataset.step);
    let jumpStep = document.getElementById("step-" + element.dataset.to_step);
    currentStep.addEventListener("animationend", function callback() {
      currentStep.classList.remove("active");
      jumpStep.classList.add("active");
      if (isButtonNext) {
        currentStep.classList.add("to-left");
        progressOptions[element.dataset.to_step - 1].classList.add("active");
      } else {
        jumpStep.classList.remove("to-left");
        progressOptions[element.dataset.step - 1].classList.remove("active");
      }
      currentStep.removeEventListener("animationend", callback);
    });
    currentStep.classList.add("inactive");
    jumpStep.classList.remove("inactive");
  }

  // SI VAMOS AL PASO 5 ENTONCES ACCEDEMOS A LA ETIQUETA CON EL ID "all-data" DEL HTML Y LE INSERTAMOS EL CODIGO HTML CON CADA DATO USANTO TEMPLATE STRING LOS CUALES NOS PERMITE AGREGAR VARIABLES OBTENER Y MOSTRAR LOS DATO
  if (element.dataset.to_step == "5") {
    document.getElementById("all-patient-data").innerHTML = `
      <h3>Informacion personal (Paso 1)</h3>
      <span class="patient-data">${currentData.step_1.name}</span>
      <span class="patient-data">${currentData.step_1.lastname}</span>
      <span class="patient-data">${currentData.step_1.phoneNumber}</span>
      <span class="patient-data">${currentData.step_1.nationality}</span>
      <span class="patient-data">${currentData.step_1.gender}</span>
      <span class="patient-data">${currentData.step_1.typeBlood}</span>
      <span class="patient-data">${currentData.step_1.address}</span>
      
      <h3>Informacion parentezco (Paso 2)</h3>
      <span class="patient-data">${currentData.step_2.familiarName}</span>
      <span class="patient-data">${currentData.step_2.familiarLastname}</span>
      <span class="patient-data">${currentData.step_2.familiarAge}</span>
      <span class="patient-data">${currentData.step_2.familiarRelationship}</span>
      <span class="patient-data">${currentData.step_2.familiarContact}</span>
      <span class="patient-data">${currentData.step_2.familiarDetails}</span>
      
      <h3>Condiciones pre-existente (Paso 3)</h3>
      <span class="patient-data">${currentData.step_3.conditionDisease}</span>
      <span class="patient-data">${currentData.step_3.conditionTimeDisease}</span>
      <span class="patient-data">${currentData.step_3.conditionDetails}</span>
      
      <h3>Condiciones pre-existente (Paso 4)</h3>
      <span class="patient-data">${currentData.step_4.date}</span>
      <span class="patient-data">${currentData.step_4.medicalCenter}</span>
      <span class="patient-data">${currentData.step_4.diagnosis}</span>
    `;
  }
});

// MOSTRAR FORMULARIO
$seeFormButton.addEventListener("click", (e) => {
  e.target.classList.add("active");
  $seePatientsButton.classList.remove("active");
  form.classList.remove("hidden");
  $patientsRegistered.classList.add("hidden");
});
// MOSTRAR TABLA DE PACIENTES
$seePatientsButton.addEventListener("click", (e) => {
  e.target.classList.add("active");
  $seeFormButton.classList.remove("active");
  form.classList.add("hidden");
  $patientsRegistered.classList.remove("hidden");
});

// LE AGREGAMOS AL DOCUMENTO EL EVENTO "keyup" Y MEDIANTE EL EVENT VAMOS A PREGUNTAR SI EL ELEMENTO PRESIONADO ES UN INPUT.
document.addEventListener("keyup", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    // CAPTURAMOS EL NOMBRE DEL INPUT, EL PASO Y EL VALOR
    const name = e.target.name;
    const step = e.target.parentNode.dataset.stepData;
    const value = e.target.value;

    if (currentData[`step_${step}`].hasOwnProperty(name)) {
      currentData[`step_${step}`][name] = value;
    }
  }
});

// REGISTRAR PACIENTE Y AGREGAR TODA LA INFORMACION DEL MISMO O EDITAR PACIENTE EXISTENTE
$registerButton.addEventListener("click", (e) => {
  if (document.querySelector("[data-status='editing']")) {
    // EDITANDO PACIENTE
    const $patient = document.querySelector("[data-status='editing']");

    $patient.querySelector("#td-patient-name").textContent = currentData.step_1.name;
    $patient.querySelector("#td-patient-lastname").textContent = currentData.step_1.lastname;

    $patient.dataset.name = currentData.step_1.name;
    $patient.dataset.lastname = currentData.step_1.lastname;
    $patient.dataset.phoneNumber = currentData.step_1.phoneNumber;
    $patient.dataset.nationality = currentData.step_1.nationality;
    $patient.dataset.gender = currentData.step_1.gender;
    $patient.dataset.typeBlood = currentData.step_1.typeBlood;
    $patient.dataset.address = currentData.step_1.address;

    $patient.dataset.familiarName = currentData.step_2.familiarName;
    $patient.dataset.familiarLastname = currentData.step_2.familiarLastname;
    $patient.dataset.familiarAge = currentData.step_2.familiarAge;
    $patient.dataset.familiarRelationship = currentData.step_2.familiarRelationship;
    $patient.dataset.familiarContact = currentData.step_2.familiarContact;
    $patient.dataset.familiarDetails = currentData.step_2.familiarDetails;

    $patient.dataset.conditionDisease = currentData.step_3.conditionDisease;
    $patient.dataset.conditionTimeDisease = currentData.step_3.conditionTimeDisease;
    $patient.dataset.conditionDetails = currentData.step_3.conditionDetails;

    $patient.dataset.date = currentData.step_4.date;
    $patient.dataset.medicalCenter = currentData.step_4.medicalCenter;
    $patient.dataset.diagnosis = currentData.step_4.diagnosis;

    $patient.dataset.status = "";
  } else {
    // NUEVO PACIENTE
    const childs = $patientsRegisteredList.children.length + 1;
    const $newPatient = document.createElement("tr");

    $newPatient.innerHTML = `
    <td>${childs}</td>
    <td id="td-patient-name">${currentData.step_1.name}</td>
    <td id="td-patient-lastname">${currentData.step_1.lastname}</td>
    <td id="ver-info" class="ver">Ver</td>
    <td id="editar-info" class="editar">Editar</td>
    <td id="borrar-info" class="borrar">Borrar</td>
  `;

    $newPatient.dataset.name = currentData.step_1.name;
    $newPatient.dataset.lastname = currentData.step_1.lastname;
    $newPatient.dataset.phoneNumber = currentData.step_1.phoneNumber;
    $newPatient.dataset.nationality = currentData.step_1.nationality;
    $newPatient.dataset.gender = currentData.step_1.gender;
    $newPatient.dataset.typeBlood = currentData.step_1.typeBlood;
    $newPatient.dataset.address = currentData.step_1.address;

    $newPatient.dataset.familiarName = currentData.step_2.familiarName;
    $newPatient.dataset.familiarLastname = currentData.step_2.familiarLastname;
    $newPatient.dataset.familiarAge = currentData.step_2.familiarAge;
    $newPatient.dataset.familiarRelationship = currentData.step_2.familiarRelationship;
    $newPatient.dataset.familiarContact = currentData.step_2.familiarContact;
    $newPatient.dataset.familiarDetails = currentData.step_2.familiarDetails;

    $newPatient.dataset.conditionDisease = currentData.step_3.conditionDisease;
    $newPatient.dataset.conditionTimeDisease = currentData.step_3.conditionTimeDisease;
    $newPatient.dataset.conditionDetails = currentData.step_3.conditionDetails;

    $newPatient.dataset.date = currentData.step_4.date;
    $newPatient.dataset.medicalCenter = currentData.step_4.medicalCenter;
    $newPatient.dataset.diagnosis = currentData.step_4.diagnosis;

    $patientsRegisteredList.appendChild($newPatient);

    $seePatientsButton.click();

    // LIMPIAR DATOS AL REGISTRAR PACIENTE
    clearAllData();
  }
});

// VER / EDITAR / BORRAR
document.addEventListener("click", (e) => {
  // VER INFORMACION DEL PACIENTE EN LA VENTANA MODAL
  if (e.target.matches("td#ver-info")) {
    const parent = e.target.parentNode;

    document.getElementById("modal-content").innerHTML = `
      <h3>Informacion personal (Paso 1)</h3>
      <span class="patient-data">${parent.dataset.name}</span>
      <span class="patient-data">${parent.dataset.lastname}</span>
      <span class="patient-data">${parent.dataset.phoneNumber}</span>
      <span class="patient-data">${parent.dataset.nationality}</span>
      <span class="patient-data">${parent.dataset.gender}</span>
      <span class="patient-data">${parent.dataset.typeBlood}</span>
      <span class="patient-data">${parent.dataset.address}</span>
      
      <h3>Informacion parentezco (Paso 2)</h3>
      <span class="patient-data">${parent.dataset.familiarName}</span>
      <span class="patient-data">${parent.dataset.familiarLastname}</span>
      <span class="patient-data">${parent.dataset.familiarAge}</span>
      <span class="patient-data">${parent.dataset.familiarRelationship}</span>
      <span class="patient-data">${parent.dataset.familiarContact}</span>
      <span class="patient-data">${parent.dataset.familiarDetails}</span>
      
      <h3>Condiciones pre-existente (Paso 3)</h3>
      <span class="patient-data">${parent.dataset.conditionDisease}</span>
      <span class="patient-data">${parent.dataset.conditionTimeDisease}</span>
      <span class="patient-data">${parent.dataset.conditionDetails}</span>
      
      <h3>Condiciones pre-existente (Paso 4)</h3>
      <span class="patient-data">${parent.dataset.date}</span>
      <span class="patient-data">${parent.dataset.medicalCenter}</span>
      <span class="patient-data">${parent.dataset.diagnosis}</span>
    `;

    $modalContainer.classList.add("show");
  }

  // EDITAR PACIENTE
  if (e.target.matches("td#editar-info")) {
    const parent = e.target.parentNode;

    // MARCAR COMO "EDITANDO" A UN PACIENTE
    parent.dataset.status = "editing";

    // LLENAR LOS INPUTS CON LOS DATOS DEL PACIENTE PARA EDITARLOS
    document.querySelectorAll("input").forEach((input) => {
      const name = input.name;

      if (name === "name" && parent.dataset.name !== "undefined") {
        input.value = parent.dataset.name;
        currentData.step_1.name = parent.dataset.name;
      }
      if (name === "lastname" && parent.dataset.lastname !== "undefined") {
        input.value = parent.dataset.lastname;
        currentData.step_1.lastname = parent.dataset.lastname;
      }
      if (name === "phoneNumber" && parent.dataset.phoneNumber !== "undefined") {
        input.value = parent.dataset.phoneNumber;
        currentData.step_1.phoneNumber = parent.dataset.phoneNumber;
      }
      if (name === "nationality" && parent.dataset.nationality !== "undefined") {
        input.value = parent.dataset.nationality;
        currentData.step_1.nationality = parent.dataset.nationality;
      }
      if (name === "gender" && parent.dataset.gender !== "undefined") {
        input.value = parent.dataset.gender;
        currentData.step_1.gender = parent.dataset.gender;
      }
      if (name === "typeBlood" && parent.dataset.typeBlood !== "undefined") {
        input.value = parent.dataset.typeBlood;
        currentData.step_1.typeBlood = parent.dataset.typeBlood;
      }

      if (name === "familiarName" && parent.dataset.familiarName !== "undefined") {
        input.value = parent.dataset.familiarName;
        currentData.step_2.familiarName = parent.dataset.familiarName;
      }
      if (name === "familiarLastname" && parent.dataset.familiarLastname !== "undefined") {
        input.value = parent.dataset.familiarLastname;
        currentData.step_2.familiarLastname = parent.dataset.familiarLastname;
      }
      if (name === "familiarAge" && parent.dataset.familiarAge !== "undefined") {
        input.value = parent.dataset.familiarAge;
        currentData.step_2.familiarAge = parent.dataset.familiarAge;
      }
      if (name === "familiarRelationship" && parent.dataset.familiarRelationship !== "undefined") {
        input.value = parent.dataset.familiarRelationship;
        currentData.step_2.familiarRelationship = parent.dataset.familiarRelationship;
      }
      if (name === "familiarContact" && parent.dataset.familiarContact !== "undefined") {
        input.value = parent.dataset.familiarContact;
        currentData.step_2.familiarContact = parent.dataset.familiarContact;
      }

      if (name === "conditionDisease" && parent.dataset.conditionDisease !== "undefined") {
        input.value = parent.dataset.conditionDisease;
        currentData.step_3.conditionDisease = parent.dataset.conditionDisease;
      }
      if (name === "conditionTimeDisease" && parent.dataset.conditionTimeDisease !== "undefined") {
        input.value = parent.dataset.conditionTimeDisease;
        currentData.step_3.conditionTimeDisease = parent.dataset.conditionTimeDisease;
      }

      if (name === "date" && parent.dataset.date !== "undefined") {
        input.value = parent.dataset.date;
        currentData.step_4.date = parent.dataset.date;
      }
      if (name === "medicalCenter" && parent.dataset.medicalCenter !== "undefined") {
        input.value = parent.dataset.medicalCenter;
        currentData.step_4.medicalCenter = parent.dataset.medicalCenter;
      }
    });

    // LLENAR LOS TEXTAREA CON LOS DATOS DEL PACIENTE PARA EDITARLOS
    document.querySelectorAll("textarea").forEach((textarea) => {
      const name = textarea.name;

      if (name === "address" && parent.dataset.address !== "undefined") {
        textarea.value = parent.dataset.address;
        currentData.step_1.address = parent.dataset.address;
      }

      if (name === "familiarDetails" && parent.dataset.familiarDetails !== "undefined") {
        textarea.value = parent.dataset.familiarDetails;
        currentData.step_2.familiarDetails = parent.dataset.familiarDetails;
      }

      if (name === "conditionDetails" && parent.dataset.conditionDetails !== "undefined") {
        textarea.value = parent.dataset.conditionDetails;
        currentData.step_3.conditionDetails = parent.dataset.conditionDetails;
      }

      if (name === "diagnosis" && parent.dataset.diagnosis !== "undefined") {
        textarea.value = parent.dataset.diagnosis;
        currentData.step_4.diagnosis = parent.dataset.diagnosis;
      }
    });
  }

  // BORRAR PACIENTE
  if (e.target.matches("td#borrar-info")) e.target.parentNode.remove();

  // QUITAR VENTANA MODAL
  if (e.target.id === "close-modal") $modalContainer.classList.remove("show");
});
