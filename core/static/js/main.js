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


// // When user releases Enter key, act as if submit button has been clicked
// searchForm.addEventListener('keyup', function(event){
//     if(event.keyCode === 'Enter'){
//         event.preventDefault()
//         searchButton.click()
//     }
// })


// Function to display search results
function getSearch(codes){

    const resultsDiv = document.createElement('div')
    resultsDiv.setAttribute("id", "resultsDiv")
    resultsDiv.innerHTML = `
            <div class='ba bg-blue white'>
                <p id="snippetTitle"><strong>${codes.title}</strong></p>
                <a class='f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue' id="snippetEdit" href="{% url 'edit_snippet' obj.pk %}">Edit</a>
                <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" id="snippetAdd" href="{% url 'add_snippet' %}">Add New</a>
                <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" id="snippetDelete" href="{% url 'delete_snippet' obj.pk %}">Delete</a>
                <button class="copy-button" data-id="${obj.id}" data-title="${obj.title}"  data-creator="${obj.creator}" data-date="${obj.date_added}" data-languages="${obj.languages}" data-code="${obj.code}" data-clipboard-target="#obj-content-${obj.id}"> 
                Copy Snippet</button>   
            </div>
            <div>
                <p id="snippetCreator">by ${codes.creator}</p>
                <p id="snippetDate">added ${codes.date_added}</p>
            </div>
            <div>
                <p id="snippetLanguages"> Language: ${codes.languages}</p>
            </div>
            <div><pre><code class='language-${codes.languages}' id="obj-content-{{codes.id}}">
                <p id="snippetCode">${codes.code }</p>
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
            <p id="snippetTitle"><strong>${obj.title}</strong></p>
            <a class='f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue' id="snippetEdit" href="{% url 'edit_snippet' obj.pk %}">Edit</a>
            <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" id="snippetAdd" href="{% url 'add_snippet' %}">Add New</a>
            <a class="f6 link mt5 dim br3 ph3 pv2 mb2 dib white bg-dark-blue" id="snippetDelete" href="{% url 'delete_snippet' obj.pk %}">Delete</a>
            <button class="copy-button" data-id="${obj.id}" data-title="${obj.title}"  data-creator="${obj.creator}" data-date="${obj.date_added}" data-languages="${obj.languages}" data-code="${obj.code}" data-clipboard-target="#obj-content-${obj.id}"> 
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



// Function to Copy Snippets using ClipboardJS
// function copySnippet() {

//     let copyButton = new ClipboardJS('.copy-button')

//     copyButton.on("success", function (event) {
//         let obj = $(event.trigger).data()
//         obj.content = event.text
//         $.ajax({
//             type: "POST",
//             url: "/api/snippets/",
//             dataType: "json",
//             data: {
//                 title: `${obj.title} `,
//                 creator: `${obj.creator}`,
//                 date: `${obj.date_added}`,
//                 language: `${obj.languages} `,
//                 code: `${obj.code} `,
//                 csrfmiddlewaretoken: csrftoken,
//             }
//         }).then(function (success) {
//             console.log(success)
//             count++
//             console.log(count)
//             copyResults.innerHTML = ''

//             copyResults.append(UserPage(obj))
//         })
//     })

//     copyButton.on("error", function (event) {
//         console.error('Action:', event.action)
//         console.error('Trigger:', event.trigger)
//     })
// }

let titleCopy
let creatorCopy
let languagesCopy
let codeCopy
let copyOriginal
let copyDict



// Main execution
document.addEventListener('DOMContentLoaded', function() {

// Execution for copySnippet()
            // copySnippet()

            copyResults.addEventListener('click', function (event) {
                if (event.target && event.target.matches('.copy-button')) {
                    titleCopy = event.target.dataset['title']
                    creatorCopy = event.target.dataset['creator']
                    languagesCopy = event.target.dataset['languages']
                    codeCopy = decodeURI(event.target.dataset['code'])
                    copyOriginal = event.target.dataset['pk']
            
            
                    copyDict = {
                        "title": titleCopy,
                        "creator": creatorCopy,
                        "languages": languagesCopy,
                        "code": codeCopy,
                        "original": copyOriginal,
                    }
                    // console.log(copyDict)
                    console.log(JSON.stringify(copyDict))
                    fetch('http://localhost:8000/user_page', {
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