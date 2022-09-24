

import "./style.css";



const testObject = {
    name: 'boxsr',
    steps: [
        {
            title: 'Crea tu perfil',
            description: 'Antes de nada vamos a conocernos un poco, yo soy JON, tu asesor virtual. <br> ¿Y tu eres?',
            type: 'text',
            placeholder: 'mi nomnbre aqui',
            label: 'Me llamo'
        },
        {
            title: 'Crea tu perfil',
            description: `Un placer conocerte <span class="boxsr-name"></span> :) <br> ¿Cuando es tu cumpleaños?`,
            type: 'date',
            placeholder: 'DD-MM-AAAA',
            label: 'Mi cumpleaños es '
        }
    ],
}




const boxsrButton = document.querySelector('.boxsr-test');

const closeModal = (nameCLass) => {
    document.querySelector(nameCLass).classList.remove('boxsr-fullscreen--opacity');
    setTimeout(() =>{
        document.querySelector(nameCLass).classList.remove('boxsr-fullscreen--active');
    },900)
}


boxsrButton.addEventListener('click', () => {
    if (document.querySelector('.boxsr-fullscreen')) {
        document.querySelector('.boxsr-fullscreen').classList.add('boxsr-fullscreen--active');

        setTimeout(() =>{
            document.querySelector('.boxsr-fullscreen').classList.add('boxsr-fullscreen--opacity');
        },300)

    } else {
        boxsrTest();
    }
});


const boxsrTest = function () {
    const FullDiv = document.createElement('div');
    FullDiv.classList.add('boxsr-fullscreen');

    // Creamos Boton de cerrar
    const ButtonClose = document.createElement('span')
    ButtonClose.classList.add('boxsr-close')


    // Inject HTML
    document.querySelector('body').appendChild(FullDiv);
    FullDiv.classList.add('boxsr-fullscreen--active');



    FullDiv.innerHTML = `
        <img src="https://i.ibb.co/d6rvPTp/logo.png" alt="boxsr" class="boxsr-logo">
    `;

    FullDiv.appendChild(ButtonClose);
    // Creamos el contenedor principal
    const MainDiv = document.createElement('div');
    MainDiv.classList.add('boxsr-container');

    const form = buildFrom();
    FullDiv.appendChild(MainDiv);
    MainDiv.appendChild(form);

    setTimeout(() =>{
        FullDiv.classList.add('boxsr-fullscreen--opacity');
    },300)

    ButtonClose.addEventListener('click', () => {

        closeModal('.boxsr-fullscreen')

    
    });

    document.querySelector('.boxsr-form__input').focus();
}


// Detect button esc and back mobile
document.addEventListener('keydown', function (event) {
    // console.log("🚀 ~ file: index.js ~ line 35 ~ event", event)
    if (document.querySelector('.boxsr-fullscreen--active')) {
        if (event.key === 'Escape' || event.key === 'Backspace') {

            closeModal('.boxsr-fullscreen')
    
        }
    }
});

const buildFrom = function () {

    const form = document.createElement('form');
    form.classList.add('boxsr-form');

    const totalSteps = testObject.steps.length;
    let currentStep = 0;

    testObject.steps.forEach((step, index) => {

        if (step.type === 'text' || step.type === 'date') {
            const div = document.createElement('div');
            div.classList.add('boxsr-form__step');
            div.dataset.boxsr = index;

            const title = document.createElement('h2');
            title.classList.add('boxsr-form__title');
            title.innerHTML = step.title;

            const description = document.createElement('p');
            description.classList.add('boxsr-form__description');
            description.innerHTML = step.description;

            const label = document.createElement('label');
            label.classList.add('boxsr-form__label');
            label.innerHTML = step.label;

            const input = document.createElement('input');
            input.classList.add('boxsr-form__input');
            input.type = step.type;
            input.placeholder = step.placeholder;
            input.name = step.label;

            if (input.type == 'text') {

                input.addEventListener('change', (e) => {
                    document.querySelector('.boxsr-name').innerHTML = e.target.value;
                });

            }

            if (index === 0)  {
                div.classList.add('boxsr-form__step--active');
                
                setTimeout(() => {
                    div.classList.add('boxsr-form__step--opacity');
                },300)
                
            }




            div.appendChild(title);
            div.appendChild(description);
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);

        }
    });



    const nextStep = function () {
        console.log(currentStep ," " ,totalSteps)
        if(currentStep >= totalSteps - 1) {
        // transform form values to object
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            alert(JSON.stringify(data));

            form.submit();
        }else{
            currentStep++;
            showStep();
        }

    }

    const backStep = function () {

        if(currentStep < 0) {
            currentStep = 0;
        }else{
            currentStep--;
            showStep();
        }
    }

    const showStep = function (NextOBack) {

        if(currentStep === 0) {
            document.querySelector('.boxsr-form__back').style.visibility = 'hidden';
        }else{
            document.querySelector('.boxsr-form__back').style.visibility = 'visible';
        }

        document.querySelectorAll(".boxsr-form__step").forEach((item, index) => {
            item.classList.remove('boxsr-form__step--active');
            item.classList.remove('boxsr-form__step--opacity');
        });

        const next = form.querySelector(`[data-boxsr="${currentStep}"]`)
        next.classList.add('boxsr-form__step--active');
        setTimeout(() => {
            next.classList.add('boxsr-form__step--opacity');
            next.querySelector('input').focus();
        },200)


    }

    // Create navigator
    const navigator = document.createElement('div');
    navigator.classList.add('boxsr-form__navigator');
    form.appendChild(navigator);



    //Create span back 
    const spanBack = document.createElement('span');
    spanBack.classList.add('boxsr-form__back');
    spanBack.innerHTML = '<';
    navigator.appendChild(spanBack);


    if(currentStep === 0) {
        spanBack.style.visibility = 'hidden';
    }

    spanBack.addEventListener('click', (e) => {
        e.preventDefault();
        backStep();
    })

    // Create button next
    const buttonNext = document.createElement('span');
    buttonNext.classList.add('boxsr-form__button');
    buttonNext.innerHTML = '>';
    navigator.appendChild(buttonNext);

    buttonNext.addEventListener('click', (e) => {
        e.preventDefault();
        nextStep();
    });


    return form;
}