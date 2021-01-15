'use strict';

function bmiCalculator() {
    const weight = document.querySelector('#Waga').value;
    const height =(document.querySelector('#Wzrost').value) * 0.01;
    const BMI = Math.round(weight / Math.pow(height, 2));
    const res = document.querySelector('#wynik');
    res.innerText = BMI;
    res.style.display = "block";
    if (BMI < 16) {
        res.innerText = `${BMI}  
        ${'Poważna niedowaga'}`;
    } else if (BMI < 18.5) {
        res.innerText = `${BMI}
        ${'Niedowaga'}`;
    } else if (BMI < 25) {
        res.innerText = `${BMI}
        ${'Normalna waga ciała'}`;
    } else if (BMI < 30) {
        res.innerText = `${BMI}
        ${'Nadwaga'}`;
    } else if (BMI < 35) {
        res.innerText = `${BMI} 
        ${'Otyłość I stopnia'}`;
    } else if (BMI < 40) {
        res.innerText = `${BMI}
        ${'Otyłość 2 stopnia'}`;
    } else {
        res.innerText = `${BMI}
        ${'Otyłość 3 stopnia'}`;
    }
    
}   

document.querySelector('#calc').addEventListener('click', bmiCalculator);

function Formclear() {
    document.querySelector('#wynik').style.display = 'none';
}
document.querySelector('#reset').addEventListener('click', Formclear);