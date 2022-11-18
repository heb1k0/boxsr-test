import "./style.css";

let currentStep = 1;

const testObject = [
  {
    title: "Crea tu perfil",
    questions: [
      {
        description:
          "Antes de nada vamos a conocernos un poco, yo soy JON, tu asesor virtual. <br> ¿Y tu eres?",
        type: "text",
        placeholder: "mi nombre aqui",
        label: "Me llamo",
      },
      {
        description: `Un placer conocerte <span class="boxsr-name"></span> :) <br> ¿Cuando es tu cumpleaños?`,
        type: "date",
        placeholder: "DD-MM-AAAA",
        label: "Mi cumpleaños es ",
      },
    ],
  },
  {
    title: "CARAS",
    questions: [
      {
        description: "¿Eres hombre o mujer?",
        type: "radio",
        img: true,
        options: [
            {label: "Hombre", value: "hombre", img: "https://cdn.shopify.com/s/files/1/0251/2214/4336/files/02-brillosportodalacara.png?v=1668591645" },
            {label: "Mujer", value: "mujer", img: "https://cdn.shopify.com/s/files/1/0251/2214/4336/files/02-brillosportodalacara.png?v=1668591645" },
            {label: "Hombre", value: "hombre", img: "https://cdn.shopify.com/s/files/1/0251/2214/4336/files/02-brillosportodalacara.png?v=1668591645" },
            {label: "Mujer", value: "mujer", img: "https://cdn.shopify.com/s/files/1/0251/2214/4336/files/02-brillosportodalacara.png?v=1668591645" },
            ],

      },
    ],
  },
  {
    title: "ANÁLISIS",
    questions: [
      {
        description: `Un placer conocerte <span class="boxsr-name"></span> :) <br> ¿Cuando es tu cumpleaños?`,
        type: "radio",
        name: "hombre",
        options: [
          {
            label: "Hombre1-label",
            value: "hombre1",
            help: "Texto de ayuda",
          },
          {
            label: "Hombre2-label",
            value: "hombre2",
            help: "Texto de ayuda2",
          },
        ],
      },
      {
        description: `Un placer conocerte <span class="boxsr-name"></span> :) <br> ¿Cuando es tu cumpleaños?`,
        type: "radio",
        name: "feo",
        options: [
          {
            label: "Hombre2-label",
            value: "hombre3",
            help: "Texto de ayuda",
          },
          {
            label: "Hombre3-label",
            value: "hombre4",
            help: "Texto de ayuda2",
          },
        ],
      },
      {
        description:
          "¡Ahora solo falta tu e-mail para poder enviarte tu diagnóstico personalizado!",
        type: "email",
        placeholder: " usuario@mail.com",
      },
    ],
  },
];

const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const boxsrButton = document.querySelector(".boxsr-test");

const closeModal = (nameCLass) => {
  document
    .querySelector(nameCLass)
    .classList.remove("boxsr-fullscreen--opacity");
  setTimeout(() => {
    document
      .querySelector(nameCLass)
      .classList.remove("boxsr-fullscreen--active");
  }, 900);
};

boxsrButton.addEventListener("click", () => {
  if (document.querySelector(".boxsr-fullscreen")) {
    document
      .querySelector(".boxsr-fullscreen")
      .classList.add("boxsr-fullscreen--active");

    setTimeout(() => {
      document
        .querySelector(".boxsr-fullscreen")
        .classList.add("boxsr-fullscreen--opacity");
    }, 300);
  } else {
    boxsrTest();
  }
});

const boxsrTest = function () {
  const FullDiv = document.createElement("div");
  FullDiv.classList.add("boxsr-fullscreen");

  // Creamos Boton de cerrar
  const ButtonClose = document.createElement("span");
  ButtonClose.classList.add("boxsr-close");

  // Inject HTML
  document.querySelector("body").appendChild(FullDiv);
  FullDiv.classList.add("boxsr-fullscreen--active");

  FullDiv.innerHTML = `
        <img src="https://i.ibb.co/d6rvPTp/logo.png" alt="boxsr" class="boxsr-logo">
    `;

  FullDiv.appendChild(ButtonClose);
  // Creamos el contenedor principal
  const MainDiv = document.createElement("div");
  MainDiv.classList.add("boxsr-container");

  const form = buildFrom();
  FullDiv.appendChild(MainDiv);
  MainDiv.appendChild(form);

  setTimeout(() => {
    FullDiv.classList.add("boxsr-fullscreen--opacity");
  }, 300);

  if (currentStep === 1) {
    document.querySelector("input").focus();
  }

  ButtonClose.addEventListener("click", () => {
    closeModal(".boxsr-fullscreen");
  });

  document.querySelector(".boxsr-form__input").focus();
};

const buildFrom = function () {
  const form = document.createElement("form");
  form.classList.add("boxsr-form");

  var totalSteps = 0;

  testObject.forEach((step) => {
    totalSteps = totalSteps + step.questions.length;
  });
  form.submit = function (event) {
    console.log("submit");
    nextStep();
    return false;
  };

  let index = 0;
  let PROGRESS_PERCENT = 0;

  testObject.forEach((steps, indexFor) => {
    steps.title = steps.title || "Paso " + index;

    const TOTAL_QUEST = steps.questions.length;

    //PORCENTAJE DE BARRA
    let PROGRESS_PERCENT_STEP = 100 / TOTAL_QUEST;

    // if(indexFor == 0){

    //     const progress = document.createElement('div');
    //     progress.classList.add('boxsr-progress');
    //     progress.innerHTML = `
    //         <div class="boxsr-progress__bar" style="width: ${PROGRESS_PERCENT_STEP }%"></div>
    //     `;
    //     form.appendChild(progress);

    // }

    let idIndex = 0;

    steps.questions.forEach((step) => {
      index++;
      idIndex++;
      // progress bar

      if (
        step.type === "text" ||
        step.type === "date" ||
        step.type === "email"
      ) {
        const div = document.createElement("div");
        div.classList.add("boxsr-form__step");
        div.dataset.boxsr = index;
        div.dataset.progress = PROGRESS_PERCENT_STEP;

        const title = document.createElement("h2");
        title.classList.add("boxsr-form__title");
        title.innerHTML = steps.title || step.description;

        const description = document.createElement("p");
        description.classList.add("boxsr-form__description");
        description.innerHTML = step.description;

        const label = document.createElement("label");
        label.classList.add("boxsr-form__label");
        label.innerHTML = step.label || "";

        const input = document.createElement("input");
        input.classList.add("boxsr-form__input");
        input.type = step.type;
        input.placeholder = step.placeholder;
        input.name = step.label || step.type;

        if (input.type == "text" || input.type == "email") {
          input.addEventListener("change", (e) => {
            document.querySelector(".boxsr-name").innerHTML = e.target.value;
          });
        }

        if (index === 1) {
          div.classList.add("boxsr-form__step--active");

          setTimeout(() => {
            div.classList.add("boxsr-form__step--opacity");
          }, 300);
        }

        if(step.type == "date"){
            input.addEventListener('click', (e) => {
                e.target.type = 'date';
            })
        }

        const progress = document.createElement("div");
        progress.classList.add("boxsr-progress");
        progress.innerHTML = `
                    <div class="boxsr-progress__bar" style="width: ${PROGRESS_PERCENT_STEP}%"></div>
                `;

        div.appendChild(title);
        div.appendChild(progress);
        div.appendChild(description);
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
      }

      if (step.type === "radio") {
        

        const div = document.createElement("div");
        div.classList.add("boxsr-form__step");
        div.dataset.boxsr = index;
        div.dataset.progress = PROGRESS_PERCENT_STEP;

        const title = document.createElement("h2");
        title.classList.add("boxsr-form__title");
        title.innerHTML = steps.title;
        const progress = document.createElement("div");
        progress.classList.add("boxsr-progress");
        progress.innerHTML = `
                    <div class="boxsr-progress__bar" style="width: ${PROGRESS_PERCENT_STEP}%"></div>
                `;

        // description

        const description = document.createElement("p");
        description.classList.add("boxsr-form__description");
        description.innerHTML = step.description;

        div.appendChild(title);
        div.appendChild(progress);
        div.appendChild(description);

        let divFlex

        if(step.img){
            // Create div flex
            divFlex = document.createElement('div');
            divFlex.classList.add('boxsr-form__flex');
            div.appendChild(divFlex);
        

        }

        step.options.forEach((option, index) => {

            if(option.img) {
                const label = document.createElement('label');
                label.classList.add('boxsr-form__label');

                const input = document.createElement('input');
                input.classList.add('boxsr-form__input');
                input.type = 'radio';
                input.name = step.label || step.type;
                input.value = option.value;
                input.id = 'boxsr-radio-' + idIndex + '-' + index;
                input.style.display = 'none';

                const img = document.createElement('img');
                img.classList.add('boxsr-form__img');
                img.src = option.img;

                const span = document.createElement('span');
                span.classList.add('boxsr-form__span');
                span.innerHTML = option.label;

                label.appendChild(input);
                label.appendChild(img);
                label.appendChild(span);
                return divFlex.appendChild(label);
     
            
            
            }
          const description = document.createElement("p");
          description.classList.add("boxsr-form__description");
          description.innerHTML = step.description;

          const divRow = document.createElement("div");
          divRow.classList.add("boxsr-form__row");

          const label = document.createElement("label");
          label.classList.add("boxsr-form__label_radio");
          label.innerHTML = option.label;
          label.setAttribute("for", option.value + idIndex);
          label.setAttribute("data-id", option.value + idIndex);

          const radio = document.createElement("input");
          radio.classList.add("boxsr-form__radio");
          radio.type = "radio";
          radio.name = step.name + idIndex;
          radio.value = option.value;
          radio.id = option.value + idIndex;

          const help = document.createElement("span");
          help.classList.add("boxsr-form__help");
          help.innerHTML = "?";

          divRow.appendChild(radio);
          divRow.appendChild(label);
          divRow.appendChild(help);

          label.onclick = function () {
            console.log("Click");
            div.querySelectorAll('input[type="radio"]').forEach((radios) => {
              radios.classList.remove("boxsr-form__radio--active");
              console.log(radios);
              radios.checked = false;
            });
            radio.checked = true;
          };

          div.appendChild(divRow);

          help.onclick = function () {
            label.innerHTML = option.help;
            help.classList.add("boxsr-form__step--hidden");
            label.classList.add("boxsr-form__help--active");

            setTimeout(() => {
              label.innerHTML = option.label;
              label.classList.remove("boxsr-form__help--active");
              help.classList.remove("boxsr-form__step--hidden");
            }, 4000);
          };
        });

        // if (index === 0) {
        //     div.classList.add('boxsr-form__step--active');

        //     setTimeout(() => {
        //         div.classList.add('boxsr-form__step--opacity');
        //     }, 300)

        // }

        form.appendChild(div);
      }

      PROGRESS_PERCENT_STEP = PROGRESS_PERCENT_STEP + PROGRESS_PERCENT_STEP;
    });
    PROGRESS_PERCENT = 0;
  });

  const nextStep = function () {
    // Check value input o radio
    const input = document.querySelector(".boxsr-form__step--active input");
    const radio = document.querySelectorAll(
      '.boxsr-form__step--active input[type="radio"]'
    );

    if (input) {
      if (input.value === "") {
        input.classList.add("boxsr-form__input--error");
        return;
      } else {
        input.classList.remove("boxsr-form__input--error");
      }

      if (input.type == "email") {
        if (!validateEmail(input.value)) {
          input.classList.add("boxsr-form__input--error");
          return false;
        } else {
          input.classList.remove("boxsr-form__input--error");
        }
      }
    }

    if (radio.length > 0) {
      let isChecked = false;

      radio.forEach((radio) => {
        // console.log(radio.checked)
        if (radio.checked) {
          isChecked = true;
        }
      });

      if (!isChecked) {
        document
          .querySelectorAll(`.boxsr-form__step--active`)
          .forEach((label) => {
            label.querySelectorAll("label").forEach((label) => {
              label.classList.add("boxsr-form__label_radio--error");
            });
          });
        return;
      } else {
        document
          .querySelectorAll(`.boxsr-form__step--active`)
          .forEach((label) => {
            label.querySelectorAll("label").forEach((label) => {
              label.classList.remove("boxsr-form__label_radio--error");
            });
          });
      }
    }

    if (currentStep == totalSteps) {
      // transform form values to object
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log(typeof data);

      // Quitar espacios y ñ de los key de data
      const dataClean = {};
      Object.keys(data).forEach((key) => {
        dataClean[key.replace(/ /g, "").replace(/ñ/g, "n")] = data[key];
      });

      console.log(JSON.stringify(data));
      fetch("http://localhost:3500/users", {
        method: "POST",
        body: JSON.stringify(dataClean),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if(json.error == "ErrorEmail") return form.querySelector('.boxsr-form__step--active input').classList.add('boxsr-form__input--error');
        })
        .catch((error) => console.log(error));
    } else {
      currentStep++;
      showStep();
    }
  };

  const backStep = function () {
    if (currentStep < 1) {
      currentStep = 1;
    } else {
      currentStep--;
      showStep();
    }
  };

  const showStep = function (NextOBack) {
    if (currentStep === 1) {
      const continueButton = document.querySelector(".boxsr-form__back");
      continueButton.innerHTML = "Continuar";
      continueButton.classList.add("boxsr-form__text");
      // console.log("entro")
    } else {
      document.querySelector(".boxsr-form__back").innerHTML = "<";
      // console.log("lass", document.querySelector('.boxsr-form__back').classList)
      document
        .querySelector(".boxsr-form__back")
        .classList.remove("boxsr-form__text");
      document.querySelector(".boxsr-form__back").style.visibility = "visible";
    }

    document.querySelectorAll(".boxsr-form__step").forEach((item, index) => {
      item.classList.remove("boxsr-form__step--active");
      item.classList.remove("boxsr-form__step--opacity");
    });

    const next = form.querySelector(`[data-boxsr="${currentStep}"]`);
    next.classList.add("boxsr-form__step--active");
    document.querySelector(
      ".boxsr-progress__bar"
    ).style.width = `${next.dataset.progress}%`;
    setTimeout(() => {
      next.classList.add("boxsr-form__step--opacity");
      next.querySelector("input").focus();
    }, 200);
  };

  // Create navigator
  const navigator = document.createElement("div");
  navigator.classList.add("boxsr-form__navigator");
  form.appendChild(navigator);

  //Create span back
  const spanBack = document.createElement("span");
  spanBack.classList.add("boxsr-form__back");
  spanBack.innerHTML = "<";
  navigator.appendChild(spanBack);

  if (currentStep === 1) {
    spanBack.classList.add("boxsr-form__text");
    spanBack.innerHTML = "Continuar";
  }

  spanBack.addEventListener("click", (e) => {
    if (currentStep !== 1) {
      backStep();
    } else {
      nextStep();
    }
  });

  // Create button next
  const buttonNext = document.createElement("span");
  buttonNext.classList.add("boxsr-form__next");
  buttonNext.innerHTML = ">";
  navigator.appendChild(buttonNext);

  buttonNext.addEventListener("click", (event) => {
    event.preventDefault();
    nextStep();
  });

  // Detect button esc and back mobile
  document.addEventListener("keydown", function (event) {
    const key = event.charCode || event.keyCode || 0;
    const documentBox = document.querySelector(".boxsr-fullscreen--active");
    if (documentBox) {
      const documentBox = document.querySelector(
        '.boxsr-form__step--active input[type="text"]'
      );

      if (!documentBox) {
        if (event.key === "Escape" || event.key === "Backspace") {
          if (currentStep > 1) {
            currentStep--;
            showStep();
            return;
          }

          closeModal(".boxsr-fullscreen");
        }

        if (key === 13 || event.key === "Enter" || key === "Enter") {
          document.querySelector(".boxsr-form__next").click();
        }
      } else {
        const data = documentBox.value;

        if (
          document.querySelector('input[type="email"]') ||
          document.querySelector('input[type="text"]')
        ) {
          return;
        }

        if (event.key === "Escape" || event.key === "Backspace") {
          if (data == "") closeModal(".boxsr-fullscreen");
        }

        if (key === 13 || event.key === "Enter" || key === "Enter") {
          document.querySelector(".boxsr-form__next").click();
        }
      }
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    nextStep();
  });

  return form;
};
