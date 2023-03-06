function buttonFliesAway() {
    document.querySelectorAll('.flying-button').forEach(button => {

        let getVar = variable => getComputedStyle(button).getPropertyValue(variable);
        
        // Get email and name from the contact form
        let getEmail = document.querySelector('#newsletter__email-input');
        let getName = document.querySelector('#newsletter__name-input');

        button.addEventListener('click', e => {
            
            // Prevent default behaviour of the button;
            e.preventDefault();

            // Validate email and name with regex
            if (!validateNewsletterInputs(getEmail, getName)) 
                return;
                           
            // Add active class (create folding paper animation)
            if(!button.classList.contains('active')) {
                button.classList.add('active');
                    
                gsap.to(button, {
                    keyframes: [{
                        '--left-wing-first-x': 50,
                        '--left-wing-first-y': 100,
                        '--right-wing-second-x': 50,
                        '--right-wing-second-y': 100,
                        duration: .2,
                        onComplete() {
                            gsap.set(button, {
                                '--left-wing-first-y': 0,
                                '--left-wing-second-x': 40,
                                '--left-wing-second-y': 100,
                                '--left-wing-third-x': 0,
                                '--left-wing-third-y': 100,
                                '--left-body-third-x': 40,
                                '--right-wing-first-x': 50,
                                '--right-wing-first-y': 0,
                                '--right-wing-second-x': 60,
                                '--right-wing-second-y': 100,
                                '--right-wing-third-x': 100,
                                '--right-wing-third-y': 100,
                                '--right-body-third-x': 60
                            })
                        }
                    }, {
                        '--left-wing-third-x': 20,
                        '--left-wing-third-y': 90,
                        '--left-wing-second-y': 90,
                        '--left-body-third-y': 90,
                        '--right-wing-third-x': 80,
                        '--right-wing-third-y': 90,
                        '--right-body-third-y': 90,
                        '--right-wing-second-y': 90,
                        duration: .2
                    }, {
                        '--rotate': 50,
                        '--left-wing-third-y': 95,
                        '--left-wing-third-x': 27,
                        '--right-body-third-x': 45,
                        '--right-wing-second-x': 45,
                        '--right-wing-third-x': 60,
                        '--right-wing-third-y': 83,
                        duration: .25
                    }, {
                        '--rotate': 55,
                        '--plane-x': -8,
                        '--plane-y': 24,
                        duration: .35
                    }, {
                        '--rotate': 40,
                        '--plane-x': 105,
                        '--plane-y': -210,
                        '--plane-opacity': 0,
                        duration: .3,
                        onComplete() {
                            setTimeout(() => {
                                button.removeAttribute('style');
                                gsap.fromTo(button, {
                                    opacity: 0,
                                    y: -8
                                }, {
                                    opacity: 1,
                                    y: 0,
                                    clearProps: true,
                                    duration: .3,
                                    onComplete() {
                                        button.classList.remove('active');
                                    }
                                })
                            }, 2000)
                        }
                    }]
                })

                gsap.to(button, {
                    keyframes: [{
                        '--text-opacity': 0,
                        '--border-radius': 0,
                        '--left-wing-background': getVar('--primary-darkest'),
                        '--right-wing-background': getVar('--primary-darkest'),
                        duration: .1
                    }, {
                        '--left-wing-background': getVar('--primary'),
                        '--right-wing-background': getVar('--primary'),
                        duration: .1
                    }, {
                        '--left-body-background': getVar('--primary-dark'),
                        '--right-body-background': getVar('--primary-darkest'),
                        duration: .4
                    }, {
                        '--success-opacity': 1,
                        '--success-scale': 1,
                        duration: .25,
                        delay: .5
                    }]
                })

            }

        })

        // Get subscription request

    });
}

// Regex email format
function validateEmail(inputText) {
    // Example of valid email id

    //     mysite@ourearth.com
    //     my.ownsite@ourearth.org
    //     mysite@you.me.net

    // Example of invalid email id

    //     mysite.ourearth.com [@ is not present]
    //     mysite@.com.my [ tld (Top Level domain) can not start with dot "." ]
    //     @you.me.net [ No character before @ ]
    //     mysite123@gmail.b [ ".b" is not a valid tld ]
    //     mysite@.org.org [ tld can not start with dot "." ]
    //     .mysite@mysite.org [ an email should not be start with "." ]
    //     mysite()*@gmail.com [ here the regular expression only allows character, digit, underscore, and dash ]
    //     mysite..1234@yahoo.com [double dots are not allowed]
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    

    // Correct match return 0, other wise, wrong emails format is -1
    return inputText.value.match(mailFormat) ? 0 : -1;
    
}

// Regex name format
function validateName(inputText) {
    // Validate only alphabetical characters [a-zA-Z]
    const nameFormat = /^[A-Za-z]+([A-Za-z\s]*)$/;

    // Correct match return 0, other wise, wrong names format is -2
    return inputText.value.match(nameFormat) ? 0 : -2;
}

// Validate both mail and name generating a different error message for each case
function validateNewsletterInputs(email, name) {
    var validationIncomes = 0;
    var errorBox;

    // Verify mail and name and add their code values
    validationIncomes += validateEmail(email) + validateName(name);

    switch (validationIncomes) {
        // Mail and Name are correct
        case 0:
            return true;
        // Mail format is wrong
        case -1: 
            errorBox = new ErrorBox("Indrouce por favor una dirección de correo válida!",
                                    "Un correo válido debe tener un principio alfanumérico, debe contener una @, etc.");
            break;
        // Name format is wrong
        case -2: 
            errorBox = new ErrorBox("Indrouce por favor un nombre válido!",
                                    "Introduce por favor únicamente letras mayúsculas y minúsculas, sin números, carácteres especials o guiones.");
            break;
        // Both name and mail formats are wrong
        case -3:
            errorBox = new ErrorBox("Introduce por favor un nombre y dirección de correo válidos!" , 
                                    "Introduce por favor únicamente letras mayúsculas y minúsculas, sin números, carácteres especials o guiones " + 
                                    "y un correo electrónico con un principio alfanumérico, que contenga una @, un dominio, etc.");
            break;
    }
    
    // Call the render method on the error box instance, if it was created
    if (errorBox) {
        errorBox.render();
        return false;
    } else {
        return true;
    }
}


