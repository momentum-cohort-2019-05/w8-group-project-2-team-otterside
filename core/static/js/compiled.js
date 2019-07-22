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
let count = 0
let csrftoken = getCookie('csrftoken')
const searchResults = q('#searchResults')
const copyResults = q('#copyResults')
const searchForm = q('#searchForm')
const searchButton = q('#searchButton')
const searchBar = q('#searchBar')
const cors = `https://cors-anywhere.herokuapp.com/`


// Django Documentation for Acquiring Token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


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
            <div class='ba bg-blue white'>
                <p><strong>${codes.title}</strong></p>
                <a class='f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue' href="{{ codes.get_absolute_url }}">Edit</a>
                <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" href="{% url 'add_snippet' %}">Add New</a>
                <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" href="{% url 'delete_snippet' %}">Delete</a>
            </div>
            <div>
                <p>by ${codes.creator}</p>
                <p>added ${codes.date_added}</p>
            </div>
            <div>
                <p> Language: ${codes.languages}</p>
            </div>
            <div><pre><code class='language-${codes.languages}'>
                <p>${codes.code }</p>
            </code></pre>
            <div><p>Snippet has been copied {{count}} times.</p></div>
            </div>
    `

    return resultsDiv
}

// Function to Display Snippet on User Page Upon Copying Snippet
function UserPage(obj) {

    const copyDiv = document.createElement('div')
    copyDiv.setAttribute("id", "copyDiv")
    copyDiv.innerHTML = `   
            <div class='ba bg-blue white'>
            <p><strong>${obj.title}</strong></p>
            <a class='f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue' href="{{ snippet.get_absolute_url }}">Edit</a>
            <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" href="{% url 'add_snippet' %}">Add New</a>
            <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" href="{% url 'delete_snippet' %}">Delete</a>
        </div>
        <div>
            <p>by ${obj.creator}</p>
            <p>added ${obj.date_added}</p>
        </div>
        <div>
            <p> Language: ${obj.languages}</p>
        </div>
        <div><pre><code class='language-${obj.languages}'>
            <p>${obj.code }</p>
        </code></pre>
        </div>
`

    return copyDiv
}


// Function to Copy Snippets using ClipboardJS
function copySnippet() {

    let copyButton = new ClipboardJS('.copy-button')

    copyButton.on("success", function (event) {
        let obj = $(event.trigger).data()
        obj.content = event.text
        $.ajax({
            type: "POST",
            url: "/api/snippets/",
            dataType: "json",
            data: {
                title: `${obj.title} `,
                creator: `${obj.creator}`,
                date: `${obj.date_added}`,
                language: `${obj.languages} `,
                code: `${obj.code} `,
                csrfmiddlewaretoken: csrftoken,
            }
        }).then(function (success) {
            console.log(success)
            count++
            console.log(count)
            copyResults.innerHTML = ''

            copyResults.append(UserPage(obj))
        })
    })

    copyButton.on("error", function (event) {
        console.error('Action:', event.action)
        console.error('Trigger:', event.trigger)
    })
}



// Main execution
document.addEventListener('DOMContentLoaded', function() {

// Execution for copySnippet()
copySnippet()

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
