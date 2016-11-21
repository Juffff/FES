"use strict";

window.onload = function () {

    let url = "https://api.themoviedb.org/3/search/movie";
    let apiKey = "b981ca80c900d4255d6891ea75328986";
    let searchField = document.getElementById("searchField");
    let searchButton = document.getElementById("searchButton");
    let tbl;
    let upArrow = "↑";
    let downArrow = "↓";
    searchButton.addEventListener("click", receiveData);


    function receiveData() {
        let query = searchField.value;
        let uri = url + "?api_key=" + apiKey + "&query=" + query;
        let requestObject;

        //noinspection JSUnresolvedFunction
        fetch(uri).then(
            function (responce) {
                if (responce.status >= 200 && responce.status < 300) {
                    return responce.json();
                }
            }
        ).then(function (responce) {
            requestObject = responce;
            //noinspection JSUnresolvedVariable
            let rowArray = requestObject.results.map(function (object) {
                //noinspection JSUnresolvedVariable
                return TableRowFactory.createTableRow(object.id, object.title, object.original_language, object.popularity, object.vote_count, object.vote_average, object.release_date);

            });

            let tableBody = document.querySelector("#filmsTable > tbody");
            rowArray.map(function (row) {
                injectRow(tableBody, row);

                document.getElementsByClassName("container")[0].style.cssText = "display:block; margin: 0;";
            });

            //ADD LISTENERS
            tbl = document.getElementById("filmsTable");
            addColumnEventListeners(tbl);
        })
    }

    function injectRow(element, object) {

        let tr = document.createElement("tr");
        element.appendChild(tr);
        Object.keys(object).map(function (key) {
            let td = document.createElement("td");
            td.textContent = object[key];
            tr.appendChild(td);

        });
        element.appendChild(tr);

    }

    class TableRowFactory {

        static createTableRow(id, title, language, popularity_index, votes, rating, releaseDate) {


            return {
                id: id,
                title: title,
                language: language,
                popularity_index: popularity_index,
                votes: votes,
                rating: rating,
                releaseDate: releaseDate
            };

        }
    }

    function addColumnEventListeners(table) {
        let header = table.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");

        for (let i = 0; i < header.length; i++) {
            header[i].addEventListener("click", processSorting);
        }

        function processSorting() {

            let tableRowObjectArray = tableToObjectArray(tbl);

            if (this.textContent.match(downArrow)) {
                clearHeaderArrows();
                this.textContent = this.textContent + upArrow;
                tbl = document.getElementById("filmsTable");
                tableRowObjectArray = tableToObjectArray(tbl);
                let sortedTableRowObjectArray = sortArrayByColumnDownUp(tableRowObjectArray, this.cellIndex);
                printArray(sortedTableRowObjectArray);
            } else if (this.textContent.match(upArrow)) {
                clearHeaderArrows();
                this.textContent = this.textContent + downArrow;
                tbl = document.getElementById("filmsTable");
                tableRowObjectArray = tableToObjectArray(tbl);
                let sortedTableRowObjectArray = sortArrayByColumnUpDown(tableRowObjectArray, this.cellIndex);
                printArray(sortedTableRowObjectArray);
            } else {
                clearHeaderArrows();
                this.textContent = this.innerHTML + downArrow;
                let sortedTableRowObjectArray = sortArrayByColumnUpDown(tableRowObjectArray, this.cellIndex);
                printArray(sortedTableRowObjectArray);

            }


        }

        function printArray(sortedTableRowObjectArray) {
            clearTable(tbl);
            let tableBody = document.querySelector("#filmsTable > tbody");
            sortedTableRowObjectArray.map(function (row) {
                injectRow(tableBody, row);
            });
        }

        function clearHeaderArrows() {
            for (let i = 0; i < header.length; i++) {
                header[i].textContent = header[i].textContent.replace(downArrow, "").replace(upArrow, "");
            }
        }
    }


    function tableToObjectArray(table) {
        let rowArray = [];
        let tbodyContent = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (let i = 0; i < tbodyContent.length; i++) {
            let tr = tbodyContent[i].getElementsByTagName("td");
            rowArray.push(TableRowFactory.createTableRow(tr[0].textContent, tr[1].textContent, tr[2].textContent, tr[3].textContent, tr[4].textContent, tr[5].textContent, tr[6].textContent));
        }

        return rowArray;
    }

    function sortArrayByColumnUpDown(array, index) {

        return (array.sort(compare));

        function compare(row1, row2) {
            let keyArray = Object.keys(array[0]);

            if (!isNaN(Number(row1[keyArray[index]]))) {
                return row1[keyArray[index]] - row2[keyArray[index]];
            } else if (row1[keyArray[index]].match(/\d{4}-\d{2}-\d{2}/) !== null) {
                return (new Date(row1[keyArray[index]])) - (new Date(row2[keyArray[index]]));
            } else {
                if (row1[keyArray[index]].replace('\t', '') > row2[keyArray[index]].replace('\t', '')) {
                    return 1;
                }
                else if (row1[keyArray[index]].replace('\t', '') < row2[keyArray[index]].replace('\t', '')) {
                    return -1;
                }
                return 0;
            }

        }
    }

    function sortArrayByColumnDownUp(array, index) {

        return (array.sort(compare));

        function compare(row1, row2) {
            let keyArray = Object.keys(array[0]);

            if (!isNaN(Number(row1[keyArray[index]]))) {
                return row2[keyArray[index]] - row1[keyArray[index]];
            } else if (row1[keyArray[index]].match(/\d{4}-\d{2}-\d{2}/) !== null) {
                return (new Date(row2[keyArray[index]])) - (new Date(row1[keyArray[index]]));
            } else {
                if (row1[keyArray[index]].replace('\t', '') < row2[keyArray[index]].replace('\t', '')) {
                    return 1;
                }
                else if (row1[keyArray[index]].replace('\t', '') > row2[keyArray[index]].replace('\t', '')) {
                    return -1;
                }
                return 0;
            }
        }
    }


    function clearTable(table) {
        table.removeChild(table.getElementsByTagName("tbody")[0]);
        table.appendChild(document.createElement("tbody"));

    }


};





