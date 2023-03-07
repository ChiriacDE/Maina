class ErrorBox {
    constructor(messageFront, messageBack) {
        // Main error container (contains also the background)
        this.errorBox = document.createElement('div');
        this.errorBox.id = 'error-box';
    
        // Visible card
        const errorFront = document.createElement('div');
        errorFront.classList.add('error-square', 'error-front');

        this.errorBox.appendChild(errorFront);

        // Dots above on the right side
        const dot1 = document.createElement('div');
        dot1.classList.add('dot', 'goToFront__button', 'active');
    
        const dot2 = document.createElement('div');
        dot2.classList.add('dot', 'two', 'goToBack__button');
    
        // Create the face elements
        const face = document.createElement('div');
        face.classList.add('face');
    
        const eye1 = document.createElement('div');
        eye1.classList.add('eye');
    
        const eye2 = document.createElement('div');
        eye2.classList.add('eye', 'right');
    
        const mouth = document.createElement('div');
        mouth.classList.add('mouth', 'sad');
    
        // Append face elements to the face
        face.appendChild(eye1);
        face.appendChild(eye2);
        face.appendChild(mouth);
    
        // Create shadow
        const shadow = document.createElement('div');
        shadow.classList.add('shadow', 'move');
    
        // Create the error messages
        const messageElem = document.createElement('div');
        messageElem.classList.add('message');
        const h3 = document.createElement('h3');
        h3.classList.add('alert');
        h3.textContent = 'Oops!';
        const p = document.createElement('p');

        // Custom message to be added by passing it as parameter on the constructor
        p.textContent = messageFront;
        messageElem.appendChild(h3);
        messageElem.appendChild(p);
    
        // Create button
        const buttonBox = document.createElement('button');
        buttonBox.classList.add('error-button-box');
        const h2Button = document.createElement('h2');
        h2Button.classList.add('red');
        h2Button.textContent = 'De acuerdo';
    
        // Append title to the button
        buttonBox.appendChild(h2Button);
    
        // Add everything on the visible card
        errorFront.appendChild(dot1);
        errorFront.appendChild(dot2);
        errorFront.appendChild(face);
        errorFront.appendChild(shadow);
        errorFront.appendChild(messageElem);
        errorFront.appendChild(buttonBox);


        // Create a back of the card
        const errorBack = document.createElement('div');
        errorBack.classList.add('error-square', 'error-back', 'hidden');

        this.errorBox.appendChild(errorBack);

        // Dots above on the right side for the back
        const dot1Back = document.createElement('div');
        dot1Back.classList.add('dot', 'goToFront__button');
    
        const dot2Back = document.createElement('div');
        dot2Back.classList.add('dot', 'two', 'goToBack__button', 'active');

        // Create the error messages for the backside of the card
        const messageElemBack = document.createElement('div');

        messageElemBack.classList.add('message');
        const h3Back = document.createElement('h3');
        h3Back.classList.add('alert');
        h3Back.textContent = '¿Cómo funciona?';
        const pBack = document.createElement('p');

        // Custom message to be added by passing it as parameter on the constructor
        pBack.textContent = messageBack;
        messageElemBack.appendChild(h3Back);
        messageElemBack.appendChild(pBack);

        // Create same button also for the back side
        const buttonBoxBack = document.createElement('button');
        buttonBoxBack.classList.add('error-button-box');
        const h2ButtonBack = document.createElement('h2');
        h2ButtonBack.classList.add('red');
        h2ButtonBack.textContent = 'De acuerdo';
    
        // Append title to the button
        buttonBoxBack.appendChild(h2ButtonBack);

        // Add everything on the backside of card
        errorBack.appendChild(dot1Back);
        errorBack.appendChild(dot2Back);
        errorBack.appendChild(messageElemBack);
        errorBack.appendChild(buttonBoxBack);

        // Add event listeners for touch events
        let touchStartX = null;
        let touchEndX = null;

        this.errorBox.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
            touchEndX = touchStartX;
        });

        this.errorBox.addEventListener('touchmove', (event) => {
            touchEndX = event.touches[0].clientX;
        });

        this.errorBox.addEventListener('touchend', () => {
            const deltaX = touchEndX - touchStartX;
            if (deltaX > 50) {
                // Swipe to the right, show back side
                this.showBackSide();
            } else if (deltaX < -50) {
                // Swipe to the left, show front side
                this.showFrontSide();
            }
        });

        // Initialize behavior on the constructor
        this.removeBox();
    }
  
    render() {
        document.body.appendChild(this.errorBox);
        this.swapCardsByDots();
    }

    // Make buttons clickable
    removeBox() {
        this.errorBox.querySelectorAll('.error-button-box').forEach(button => {
            button.addEventListener('click', () => {
                this.errorBox.remove();
                document.querySelector('body').classList.remove('no-scroll');
            });
        });
    }

    // Swipper for the front side
    showFrontSide() {
        const frontSide = this.errorBox.querySelector('.error-front');
        const backSide = this.errorBox.querySelector('.error-back');

        frontSide.classList.add('visible');
        frontSide.classList.remove('hidden');

        backSide.classList.add('hidden');
        backSide.classList.remove('visible');
    }

    // Swipper for the back side
    showBackSide() {
        const frontSide = this.errorBox.querySelector('.error-front');
        const backSide = this.errorBox.querySelector('.error-back');

        backSide.classList.add('visible');
        backSide.classList.remove('hidden');

        frontSide.classList.add('hidden');
        frontSide.classList.remove('visible');
    }

    // Swap the cards by pressing the buttons
    swapCardsByDots() {
        // Get the buttons from both cards
        const goToBackButton = document.querySelectorAll('.goToBack__button');
        const goToFrontButton = document.querySelectorAll('.goToFront__button');

        // Get the cards
        const frontSide = document.querySelector('.error-front');
        const backSide = document.querySelector('.error-back');

        // For each left button should bring the backside on top
        goToBackButton.forEach(button => {
            button.addEventListener('click', () => {
                backSide.classList.add('visible');
                backSide.classList.remove('hidden');

                frontSide.classList.add('hidden');
                frontSide.classList.remove('visible');
            });
        });

        // For each right button should bring the frontside on top
        goToFrontButton.forEach(button => {
            button.addEventListener('click', () => {
              
                frontSide.classList.add('visible');
                frontSide.classList.remove('hidden');

                backSide.classList.add('hidden');
                backSide.classList.remove('visible');
            });
        });
    }
}