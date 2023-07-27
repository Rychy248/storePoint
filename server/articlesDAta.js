// const { json } = require("body-parser");

let data = [
    {
        "title" :	"RESTfull",
        "content" :	"The REpresentational State Transisional, is a especifc architecture for api constructure, like others, for example: SOAP, GRAPql, etc..."
    }
    ,
    {
        "title" :	"HTTP",
        "content" :	"The Hypertext Transfer Protocol (HTTP) is an application layer protocol in the Internet protocol suite model for distributed, collaborative, hypermedia information systems. HTTP is the foundation of data communication for the World Wide Web, where hypertext documents include hyperlinks to other resources that the user can easily access, for example by a mouse click or by tapping the screen in a web browser."
    }
    ,
    {
        "title" : "HTML",
        "content" : "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for its appearance. "
    }
    ,
    {
        "title" : "HTTPS",
        "content" : "Hypertext Transfer Protocol Secure (HTTPS) is an extension of the Hypertext Transfer Protocol (HTTP). It uses encryption for secure communication over a computer network, and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL). The protocol is therefore also referred to as HTTP over TLS, or HTTP over SSL. "
    }
    ,
    {
        "title" : "Comunication Protocol", 
        "content" : "A communication protocol is a system of rules that allows two or more entities of a communications system to transmit information via any variation of a physical quantity. The protocol defines the rules, syntax, semantics, and synchronization of communication and possible error recovery methods. Protocols may be implemented by hardware, software, or a combination."
    }
];

// FETCH 

// GET ALL CALL 
/*
    fetch("http://localhost:8080/articles", {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log('error: ', error)
    });
*/

// GET SINGLE
/*
    let id = "64a8562913c339c5d0aa2e0f";
    fetch(`http://localhost:8080/articles/${id}`, {
        method: "GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log('error: ', error)
    });
*/

// POST SINGLE CALL 
/*
    fetch("http://localhost:8080/articles", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "title" : "HTTPS",
            "content" : "Hypertext Transfer Protocol Secure (HTTPS) is an extension of the Hypertext Transfer Protocol (HTTP). It uses encryption for secure communication over a computer network, and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL). The protocol is therefore also referred to as HTTP over TLS, or HTTP over SSL. "
        })
    })
    .then(response => response.json())
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log('error: ', error)
    });
*/

// DELETE ONE CALL
/*
    let id = "64a8586af7969da95fdf3230"; 
    let requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(`http://localhost:8080/articles/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
*/
// DELETE ALL CALL
/*
    let requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/articles", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)
    );
*/

// PUT SINGLE CALL
/*
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
    "title": "HTML 5",
    "content": "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript. Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for its appearance. "
});

let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};
let id = "64a85866af7969a95fdf3232";
fetch(`http://localhost:8080/articles/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
*/

// PATCH SINGLE CALL
/*
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "title": "HTML 4 MODIFYED",
        "content": "HTML 5 It's content"
    });
    let _ID = "64a8562913c339c5d0aa2e0f";
    let requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://localhost:8080/articles/${_ID}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
*/


