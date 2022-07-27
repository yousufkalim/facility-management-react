export default function createMarkup() {
  return {
    __html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
            <title>Document</title>
            <style>
                body {
                    padding: 0;
                    margin: 0;
                    font-family: sans-serif;
                    box-sizing: border-box;
                }
        
                * {
                    padding: 0;
                    margin: 0;
                    font-family: sans-serif;
                    box-sizing: border-box;
                }
        
                h1,
                h2,
                h3,
                p {
                    padding: 0;
                    margin: 0;
                }
        
                .demandes_heading {
                    margin-bottom: 30px;
                    padding-left: 30px;
        
                }
        
                .demandes_p {
                    color: gray;
                    padding: 5px 0;
                }
        
                .demandes_h3 {
                    font-size: 1.2rem;
                }
        
                .timent_span {
                    width: 25px;
                    padding: 4px;
                    background-color: #ABCAF8;
                    color: #fff;
                    border-radius: 50%;
                    display: inline-block;
                    text-align: center;
                }
        
                .timent_span2 {
                    font-weight: bold;
                }
        
                .timent_li {
                    margin-bottom: 20px;
                    padding-left: 10%;
                }
        
                .chart_p {
                    font-size: 16px;
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    padding-left: 3%;
                }
        
                .ticket_num {
                    border-radius: 10px;
                }
        
                .ticket_column {
                    box-shadow: 5px 5px 21px -9px rgb(0 0 0 / 50%);
                }
        
                .demandes_column {
                    box-shadow: 5px 5px 21px -9px rgb(0 0 0 / 50%);
                }
        
                .demandes_column2_1 {
                    box-shadow: 5px 5px 21px -9px rgb(0 0 0 / 50%);
                }
        
                @media screen and (max-width: 880px) {
                    .ticket_column_div {
                        flex-direction: column !important;
                        width: 100% !important;
                        margin: auto !important;
                    }
        
                    .ticket_column {
                        width: 100% !important;
                        margin: 10px 0 !important;
                        justify-content: initial !important;
                    }
        
                    .ticket_num {
                        font-size: 8vw !important;
                        width: 20vw !important;
                    }
        
                    .main_demandes_div {
                        flex-direction: column;
                        width: 100% !important;
                        margin: 2% auto !important;
                    }
        
                    .demandes_column {
                        width: 100% !important;
                    }
        
                    .demandes_column2 {
                        width: 100% !important;
                        margin: 2% auto !important;
        
                    }
        
                    .timent {
                        width: 100% !important;
        
                    }
        
                    .timent2 {
                        width: 100% !important;
                    }
        
                    .demandes_column2_1 {
                        flex-direction: column;
        
                        padding: 20px 0;
        
                    }
        
                    #myChart3 {
                        width: 100% !important;
                        height: 240px !important;
                        overflow: hidden;
                    }
        
                    #myChart {
                        width: 100% !important;
                        height: 340px !important;
                        overflow: hidden;
                    }
        
                    #myChart2 {
                        width: 100% !important;
                        height: 240px !important;
                        overflow: hidden;
                    }
        
                    .ticket_h2 {
                        font-size: 7vw !important;
                    }
        
                    .ticket_p {
                        font-size: 4vw !important;
                    }
        
                    .ticket_heading {
                        margin-left: 5%;
                    }
        
                    .demandes_title {
                        font-size: 1.5rem !important;
                    }
        
                    .demandes_h3 {
                        font-size: 1rem;
                    }
        
                    .chart_p {
                        padding-left: 0;
                    }
        
        
                }
        
                @media screen and (min-width: 881px) and (max-width: 1280px) {
                    .ticket_column {
                        width: 32% !important;
                    }
        
                    .ticket_num {
                        font-size: 5vw !important;
                        width: 10vw !important;
                    }
        
                    .demandes_title {
                        font-size: 1.2rem !important;
                    }
        
                    .demandes_p {
                        font-size: 0.8rem !important;
        
                    }
        
                    .demandes_h3 {
                        font-size: 0.8rem;
                    }
        
                    .ticket_h2 {
                        font-size: 1rem !important;
                    }
        
                    .ticket_p {
                        font-size: 0.8rem !important;
                        padding-top: 5px;
                    }
        
                    .demandes_column {
                        width: 32% !important;
                    }
        
                    .timent {
                        padding: 10px 0 10px 13px !important;
                        width: 30% !important;
                    }
        
                    .timent_li {
                        font-size: 14px !important;
                        padding-left: 10%;
                    }
        
                    .timent_span2 {
                        font-size: 12px;
                    }
        
                    #myChart3 {
                        width: 100% !important;
                        height: 240px !important;
                        overflow: hidden;
                    }
        
                    #myChart {
                        width: 100% !important;
                        height: 340px !important;
                        overflow: hidden;
                    }
        
                    #myChart2 {
                        width: 100% !important;
                        height: 240px !important;
                        overflow: hidden;
                    }
        
                }
            </style>
        </head>
        
        <body >
        <div style="display :none" id="templatebody">
            <div class="main_ticket"    >
                <div class="center_ticket">
                    <!-- ticket_column_div  -->
                    <div class="ticket_column_div" style="display:flex; justify-content: space-between;">
                        <!-- card 1  -->
                        <div class="ticket_column" style="
                      display: flex;
                      width: 32%;
                      align-items: center;
                      background-color: #ecf7f6;
                      justify-content: space-evenly;
                      color: #91c7c8;
                      padding: 20px;
                    ">
                            <div class="ticket_count">
                                <h1 class="ticket_num"
                                    style="font-size: 3.5rem; background-color: #fff; padding: 20px; width: 100px;text-align: center;">
                                    81
                                </h1>
                            </div>
                            <div class="ticket_heading">
                                <h2 class="ticket_h2" style="font-size: 2rem">Nouveaux tickets</h2>
                                <p class="ticket_p" style="font-size: 1.5rem">Depuis 1 mois</p>
                            </div>
                        </div>
        
                        <!-- card 1  -->
                        <!-- card 2  -->
                        <div class="ticket_column" style="
                      display: flex;
                      width: 32%;
                      align-items: center;
                      background-color: #F3F3F3;
                      justify-content: space-evenly;
                      color: #7C7C7C;
                      padding: 20px;
                    ">
                            <div class="ticket_count">
                                <h1 class="ticket_num"
                                    style="font-size: 3rem; background-color: #fff; padding: 20px; width: 100px;text-align: center;">
                                    6
                                </h1>
                            </div>
                            <div class="ticket_heading">
                                <h2 class="ticket_h2" style="font-size: 2rem">Tickets résolus</h2>
                                <p class="ticket_p" style="font-size: 1.5rem">Depuis 1 mois</p>
                            </div>
                        </div>
        
                        <!-- card 2  -->
                        <!-- card 3  -->
                        <div class="ticket_column" style="
                      display: flex;
                      width: 32%;
                      align-items: center;
                      background-color: #F9ECF5;
                      justify-content: space-evenly;
                      color: #AB3B82;
                      padding: 20px;
                    ">
                            <div class="ticket_count">
                                <h1 class="ticket_num"
                                    style="font-size: 3.5rem; background-color: #fff; padding: 20px; width: 100px;text-align: center;">
                                    57
                                </h1>
                            </div>
                            <div class="ticket_heading">
                                <h2 class="ticket_h2" style="font-size: 2rem">Tickets</h2>
                                <p class="ticket_p" style="font-size: 1.5rem">actuellement en cours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- card 3  -->
            <!-- ticket_column_div  -->
        
            <!-- main_demandes_div  -->
            <div class="main_demandes_div" style="display:flex;  margin: 20px 0; justify-content: space-between;">
                <div class="demandes_column" style="    padding: 20px 20px 6% 20px; background-color: #F0F2F1; width: 32%;">
                    <h2 class="demandes_title" style="padding-bottom: 7%; font-size: 2rem;  padding-left: 30px; padding-top: 20px;
                    ">Top des demandes</h2>
                    <div class="demandes_heading">
                        <h3 class="demandes_h3" style="color: #91c7c8;">Plus de papier dans <br> L'imprimante</h3>
                        <p class="demandes_p">22 demandes</p>
                    </div>
                    <div class="demandes_heading">
                        <h3 class="demandes_h3">Besoin de ménage</h3>
                        <p class="demandes_p">13 demandes</p>
                    </div>
                    <div class="demandes_heading">
                        <h3 class="demandes_h3">Manque de connectique</h3>
                        <p class="demandes_p">7 demandes</p>
                    </div>
                    <div class="demandes_heading">
                        <h3 class="demandes_h3">Lumiére en panne</h3>
                        <p class="demandes_p">3 demandes</p>
                    </div>
                    <div class="demandes_heading">
                        <h3 class="demandes_h3">Plus de gobelet</h3>
                        <p class="demandes_p">1 demandes</p>
                    </div>
                </div>
                <!-- demandes_column2  -->
                <div class="demandes_column2"
                    style="width: 66%; display: flex;flex-direction: column; justify-content: space-between;">
                    <div class="demandes_column2_1"
                        style="display:flex ; justify-content: space-between;align-items: center; background-color: #F0F2F1;">
                        <div class="timent" style=" padding: 00px 0 0px 30px; width: 30%;">
                            <h3 class="timent_title" style="color: #8CC8C9;padding-bottom: 10%;">Top des Bàtiment</h3>
                            <li class="timent_li" style="list-style: none;">
                                <span class="timent_span">1</span>
                                <span class="timent_span2">Bàtiment A</span>
                                6 tickets
                            </li>
                            <li class="timent_li" style="list-style: none;">
                                <span class="timent_span">2</span>
                                <span class="timent_span2">Bàtiment B</span>
                                4 tickets
                            </li>
                            <li class="timent_li" style="list-style: none;">
                                <span class="timent_span">3</span>
                                <span class="timent_span2">Bàtiment C</span>
                                4 tickets
                            </li>
                        </div>
                        <div class="timent2"
                            style="text-align:center; font-size: 50px; width: 70%;display: flex; align-items: center;">
                            
                            
                              <canvas
                                id="myChart2"
                                style="width:100%;max-width:600px; height: 300px;    padding: 30px 0;"
                              ></canvas>
                            
                        </div>
                    </div>
                    <!-- <div class="demandes_column2_1">3</div> -->
                    <!-- demandes_column2  -->
                    <div class="demandes_column2" style="width: 100%;">
                        <div class="demandes_column2_1"
                            style="display:flex ; justify-content: space-between;align-items: center; background-color: #F0F2F1;">
                            <div class="timent" style="    padding: 0px 0 0px 30px; width: 30%;">
                                <h3 class="timent_title" style="color: #8CC8C9;padding-bottom: 10%;">Top des Catégories</h3>
                                <li class="timent_li" style="list-style: none;">
                                    <span class="timent_span">1</span>
                                    <span class="timent_span2">Ménage</span>
                                    58 tickets
                                </li>
                                <li class="timent_li" style="list-style: none;">
                                    <span class="timent_span">2</span>
                                    <span class="timent_span2">Électricité</span>
                                    25 tickets
                                </li>
                                <li class="timent_li" style="list-style: none;">
                                    <span class="timent_span">3</span>
                                    <span class="timent_span2">IT</span>
                                    13 tickets
                                </li>
                                <li class="timent_li" style="list-style: none;">
                                    <span class="timent_span">4</span>
                                    <span class="timent_span2">Climatisation</span>
                                    11 tickets
                                </li>
                                <li class="timent_li" style="list-style: none;">
                                    <span class="timent_span">5</span>
                                    <span class="timent_span2">Autre</span>
                                    11 tickets
                                </li>
                            </div>
                            <div class="timent2"
                                style="text-align:center; font-size: 50px; width: 70%; display: flex; align-items: center;">
                                
                                <canvas id="myChart3"
                                    style="width:100%;max-width:600px; height: 300px;    padding: 30px 0;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- main_demandes_div  -->
        
            </div>
            <div class="demandes_column2" style="width: 100%;">
                <div class="demandes_column2_1"
                    style="display:flex ; justify-content: space-between;align-items: center; background-color: #F0F2F1;">
                    <div class="timent" style=" padding: 30px; width: 40%;">
                        <h3 class="timent_title" style="color: #8CC8C9;padding-bottom: 10%;">Top des Catégories</h3>
                        <li class="timent_li" style="list-style: none;">
                            <span class="timent_span">1</span>
                            <span class="timent_span2">Semaine 2</span>
                            14 tickets
                        </li>
                        <li class="timent_li" style="list-style: none;">
                            <span class="timent_span">2</span>
                            <span class="timent_span2">Semaine 3</span>
                            8 tickets
                        </li>
                        <li class="timent_li" style="list-style: none;">
                            <span class="timent_span">3</span>
                            <span class="timent_span2">Semaine 4</span>
                            8 tickets
                        </li>
                        <li class="timent_li" style="list-style: none;">
                            <span class="timent_span">4</span>
                            <span class="timent_span2">Semaine 1</span>
                            4 tickets
                        </li>
                        <li class="timent_li" style="list-style: none;">
                            <span class="timent_span">5</span>
                            <span class="timent_span2">Cette semaine</span>
                            2 tickets
                        </li>
                    </div>
                    <div class="timent2"
                        style="text-align:center; font-size: 50px; width: 60%;display: flex; align-items: center;">
                        
                        <canvas id="myChart" style="width:100%; max-width:900px; height: 300px;    padding: 30px 0;"></canvas>
                    </div>
                </div>
            </div>
            </div>
        
            <!-- javaScript  -->
          
            <script>
                var xValues = ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4", "Cette semaine"];
                var yValues = [5, 12, 8, 8, 3];
                var barColors = ["#8EC8C9", "#8EC8C9", "#8EC8C9", "#8EC8C9", "#8EC8C9"];
        
                new Chart("myChart", {
                    type: "bar",
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                        }]
                    },
                    options: {
                        legend: { display: false },
        
                        scales: {
                            yAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0, // minimum value
                                    max: 20, // maximum value
                                    stepSize: 10
                                }
                            }]
                        }
                    }
                });
            </script>
            
            <script>
                var xValues = ["Bàtiment A", "Bàtiment B", "Bàtiment C"];
                var yValues = [6, 3, 3, 8, 3];
                var barColors = ["#8EC8C9", "#8EC8C9", "#8EC8C9"];
        
                new Chart("myChart2", {
                    type: "bar",
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                        }]
                    },
                    options: {
                        legend: { display: false },
        
                        scales: {
                            yAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0, // minimum value
                                    max: 7.5, // maximum value
                                    stepSize: 2.5
                                }
                            }]
                        }
                    }
                });
            </script>
            <script>
                var xValues = ["Ménage", "Électricité", "IT", "Climatisation", "Autre"];
                var yValues = [52, 10, 10, 10, 5];
                var barColors = ["#8EC8C9", "#8EC8C9", "#8EC8C9", "#8EC8C9", "#8EC8C9"];
        
                new Chart("myChart3", {
                    type: "bar",
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                        }]
                    },
                    options: {
                        legend: { display: false },
        
                        scales: {
                            yAxes: [{
                                display: true,
                                stacked: true,
                                ticks: {
                                    min: 0, // minimum value
                                    max: 75, // maximum value
                                    stepSize: 25
                                }
                            }]
                        }
                    }
                });
            </script>
            </div>
        
        </body>
        
        </html>`
  };
}
