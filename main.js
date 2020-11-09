async function fetchCountryData() {
    let result = await fetch('https://restcountries.eu/rest/v2/all?fields=name;flag;currencies')
    result = await result.json()
    return result;
}

(async function() {
    // fetch country data
    const fetchedData = await fetchCountryData();
    // fill dropdown data with country info


    // select all dropdowns
    let allDropdowns = document.querySelectorAll('.currency-converted-to')


    // loop through my selected dropdowns
    allDropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', function() {
            if (isShowingDropdown(dropdown)) {
                hideDropdown(dropdown)
            } else {
                showDropdown(dropdown)
                fillDropDownData(fetchedData, dropdown)
                selectItsBabies(dropdown)
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
    const result = arrData.map(item => {
        return `
        <div class="select-dropdown-outer">
                    <div class="select-dropdown">
                        <div class="flag-country">
                            <div class="image">
                                <img id="dropdownimage"  src= "${item.flag}" alt="">
                            </div>
                            <p id="paragraph">${item.currencies[0].code} / ${item.currencies[0].name}</p>
                        </div>
                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                </div>
        `
    }).join('')
    return result
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
        // console.log(image.src);
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
    console.log(thisIsMeparameter);
    console.log(dropdownImage);
    screen.innerHTML = newParagraph.textContent
    image.src = dropdownImage.src
}
let refresh = document.querySelector('.fa-refresh')
let input = document.querySelector('.input')
refresh.addEventListener('click', () => {
    input.value = ''
})

// console.log(refresh);