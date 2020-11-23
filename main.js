async function currencyValue() {
    let response = await fetch('https://v6.exchangerate-api.com/v6/fc4da33b8a253818d8608a30/latest/USD')
    data = await response.json()
    const match = Object.keys(data.conversion_rates)
    return match;
}

currencyValue()

async function fetchCountryData() {
    let results = await fetch('https://restcountries.eu/rest/v2/all?fields=name;flag;currencies')
    results = await results.json()

    // console.log(results[0]);czb
    let match = await currencyValue(); //['usd','eur']
    // match = Object.keys(match)
    // console.log(match);
    const answer = results.filter(item => {
        return match.includes(item.currencies[0].code) //usd
    }).reduce((total, item) => {
        return {
            ...total,
            [item.currencies[0].code]: item,
        }
    }, {})

    // console.log(answer);

    // const finalAnswer = []

    // answer.forEach(item => {
    //         const condition = finalAnswer.find(single => single.currencies[0].code == item.currencies[0].code)
    //         if (!condition) {
    //             finalAnswer.push(item)
    //         }
    //     })

    return Object.values(answer);
}

(async function() {
    // fetch country data
    const fetchedData = await fetchCountryData();

    // select all dropdowns
    let allDropdowns = document.querySelectorAll('.currency-converted-to')

    // loop through my selected dropdowns
    allDropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', function() {
            if (isShowingDropdown(dropdown)) {
                hideDropdown(dropdown)
            } else {
                showDropdown(dropdown)
                    // fill dropdown data with country info
                fillDropDownData(fetchedData, dropdown)
                selectItsBabies(dropdown)
                    // console.log('hello');

            }
        })
    });
})()

// fetchCountryData()

function fillDropDownData(data, item) {
    const dropdown = item.querySelector('.dropdown')
    dropdown.innerHTML = renderData(data)
}

function renderData(arrData) {
    const result = arrData
        .map(item => {
            return `
        <div class="select-dropdown-outer">
                    <div class="select-dropdown">
                        <div class="flag-country">
                            <div class="image">
                                <img id="dropdownimage" src="${item.flag}" alt="">
                            </div>
                            <p id="paragraph" data-code="${item.currencies[0].code}">${item.currencies[0].code} / ${item.currencies[0].name}</p>
                        </div>
                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                </div>
        `
        }).join('')
    return result
    console.log(result);
}

function isShowingDropdown(item) {
    let dropDown = item.querySelector('.dropdown')

    if (dropDown.classList.contains('dropdown-switch')) {
        return true;
    }

    return false;
}

function showDropdown(item) {
    let dropDown = item.querySelector('.dropdown')
    dropDown.classList.add('dropdown-switch')
}

function selectItsBabies(item) {
    const myChildren = item.querySelectorAll('.select-dropdown-outer')
    const screen = item.querySelector('#screen')
    const image = item.querySelector('#image')
    myChildren.forEach(piken => {
        piken.addEventListener('click', function() {
            thisIsMe(piken, screen, image)
        })
    })

}

function hideDropdown(item) {
    let dropDown = item.querySelector('.dropdown')
    dropDown.classList.remove('dropdown-switch')
}


function thisIsMe(thisIsMeparameter, screen, image) {
    let newParagraph = thisIsMeparameter.querySelector('#paragraph')
    let dropdownImage = thisIsMeparameter.querySelector('#dropdownimage')
    screen.innerHTML = newParagraph.textContent
    screen.dataset.code = newParagraph.dataset.code
    image.src = dropdownImage.src
}
// input clear
let refresh = document.querySelector('.fa-refresh')
let input = document.querySelector('.input')
refresh.addEventListener('click', clearAll)

function clearAll() {
    // const first = document.querySelector('.first')
    // const second = document.querySelector('.second')
    input.value = '0.00'
        // first.innerHTML = '0.00' + ' ' + 'USD'
        // second.innerHTML = '0.00' + ' ' + 'EUR'
}
async function calculate() {
    const screen = document.querySelectorAll('#screen')
    const firstScreen = screen[0]
    const secondScreen = screen[1]
    let firstScreenDataset = firstScreen.dataset.code
    const secondScreenDataset = secondScreen.dataset.code
    let response = await fetch(`https://v6.exchangerate-api.com/v6/fc4da33b8a253818d8608a30/latest/${firstScreenDataset}`)
    let data = await response.json()
    let dataValue = data.conversion_rates[secondScreenDataset]
    handleConverted(firstScreenDataset, secondScreenDataset, dataValue)
}

function handleConverted(firstScreenDataset, secondScreenDataset, dataValue) {
    const first = document.querySelector('.first')
    const second = document.querySelector('.second')
    if (input.value == '0.00') {
        first.innerHTML = '0.00' + ' ' + firstScreenDataset
    } else {
        first.innerHTML = input.value + ' ' + firstScreenDataset
    }
    second.innerHTML = (input.value * dataValue).toFixed(2) + ' ' + secondScreenDataset
}

let button = document.querySelector('button')
button.addEventListener('click', calculate)
    // window.addEventListener('load', clearAll)
    // let currencyConverted = document.querySelectorAll('.currency-converted-to')
    // currencyConverted.forEach(item => item.addEventListener('click', (e) => {
    //     console.log(e)
    //     if () {
    //         console.log('hello')
    //             // currencyConverted.classList
    //     } else {
    //         console.log('helfhhkhlo')
    //     }
    // }))