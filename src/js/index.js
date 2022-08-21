import '../styles/main.scss';

let liveData;
let baseData;

getData().then((data) => {
    let rawData = data.media;
    
    rawData.sort((a, b) => {
        let ta = a.title.toLowerCase();
        let tb = b.title.toLowerCase();

        if (ta < tb) {
            return -1;
        } else if (ta > tb) {
            return 1;
        } else {
            return 0;
        }
    });

    baseData = rawData;
    liveData = baseData;

    // Functions to run on page load
    getMedia(baseData);
    generateFilterLists(baseData);
    
    // Runs filter function on keyup in search input field
    document.getElementById('js-search').addEventListener('keyup', (e) => {
        filter(baseData);
    })

    // Runs clearMedia function on click of Clear Filters link
    document.getElementById('js-clearFilters').addEventListener('click', (e) => {
        e.preventDefault;
        clearMedia();
    })

    // Runs fitler function on click of a radio button filter
    document.getElementById('js-filterType').addEventListener('click', (e) => {
        if (e.target.type == 'radio') {
            filter(baseData);
        }
    })
}).catch((error) => {
    console.log(error);
});


// Loops through media items, gets list of genres and years, and renders filter options
function generateFilterLists(data) {
    let genreList = [];
    let yearList = [];
    let genreDropdown = document.getElementById('js-genreDropdown');
    let yearDropdown = document.getElementById('js-yearDropdown');

    data.map((element) => {
        if (!yearList.includes(element)) {
            yearList.push(element.year);
        }

        element.genre.map((subElement) => {
            if (!genreList.includes(subElement)) {
                genreList.push(subElement);
            }
        })
    })

    buildFilterDropdown(genreDropdown, genreList, data);
    buildFilterDropdown(yearDropdown, yearList, data);


    // Renders the dropdown filters
    function buildFilterDropdown(dropdown, list) {
        list.sort();

        list.map((element) => {
            let listItem = document.createElement('div');

            listItem.className = 'dropdown-filter__option';
            listItem.innerHTML =
                '<input type="checkbox" id="' + element + '" name="' + element + '" value="' + element + '" class="js-dropdownInput" />' +
                '<label for="' + element + '">' + element + '</label>';
            dropdown.appendChild(listItem);

            // Runs filter function on click of any of the dropdown filter inputs
            listItem.addEventListener('click', (e) => {
                if (e.target.classList.contains('js-dropdownInput')) {
                    filter(data);
                }
            })
        })
    }
}


// Gets media data from API
async function getData() {
    const url = 'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json';
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


// Loops through all API data items and builds the HTML markup
function getMedia(media) {
    media.map((element) => {
        gatherMediaProps(element);
    })
}


// Loops through media item's genres and generates string
function buildGenreString(mediaGenres) {
    let mediaGenreString = 'Genres: '; 

    mediaGenres.map((element, index) => {
        if (index == 0) {
            mediaGenreString = mediaGenreString + capitalizeString(element);
        } else {
            mediaGenreString = mediaGenreString + ', ' + capitalizeString(element);
        }
    })

    return mediaGenreString;


    // Capitalizes first letter of string
    function capitalizeString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}


// Takes a media item in the form of an array, breaks out all it various attributes, and renders it
function gatherMediaProps(mediaItem) {
    let mediaPoster = mediaItem.poster;
    let mediaTitle = mediaItem.title;
    let mediaYear = mediaItem.year;
    let mediaGenres = buildGenreString(mediaItem.genre);

    buildMediaMarkup(mediaPoster, mediaTitle, mediaYear, mediaGenres);


    // Builds media item markup and adds it to the DOM
    function buildMediaMarkup(mediaPoster, mediaTitle, mediaYear, mediaGenres) {
        let mediaItem = document.createElement('a');

        mediaItem.className = 'media-item';
        mediaItem.setAttribute('href', '#');
        mediaItem.innerHTML = 
            '<img src="' + mediaPoster + '" class="media-item__img" />' +
            '<p class="media-item__title">' + mediaTitle + ' (' + mediaYear + ')</p>' +
            '<p class="media-item__genre">' + mediaGenres + '</p>';
        document.getElementById('js-mediaList').append(mediaItem);
    }
}

// Filters the base data based on the filter fields and runs the search
function filter(data) {
    let newData = [];
    let newFilterData = [];
    let yearFilterlist = document.getElementById('js-yearDropdown').getElementsByTagName('input');
    let newYearData = []
    let checkedYearFilterList = [];
    let genreFilterList = document.getElementById('js-genreDropdown').getElementsByTagName('input');
    let newGenreData = [];
    let checkedGenreFilterList = [];
    let typeFilterList = document.getElementById('js-filterType').getElementsByTagName('input');
    let newTypeData = [];
    let checkedTypeFilter = "";
    let searchTerm = document.getElementById('js-search').value;

    for (let i = 0; i < typeFilterList.length; i++) {
        if (typeFilterList[i].checked) {
            checkedTypeFilter = typeFilterList[i].value;
        }
    }

    checkedYearFilterList = getCheckedFilters(yearFilterlist)
    checkedGenreFilterList = getCheckedFilters(genreFilterList)

    data.map((element) => {
        if (checkedYearFilterList.length) {
            checkedYearFilterList.map((subElement) => {
                if (subElement == element.year) {
                    newYearData.push(element);
                }
            })
        } else {
            newYearData.push(element);
        }

        if (checkedGenreFilterList.length) {
            checkedGenreFilterList.map((subElement) => {
                let genres = element.genre;
                for (var i = 0; i < genres.length; i++) {
                    if (subElement == genres[i]) {
                        newGenreData.push(element);
                    }
                }
            })
        } else {
            newGenreData.push(element);
        }

        if (element.type == checkedTypeFilter) {
            newTypeData.push(element);
            console.log(checkedTypeFilter);
        }
    })

    newFilterData = checkArrayForDups(newYearData, newGenreData);

    if (newTypeData.length) {
        newData = checkArrayForDups(newFilterData, newTypeData);
    } else {
        newData = newFilterData;
    }

    clearMedia();
    
    liveData = newData

    newData.map((element) => {
        gatherMediaProps(element);
    })

    if (searchTerm.length) {
        search(searchTerm, liveData);
    }


    // Compars two arrays and returns the duplicates
    function checkArrayForDups(arrayOne, arrayTwo) {
        let dups = arrayOne.filter((val) => {
            return arrayTwo.indexOf(val) != -1;
        })

        return dups;
    }


    // Loops through array of dropdown filters and returns the checked ones
    function getCheckedFilters(list) {
        let checkedFilters = [];

        for (let i = 0; i < list.length; i++) {
            if (list[i].checked == true) {
                checkedFilters.push(list[i].value);
            }
        }

        return checkedFilters;
    }


    // Searches the filters media items
    function search(searchTerm, data) {
        let newData = [];

        clearMedia();

        if (searchTerm.length) {
            data.map((element) => {
                if (element.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    gatherMediaProps(element);
                    newData.push(element);
                }
            })
        }
    }
}


// Resets the media items to the default and clears the search input
function clearMedia() {
    liveData = baseData;

    document.getElementById('js-mediaList').innerHTML = '';
}

console.log('App Ready');
