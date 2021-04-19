const data_url = "https://www.project.komplab.com/zeraki/data/";
async function datafetch(params) {
    const loadsawat = await fetch(data_url);
    if (loadsawat.status !== 200) {
        throw new Error(`Error ${loadsawat.status} Message: ${loadsawat.statusText}`);
    }
    const prosdata = await loadsawat.json();
    return prosdata;
}
datafetch()
    .then((rec_data) => {
        console.log("Resolved 1");
        return rec_data
    })
    .then((passed_data) => {
        console.log("Process Data");
        stdinfo_function(passed_data);
        exainfo_function(passed_data);
        graph_function(passed_data);
    })
    .catch((errors) => {
        console.log("Rejected");
        console.log(errors);
    })


    
function stdinfo_function(data_param) {
    document.getElementById("std_img").src = data_param.student_photo;
    document.getElementById("std_name").innerText = data_param.student_name;
    document.getElementById("stndmm").innerText = data_param.student_name;
    document.getElementById("stdid").innerText = data_param.student_admission_number;
    document.getElementById("std_level").innerText = data_param.class_name;
}

function exainfo_function(data_param) {
    let examname = data_param.exam_name;
    let arrexn = examname.split("-");
    let myregs = /[^a-z0-9 ]/gi;

    let mystrin = arrexn[2].replace(myregs, "")

    document.getElementById("stdexaman").innerText = mystrin.slice(5) + " - " +arrexn[1];
    document.getElementById("examclass").innerText = arrexn[0];
    document.getElementById("examcat").innerText = arrexn[1];
    document.getElementById("examyearterm").innerText = mystrin;
    document.getElementById("catgrade").innerText = data_param.mean_grade;
    document.getElementById("avgmarks").innerText = data_param.mean_marks.avg_score;
    document.getElementById("strmpos").innerText = data_param.stream_position.position;
    document.getElementById("strmpop").innerText = data_param.stream_position.position_out_of;

    document.getElementById("overpos").innerText = data_param.overall_position.position;
    document.getElementById("overpop").innerText = data_param.overall_position.position_out_of;

    document.getElementById("prinpal").innerText = data_param.principals_remarks;
    document.getElementById("clasteacher").innerText = data_param.class_teachers_remarks;

    let arrofsub = data_param.subject_results;
    let mysubjestr = '';

    arrofsub.sort((a, b) => b["score"] - a["score"])

    for (const arrelem of arrofsub) {
        mysubjestr += `
        
        <tr id="subjt">
            <th scope="col">${arrelem.subject_name}</th>
            <td>${arrelem.score}</td>
            <td>${arrelem.grade} </td>
            <td>${arrelem.rank} / ${arrelem.rank_out_of}</td>
            <td>${arrelem.deviation}</td>
            <td>${arrelem.comment}</td>
        </tr>
        `;
    }
    document.getElementById("tablecont").innerHTML = mysubjestr;


}

function graph_function(data_param) {
    let examsarr = data_param.student_performance_over_time;
    let labels = [];
    let datavals = [];
    for (const arrelem of examsarr) {
        let examsname = arrelem.exam_name;
        let arrlsp = examsname.split("-");
        let mystrin = arrlsp[2].replace(/[^a-z0-9 ]/gi, "");
        let labss = mystrin + arrlsp[1]
        labss = labss.slice(5);
        labels.push(labss)
        datavals.push(arrelem.avg_score)
    }

    let minval = Math.min.apply(null, datavals) ;
    minval = Math.floor(minval / 5) * 5
    minval = minval - 10
    console.log(minval);




    // stat

    let mychart = document.getElementById('datgraph1').getContext('2d');
    let chart = new Chart(mychart, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Marks',
                fill: false,
                lineTension: 0.2,
                backgroundColor: 'rgb(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                data: datavals
            }]
        },

        // Configuration options go here
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Student Performance Over Time'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Year: " + data_param.exam_name.slice(18, 23) 
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        min: minval
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Average Mean'
                    }
                }]
            }
        }
    });
    // end

    // start 
    let mychart2 = document.getElementById('datgraph2').getContext('2d');
    let chart2 = new Chart(mychart2, {
        type: 'bar',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Marks',
                fill: false,
                backgroundColor: [

                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)"

                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)"
                ],
                borderWidth: 1,
                data: datavals
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Student Performance Over Time'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Year: " + data_param.exam_name.slice(18, 23)
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        min: minval
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Average Mean'
                    }
                }]
            }
        }

    });

    // end
}