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
const copyResults = q('#snippetDisplay')
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


// Function to Display Snippet on User Page Upon Copying Snippet
function UserPage(obj) {

    const copyDiv = document.createElement('div')
    copyDiv.setAttribute("id", "copyDiv")
    copyDiv.innerHTML = `   
            <div class='ba bg-blue white'>
            <p id="snippetTitle"><strong>${obj.title}</strong></p>
            <a class='f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue' id="snippetEdit" href="{% url 'edit_snippet' obj.pk %}">Edit</a>
            <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" id="snippetAdd" href="{% url 'add_snippet' %}">Add New</a>
            <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" id="snippetDelete" href="{% url 'delete_snippet' obj.pk %}">Delete</a>
            <button class="copy-button" data-id="${obj.id}" data-title="${obj.title}"  data-creator="${obj.creator}" data-date="${obj.date_added}" data-languages="${obj.languages}" data-code="${obj.code}" data-clipboard-target="#snippetCode"> 
            Copy Snippet</button>   
         </div>
        <div>
            <p id="snippetCreator">by ${obj.creator}</p>
            <p id="snippetDate">added ${obj.date_added}</p>
        </div>
        <div>
            <p id="snippetLanguages"> Language: ${obj.languages}</p>
        </div>
        <div><pre><code class='language-${obj.languages}' id="obj-content-${obj.id}">
        <p id="snippetCode">${obj.code }</p>
        </code></pre>
        </div>
`

    return copyDiv
}


// Variables for Copying a Snippet
let copy_button = q('.copy-button')
let copyButton = new ClipboardJS(copy_button)
let title
let creator
let languages
let code
let copy
let copyCode
let copySnippet

// Main execution
document.addEventListener('DOMContentLoaded', function() {

// Execution for copySnippet()
 copyResults.addEventListener('click', function (event) {
                if (event.target && event.target.matches(copyButton)) {
                    title = event.target.dataset['title']
                    creator = event.target.dataset['creator']
                    languages = event.target.dataset['languages']
                    code = decodeURI(event.target.dataset['code'])
                    copyCode = event.target.dataset['pk']


                    copySnippet = {
                        "title": title,
                        "creator": creator,
                        "languages": languages,
                        "code": code,
                        "copy": copyCode,
                    }
                    // console.log(copyDict)
                    console.log(JSON.stringify(copySnippet))
                    fetch('http://localhost:8000/add_snippet', {
                        method: 'POST',
                        body: JSON.stringify(copyDict),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .then(response => console.log('Success:', JSON.stringify(response)))
                        .catch(error => console.error('Error:', error));
                }
            })

})
},{}]},{},[1]);
