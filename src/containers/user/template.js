export default function createMarkup(data) {
  return {
    __html: `
        <div style="height: 100%; width: 100%">
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
                    margin-bottom: 10px;
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
                        overflow: hidden !important;
                    }
        
                    #myChart {
                        width: 100% !important;
                        height: 340px !important;
                        overflow: hidden !important;
                    }
        
                    #myChart2 {
                        width: 100% !important;
                        height: 240px !important;
                        overflow: hidden !important;

                    }
                    .@media screen and (min-width: 1700px){
                        #myChart3 {
                            width: 70% !important;
                            height: 100% !important;
                            overflow: hidden !important;
                            margin-top: -5% !important;
                            max-height:400px !important;
                        }
                        #myChart {
                            width: 70% !important;
                            height: 100% !important;
                            overflow: hidden !important;
                            margin-top: -5% !important;
                            max-height:400px !important;

                        }           
                        #myChart2 {
                            width: 70% !important;
                            height: 100% !important;
                            overflow: hidden !important;
                            margin-top: -15% !important;
                            max-height:400px !important;  
                        }
                     
                    }
                }
            </style>
        <div style="display :none" id="templatebody">
            <div class="main_ticket">
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
                                    ${data?.tilesData?.total}
                                </h1>
                            </div>
                            <div class="ticket_heading">
                                <h2 class="ticket_h2" style="font-size: 1.4rem; padding-bottom: 10px">Nouveaux tickets</h2>
                                <p class="ticket_p" style="font-size: 0.8rem">Depuis 1 mois</p>
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
                                    ${data?.tilesData?.completed}
                                </h1>
                            </div>
                            <div class="ticket_heading">
                                <h2 class="ticket_h2" style="font-size: 1.4rem; padding-bottom: 10px">Tickets résolus</h2>
                                <p class="ticket_p" style="font-size: 0.8rem">Depuis 1 mois</p>
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
                                    ${data?.tilesData?.inProgress}
                                </h1>
                            </div>
                            <div class="ticket_heading">
                                <h2 class="ticket_h2" style="font-size: 1.4rem; padding-bottom: 10px">Tickets</h2>
                                <p class="ticket_p" style="font-size: 0.8rem">actuellement en cours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main_demandes_div" style="display:flex;  margin: 20px 0; justify-content: space-between;">
                <div class="demandes_column" style="    padding: 20px 20px 6% 20px; background-color: #F0F2F1; width: 32%;">
                    <h2 class="demandes_title" style="padding-bottom: 7%; font-size: 1.4rem; font-weight: 600; color: #6B6F70; padding-left: 30px; padding-top: 20px;">Top des demandes</h2>
                    <div class="demandes_heading">
                        <h3 class="demandes_h3" style="font-size: 1.2rem; color: #91c7c8; margin-bottom: 5%;">Plus de papier dans <br> L'imprimante</h3>
                        <p style="font-size: 0.9rem; color: #7B7B7B">0 demandes</p>
                        <div>
                        ${data?.categoryTickets
                          ?.map(
                            (val) => `
                            <h3 class="demandes_h3" style="font-size: 1.2rem; font-weight: 500; color: #6E7474;">${val?.categoryName}</h3>
                            <p class="demandes_p" style="font-size: 0.8rem; color: #9C9E9D">${val?.ticketsNumbers} demandes</p>
                              `
                          )
                          .join('')}
                        </div>
                    </div>
                </div>
                <div class="demandes_column2"
                    style="width: 66%; display: flex;flex-direction: column; justify-content: space-between;">
                    <div class="demandes_column2_1"
                        style="display:flex ; justify-content: space-between;align-items: center; background-color: #F0F2F1;">
                        <div class="timent" style=" padding: 00px 0 0px 30px; width: 30%;">
                            <h3 class="timent_title" style="color: #8CC8C9; padding: 10%; ; white-space: nowrap">Top des Bàtiment</h3>
                            ${data?.buildingTickets
                              ?.splice(0, 5)
                              ?.map(
                                (val, index) =>
                                  `
                                    <li class="timent_li" style="list-style: none; white-space: nowrap; color: #9C9E9D;">
                                    <span class="timent_span">
                                    ${index + 1}
                                    </span>
                                    <span class="timent_span2" style="color: #7E807F; font-size: 13px">${val.buildingName}</span>
                                    <span style="font-size: 12px">${val.ticketCount} tickets</span>
                                    </li>
                                `
                              )
                              .join('')}
                        </div>
                        <div class="timent2"
                            style="text-align:center; font-size: 50px; width: 70%;display: flex; align-items: center;">
                              <canvas
                                id="myChart2"
                                style="width:100%;max-width:600px; height: 300px; padding: 30px 0;"
                              ></canvas>
                        </div>
                    </div>
                    <div class="demandes_column2" style="width: 100%;">
                        <div class="demandes_column2_1"
                            style="display:flex ; justify-content: space-between;align-items: center; background-color: #F0F2F1;">
                            <div class="timent" style="padding: 0px 0 0px 30px; width: 30%;">
                                <h3 class="timent_title" style="color: #8CC8C9; padding: 10%; white-space: nowrap">Top des Catégories</h3>
                                ${data?.categoryTickets
                                  ?.map(
                                    (val, index) =>
                                      `
                                        <li class="timent_li" style="list-style: none; white-space: nowrap; color: #9C9E9D;">
                                        <span class="timent_span" style="color: #7E807F; font-size: 13px">${index + 1}</span>
                                        <span class="timent_span2">${val?.categoryName}</span>
                                        <span style="font-size: 12px">${val.ticketsNumbers} tickets</span>
                                        </li>
                                    `
                                  )
                                  .join('')}
                            </div>
                            <div class="timent2"
                                style="text-align:center; font-size: 50px; width: 70%; display: flex; align-items: center;">
                                <canvas id="myChart3"
                                    style="width:100%;max-width:600px; height: 300px;    padding: 30px 0;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="demandes_column2" style="width: 100%;">
                <div class="demandes_column2_1"
                    style="display:flex ; justify-content: space-between;align-items: center; background-color: #F0F2F1;">
                    <div class="timent" style=" padding: 30px; width: 40%;">
                        <h3 class="timent_title" style="color: #8CC8C9;padding-bottom: 10%; white-space: nowrap">Top des Catégories</h3>
                        ${data?.weeklyTickets
                          ?.map(
                            (val, index) =>
                              `
                            <li class="timent_li" style="list-style: none; white-space: nowrap; color: #9C9E9D;">
                            <span class="timent_span" style="color: #7E807F; font-size: 13px">${index + 1}</span>
                            <span class="timent_span2">${val?.weekName}</span>
                            <span style="font-size: 12px">${val.ticketsNumbers} tickets</span>
                            </li>
                            `
                          )
                          .join('')}
                    </div>
                    <div class="timent2"
                        style="text-align:center; font-size: 50px; width: 60%;display: flex; align-items: center;">
                        <canvas id="myChart" style="width:100%; max-width:900px; height: 300px;    padding: 30px 0;"></canvas>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
`,
  };
}
