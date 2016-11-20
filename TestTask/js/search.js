"use strict";

window.onload = function () {
    let url = "https://api.themoviedb.org/3/search/movie";
    let apiKey = "b981ca80c900d4255d6891ea75328986";
    let searchField = document.getElementById("searchField");
    let searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", search);

    function search() {

        let requestObject;

            getResponce().then(function (data) {
                requestObject = JSON.parse(data);
                let rowArray = requestObject.results.map(function (object) {
                    var rowObject = TableRowFactory.createTableRow(object.id, object.title, object.original_language, object.popularity, object.vote_count, object.vote_average, object.release_date);
                    return rowObject;
                });
                let tableBody = document.querySelector("#filmsTable > tbody");
                rowArray.map(function (row) {
                    injectRow(tableBody,row);

                document.getElementsByClassName("container")[0].style.cssText = "display:block; margin: 0;";
                })
            }, function (error) {
                console.log(error);
            });
    }


    function injectRow(element, object){
        //element.appendChild()
        var tr = document.createElement("tr");
        element.appendChild(tr);
        let objArray = Object.keys(object).map(function (key) {
            let td = document.createElement("td");
            td.textContent=object[key];
            tr.appendChild(td);

        });
        element.appendChild(tr);

    }




    function getResponce() {

        return new Promise(function (resolve, reject) {

            let query = searchField.value;
            let uri = url + "?api_key=" + apiKey + "&query=" + query;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", uri);
            xhr.onload = function () {
                if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.responseText);}
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                }
            };
            xhr.send();

        });
    };

    class TableRowFactory {

        static createTableRow(id, title, language, popularity_index, votes, rating, releaseDate){

            let object = new Object();

            object = {
                id:id,
                title:title,
                language:language,
                popularity_index:popularity_index,
                votes:votes,
                rating:rating,
                releaseDate:releaseDate
            };

            return object;
        }
    }
};