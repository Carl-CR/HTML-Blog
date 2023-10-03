groupData = [["Amanda Showler", "100790028"],
             ["Anupriya Dubey", "100784096"],
             ["Mansi Patel", "100805283"],
             ["Joshua Trower", "Student #?"],
             ["Nicholas Barudi", "Student #?"],
             ["Carl Reina", "Student #?"]];

thData = ["Student Name","BannerID"];

$(document).ready(function() {
    let group = $("#group");

    // populate headings for table
    let tr = $("<tr>");
    for (let k = 0; k < 2; k++) {
        let th = $("<th>");
        th.append(thData[k]);
        tr.append(th);
    }
    group.append(tr);
    
    // populate group data dynamically
    for (let i = 0; i < groupData.length; i++) {
        let tr = $("<tr>");
        for (let j = 0; j < 2; j++) {
            let td = $("<td>");
            td.append(groupData[i][j]);
            tr.append(td);
        }
        group.append(tr);
    }
});