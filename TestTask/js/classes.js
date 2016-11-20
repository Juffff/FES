"use strict";

class TableRowFactory {

    static createTableRow(id, title, language, popularity, index, votes, count, rating, releaseDate){

        let object = new Object();

        object = {
            id:id,
            title:title,
            language:language,
            popularity:popularity,
            index:index,
            votes:votes,
            count:count,
            rating:rating,
            releaseDate:releaseDate
        };

        return object;
    }
}