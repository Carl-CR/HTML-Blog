// add script code
$(document).ready(function(){ 
    $("#submit-button").click(function(event){ 
        event.preventDefault(); 
        var title = $("#title-input").val(); 
        var post = $("#post-input").val(); 

        //Create table
        var table = $("<table></table>").attr("id", "my-table");

        //Create header row for title
        var headerRow = $("<tr></tr>"); 
        var headerCell = $("<th></th>").text(title); 
        headerRow.append(headerCell);
        table.append(headerRow);

        // Create a data row with the post 
        var dataRow = $("<tr></tr>");
        var dataCell = $("<td></td>").text(post);
        dataRow.append(dataCell);
        table.append(dataRow);

        // Add the table to the body of the document
        $("body").append(table);
        //$("#blog").append(table);

    })
});