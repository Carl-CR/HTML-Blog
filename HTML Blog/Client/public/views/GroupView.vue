<template>
    <div class="mode-change">
        <h3>Group Members Table</h3>
        <table id="group"></table>
    </div>
</template>

<script>
    import $ from "jquery"

    // add external Javascript script
    export default {
        mounted(){
            let groupData = [["Amanda Showler", "100790028"],
                    ["Anupriya Dubey", "100784096"],
                    ["Mansi Patel", "100805283"],
                    ["Joshua Trower", "100791683"],
                    ["Nicholas Barudi", "100779560"],
                    ["Carl Reina", "100780526"]];

            let thData = ["Student Name","BannerID"];
            let group = $("#group");

            // populate headings for table
            let tr = $("<tr>");
            for (let k = 0; k < 2; k++) {
                let th = $("<th class='table-header'>");
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
        }
}
</script>

<style>
    /* add group css */

    body{
        background-color: white;
        /* font-family: 'Delicious Handrawn', cursive; */
        font-family: 'Bad Script', cursive;
    }

    .mode-change {
        color: black;
        /*border-color: black;
        border: 2px solid black;*/
    }
    
    #group .mode-change {
        border: 2px solid black;
    }

    h3 {
        font-weight: bold;
        text-align: center;
        padding-top: 50px;
        font-size: 25px; 
    }

    #group {
        /*Center group table on screen */
        margin-left: auto;
        margin-right: auto;
        margin-top: 100px;
        border: 2px solid; /*black;*/
        border-collapse: collapse;
    }

    #group td {
        font-size: 15px;
        text-align: center;
        height: 20px;
        width: 220px;
        border: 1px solid; /*black;*/
        border-collapse: collapse;
    }

    #group th {
        text-align: center;
        /*border: 2px solid; black;*/
        border-collapse: collapse;
    }

    .dark-mode .table-header{
        color: white;
    }


    
</style>
