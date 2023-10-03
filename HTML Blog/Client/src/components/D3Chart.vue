<template>
    <div id="chart"></div>
</template>

<script>
    import * as d3 from 'd3';
    import axios from 'axios';
    export default {
        
        name: "D3Chart",

        data() {
            return {
                posts_dates:[],
                datecounts:[]
            }
        },
        methods: {
            fetchData(){
                axios.get('http://localhost:3500/CreateBlog')
                    .then((response) => {
                        let months = ["January","February","March","April","May"]
                        this.posts_dates = response.data.data;
                        for (let i=0; i<months.length; i++){
                            this.datecounts.push(0);
                        }
                        for (let key in this.posts_dates){
                            // console.log("Date:", this.posts_dates[key].date);
                            let x = this.posts_dates[key].date.split(" ")
                            console.log(x[0])
                            for (let i=0; i<months.length; i++){
                                if (x[0] == months[i]){
                                    this.datecounts[i] += 1
                                }
                            }
                        }
                        console.log(this.datecounts);
                    })
                    .catch((error) => {console.log(error)})
            },
            buildchart(){
                const data = [
                    {"Month": "Jan", "count": 3},
                    {"Month": "Feb", "count": 4},
                    {"Month": "Mar", "count": 1},
                    {"Month": "Apr", "count": 1},
                    {"Month": "May", "count": 1},
                ];

                const margin = 50;
                const width = 500;
                const height = 400;
                const chartWidth = width - 2 * margin;
                const chartHeight = height - 2 * margin;

                let maxposts = 0;
                for (let i=0; i<5;i++){
                    data[i].count = this.datecounts[i]
                    if (this.datecounts[i] > maxposts){
                        maxposts = this.datecounts[i]
                    }
                }



                const colourScale = d3.scaleLinear()
                                    .domain([0, maxposts])
                                    .range(['light-grey', 'grey']);
            
                const xScale = d3.scaleBand()
                                .domain(data.map((data) => data.Month))
                                .range([0, chartWidth])
                                .padding(0.3);
            
                const yScale = d3.scaleLinear()
                                .domain([0, maxposts])
                                .range([chartHeight, 0]);
                
                d3.select("#chart").selectAll("svg").remove();
                let svg = d3.select('#chart')
                                .append('svg')
                                .attr('width', width - margin.left - margin.right)
                                .attr('height', height)
                                .attr("viewBox", [0, 0, width, height]);
            
                // title for graph
                svg.append('text')
                    .attr('class', 'axis-label')
                    .attr('x', width / 2)
                    .attr('y', margin)
                    .attr('text-anchor', 'middle')
                    .text('Post Count')

                let g = svg.append('g')
                            .attr('transform', `translate(${margin}, ${margin})`);

                // y-axis with axis title
                g.append('g')
                    .call(d3.axisLeft(yScale))
                    .append('text')
                    .attr('class', 'axis-label')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', -90)
                    .attr('y', 30)
                    .attr('dy', '-7.0em')
                    .attr('fill', 'black')
                    .attr('font-size', '12px')
                    .text('Count');
            
                // x-axis with axis title
                g.append('g')
                    .attr('transform', `translate(0, ${chartHeight})`)
                    .call(d3.axisBottom(xScale))
                    .append("text")
                    .attr('class', 'axis-label')
                    .attr("y", 30)
                    .attr("x", (width / 2) - margin)
                    .attr("fill", "black")
                    .attr("font-size", "12px")
                    .text("Month");
            
                let rectangles = g.selectAll('rect')
                .data(data)
                .enter()
                    .append('rect')
                        .attr('x', (data) => xScale(data.Month))
                        .attr('y', (data) => yScale(data.count))
                        .attr('width', xScale.bandwidth())
                        .attr('height', (data) => chartHeight - yScale(data.count))
                        .attr('fill', (data) => colourScale(data.count))
            
                rectangles.transition()
                .ease(d3.easeElastic)
                .attr('height', (data) => chartHeight - yScale(data.count))
                .attr('y', (data) => yScale(data.count))
                .duration(1000)
                .delay((data, index) => index * 50);
            }
        },
        
        mounted() {

            //get all dates from user
            setTimeout(this.fetchData,10)

            setTimeout(this.buildchart,100)
        }
    }
</script>

<style>
.axis-label {
    fill: black;
}
</style>