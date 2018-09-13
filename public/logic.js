
$.get("/articles", function(data) {
    for(i = 1; i < 5; i++){
        var articleTable = `<tr><td> <p <b>Title:<b> ${data[i].title} <br> <b>Link:<br> ${data[i].link}`;
        var newTable = $(".resultsTable").prepend(articleTable);
    } 
});