(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Shorthand function for calling document.querySelector
function q (selector) {
    return document.querySelector(selector)
}

// Shorthand function for calling document.querySelectorAll
function qAll (selector) {
    return document.querySelectorAll(selector)
}


// Variables
let input
let searchURL
const searchForm = q('#searchForm')
const searchButton = q('#searchButton')
const searchBar = q('#searchBar')


// When user releases Enter key, act as if submit button has been clicked
searchForm.addEventListener('keyup', function(event){
    if(event.keyCode === 'Enter'){
        event.preventDefault()
        searchButton.click()
    }
})


// Function to display search results
function getSearch(codes){

    const resultsDiv = document.createElement('div')
    resultsDiv.setAttribute("id", "resultsDiv")
    resultsDiv.innerHTML = `
        <ul style="list-style: none;" class="detail-list">
        <div class='ba bg-blue white'>
            <li class="list-item title">${codes.snippet_title}</li>
        </div>
            <br>
            <li class="list-item creator-and-date"><h4>Creator: ${codes.snippet_creator} <br> Date Added: ${codes.date_added}</h4></li> 
            <li class="list-item language"><h4>Language: ${codes.snippet_lang}</h4></li> 
            <li class="list-item code"><h4>Code: ${codes.snippet_code}</h4></li> 
        </ul>   
    `

    return resultsDiv
}


// Main execution
document.addEventListener('DOMContentLoaded', function() {

    // Execution for generating list of results upon search button clicked or enter key pressed
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault()
        input = encodeURIComponent(searchBar.value)
        searchURL = `http://localhost:8000/?search=${(input)}`

        fetch(searchURL)
            .then(response => response.json())
            .then(function (data) {
                console.log(data)
                searchResults.innerHTML = ''

                
                for (let codes of data.results){
                    searchResults.appendChild(getSearch(codes))
                }
        })
    })
})
},{}]},{},[1]);
