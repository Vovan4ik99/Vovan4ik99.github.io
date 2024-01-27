//Sidepanel left offset counter
function adjustSidePanelPosition(language) {
    const sidePanel = document.querySelector('.sidepanel');

    let leftOffset;

    switch (language) {
        case 'en':
            leftOffset = '-85px';
            break;
        case 'pl':
            leftOffset = '-130px';
            break;
        case 'ua':
            leftOffset = '-100px';
            break;
    }

    sidePanel.style.left = leftOffset;
}


const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElement = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElement.addEventListener('click', () => {
    menu.classList.remove('active');
});

//Privacy policy
const privacyPolicyLinks = {
    en: 'privacy/Privacy-Policy-Termify.pdf',
    pl: 'privacy/polityka_prywatnosci_strony_internetowej.pdf',
    ua: 'privacy/Privacy-Policy-Termify.pdf'
};

function updatePrivacyPolicyLink(language) {
    const link = privacyPolicyLinks[language] || privacyPolicyLinks.en;
    document.getElementById('policy-link').setAttribute('href', link);
}

//Text translation
function translate(language) {
    document.querySelectorAll('[data-lang-en]').forEach(elem => {
      elem.textContent = elem.getAttribute(`data-lang-${language}`);
    });
  }
  
  document.querySelectorAll('.language-select__option').forEach(option => {
    option.addEventListener('click', function() {
        const selectedLanguage = this.getAttribute('data-value');
        const selectedLanguageText = this.textContent;

        translate(selectedLanguage);
        adjustSidePanelPosition(selectedLanguage);
        updatePrivacyPolicyLink(selectedLanguage);
        if(selectedLanguageText === 'UA') {
            document.documentElement.className = 'ua-lang';
        } else {
            document.documentElement.classList.remove('ua-lang');
        }

        const selectedLangElement = document.querySelector('.language-select .selected-lang');;
        selectedLangElement.textContent = selectedLanguageText;

        document.querySelector('.language-select__options').style.display = 'none';
        document.querySelector('.selected-lang').style.removeProperty('display');
    });
});

document.querySelector('.selected-lang').addEventListener('click', function() {
    const options = document.querySelector('.language-select__options');
    const isOptionsVisible = options.style.display === 'block';
    options.style.display = isOptionsVisible ? 'none' : 'block';
    this.style.display = 'none';
});

//github icon backgorund animation
window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const element = document.querySelector('.sidepanel__link--github');

    if (scrollPosition >= windowHeight * 0.8) {
        element.classList.add('link_activated');
    } else {
        element.classList.remove('link_activated');
    }
});

//skills raiting counter
const values = document.querySelectorAll('.skills__proficiency-value');
const lines = document.querySelectorAll('.skills__proficiency-line span');

values.forEach((value, idx) => {
    lines[idx].style.width = value.textContent;
})

//form validation
document.querySelector('.contacts__form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const text = document.getElementById('text').value.trim();
    const policy = document.getElementById('policy').checked;
    const language = document.querySelector('.language-select .selected-lang').textContent;
    let valid = true;
    let nameErrorMessage = '';
    if (language === 'EN') {
        nameErrorMessage = 'Please enter your name.';
    } else if (language === 'PL') {
        nameErrorMessage = 'Wpisz swoje imie.';
    } else if (language === 'UA') {
        nameErrorMessage = 'Введіть ім\'я.';
    }

    let emailErrorMessage = '';
    if (language === 'EN') {
        emailErrorMessage = 'Please enter a valid email.';
    } else if (language === 'PL') {
        emailErrorMessage = 'Wpisz poprawny adres email.';
    } else if (language === 'UA') {
        emailErrorMessage = 'Введіть дійсний email.';
    }

    let textErrorMessage = '';
    if (language === 'EN') {
        textErrorMessage = 'Please enter your message.';
    } else if (language === 'PL') {
        textErrorMessage = 'Wpisz swoją wiadomość.';
    } else if (language === 'UA') {
        textErrorMessage = 'Введіть повідомлення.';
    }

    let policyErrorMessage = '';
    if (language === 'EN') {
        policyErrorMessage = 'Please agree to the processing of personal data.';
    } else if (language === 'PL') {
        policyErrorMessage = 'Nie nadano zgody na przetwarzanie danych osobowych.';
    } else if (language === 'UA') {
        policyErrorMessage = 'Не надана згода на обробку персональних даних.';
    }
    
    let successMessage = '';
    if (language === 'EN') {
        successMessage = 'Your message has been sent successfully.';
    } else if (language === 'PL') {
        successMessage = 'Wiadomość została wysłana.';
    } else if (language === 'UA') {
        successMessage = 'Ваше повідомлення було успішно надіслано.';
    }

    let failMessage = '';
    if (language === 'EN') {
        failMessage = 'An error occurred while sending your message.';
    } else if (language === 'PL') {
        failMessage = 'Wystapil blad podczas wysylania wiadomosci.';
    } else if (language === 'UA') {
        failMessage = 'Виникла помилка під час надсилання повідомлення.';
    }
    
    document.querySelectorAll('.error-message').forEach(elem => elem.classList.remove('active'));

    if (!name) {
        showError('name', nameErrorMessage);
        valid = false;
    }
    if (!validateEmail(email)) {
        showError('email', emailErrorMessage);
        valid = false;
    }
    if (!text) {
        showError('text', textErrorMessage);
        valid = false;
    }
    if (!policy) {
        showError('policy', policyErrorMessage);
        valid = false;
    }

    if (valid) {
        var formData = new FormData(this);
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result) {
                alert(successMessage);
            } else {
                alert(failMessage);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }
});


function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.classList.add('active');
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}





