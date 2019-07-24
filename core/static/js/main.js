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



// Function to Copy Snippets using ClipboardJS
function copySnippet() {

    let copyButton = new ClipboardJS('.copy-button')
    

    copyButton.on("success", function (event) {
        console.log(event)
        let obj = $(event.trigger).data()
        obj.content = event.text
        console.log(obj)
        $.ajax({
            type: "POST",
            url: "/add_snippet/",
            dataType: "json",
            data: {
                title: event.target.dataset['title'],
                creator: event.target.dataset['creator'],
                date: event.target.dataset['date_added'],
                language: event.target.dataset['languages'],
                code: event.target.dataset['code'],
                csrfmiddlewaretoken: csrftoken,
            },
        }).then(console.log(data)).then(function (success) {
            console.log(success)
            count++
            console.log(count)
            copyResults.innerHTML = ''

            copyResults.append(UserPage(obj))
        })
    })
}




// Main execution
document.addEventListener('DOMContentLoaded', function() {

// Execution for copySnippet()
            copySnippet()


})