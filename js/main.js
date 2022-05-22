

let myData;
const output = document.querySelector("#output");

const path="http://"+window.location.hostname;

class Card{
    constructor(data){
        this.data = data;
    }

    title(){
        return `<h5 class="text-center">${this.data.title.toUpperCase()}</h5>
                <h6 class="text-center">${this.data.date}</h6>
                `
    }

    duration(){
        
        return Math.round(this.data.payload.time[0].duration/3600)
        
    }

    reasons(){
        
            return  this.data.payload.description.map(description=>`
                                                                    <li class="list-group-item d-flex bg-dark justify-content-between align-items-center p-0 ">
                                                                        ${(description.REASON)?description.REASON:this.data.title}
                                                                        <span class="badge bg-primary rounded-pill">${description.COUNTOF}</span>
                                                                    </li>`).join("")     
    }

    segment(){
        
                return this.data.payload.team.map(description=>`
                                                                <li class="list-group-item d-flex  bg-dark justify-content-between align-items-center p-0">
                                                                    ${description.SEGMENT}
                                                                    <span class="badge bg-danger rounded-pill">${description.COUNTOF}</span>
                                                                </li>
                                                                 `).join("")
                            
                            
        
    }

    agents(){
        return `
        <div class="accordion" id="accordion${this.data.title}">
            <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button text-white bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Agents
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion${this.data.title}">
                <div class="accordion-body bg-dark justify-content-center">
                    <table class=" table-borderless bg-vivian-red  table-sm">
                        <thead class="bg-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Staff Id </th>
                                <th scope="col">Segment</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Team Leader</th>
                                <th scope="col">Family</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.data.payload.agents.map(agent=>`<tr>
                                                                        <td>${agent.fullname}</td>
                                                                        <td>${agent.staffid}</td>
                                                                        <td>${agent.segment}</td>
                                                                        <td>${agent.details}</td>
                                                                        <td>${agent.teamleader}</td>
                                                                        <td>${agent.family}</td>
                                                                    </tr>`).join("")}    
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>`
        
        
        
        
        
       

                
    }

    get item(){
        console.log(this.data.hourlyTarget)
        return (Object.keys(this.data.payload).length === 0)?null:`
        <div class="col-12 mx-auto .bg-transparent rounded-3 shadow">
        <ul class="nav bg-vivian-red justify-content-end">
            <li class="nav-item">
                <a class="nav-link text-dark" href="#" onClick =loadLostOpportunitySummaryPage(myData) >
                    <span class="material-icons">
                    home
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark" href="#accordion${this.data.title}">
                    <span class="material-icons">
                    view_list
                    </span>
                </a>
            </li>
        </ul>
        <div class="p-2">
            <h5 class="text-uppercase">${this.title()}</h5>

           <div class="row">
               <div class="sm-lg-12 col-lg-4 pb-3">
                   <div class="card border-0 bg-vivian-red rounded-top">
                        <h6 class=" card-header text-center">Duration (hours) </h6>
                        <h4 class=" text-center" >${this.duration()}</h4>
                        <small class="text-center fw-lighter">The total lost duration</small>
                   </div>         
               </div>
               <div class="sm-lg-12 col-lg-4 pb-3">
                    <div class="card border-0 bg-vivian-red  rounded-top">
                        <h6 class=" card-header text-center">FTE </h6>
                        <h4 class=" text-center" >${this.duration()/8}</h4>
                        <small class="text-center  fw-lighter">The equivalent number of agents</small>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 pb-3">
                    <div class="card border-0 bg-vivian-red  rounded-top">
                        <h6 class="card-header text-center">${this.data.hourlyTarget.type} </h6>
                        <h4 class=" text-center">${this.duration()*this.data.hourlyTarget.value}</h4> 
                        <small class="text-center  fw-lighter">*Target hourly ${this.data.hourlyTarget.type} ${this.data.hourlyTarget.value}</small>                                  
                    </div>
                </div>
                <div class="col-sm-12 col-lg-16 m-3 pb-2 mx-auto shadow-sm rounded">
                    <canvas   id="${this.data.title}"  height="200" ></canvas> 
                </div> 
                
           </div>
           <div class="row">
               <div class="col-sm-12 col-lg-6">
                   <h6 class="fw-bold">Reasons</h6>
                   <ul class="list-group list-group-flush">
                        ${this.reasons()}
                    </ul>
               </div>

               <div class="col-sm-12 col-lg-6">
                    <h6 class="fw-bold">Segments</h6>
                    
                    <ul class="list-group list-group-flush">
                        ${this.segment()}
                    </ul>
                </div>

           </div>

        </div>
        <div class="row pt-3">
            ${this.agents()}
        </div>

           
       </div>
            `
    }

}

const activityHourlyChart = ( data )=>{
            
    new Chart(document.getElementById(data.title).getContext('2d'), {
               type: 'bar',
               data: {
                   labels: data.payload.hourly.map(label=>label[0].time.slice(0,5)),
                   datasets: [{
                       label: '# of Agents '+ data.title,
                       data: data.payload.hourly.map(label=>label[0].agents),
                       backgroundColor: [
                           'rgb('+Math.floor(Math.random() * 256)+', '+Math.floor(Math.random() * 256)+', '+Math.floor(Math.random() * 256)+')'
                       ],
                       borderWidth: 1
                   }]
               },
               options: {
                scales: {
                    x: {
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      grid: {
                        display: false
                      }
                    }
                  }
               }
           });            


}

const  stackedHourlyChart = ( data )=>{
    const labels = data[0].payload.hourly.map(time=>time[0].time.slice(0,5))
    class DataSet{
        constructor(stats){
            this.stats = stats;
            this.label = stats.title
            this.data  = stats.payload.hourly.map(output=>output[0].agents)
            this.backgroundColor = [
                'rgba('+Math.floor(Math.random() * 256)+', '+Math.floor(100)+', '+Math.floor(Math.random() * 256)+', 0.5)'
            ]
        }
        
        
    }



    new Chart(document.getElementById("all").getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data.map(result=> new DataSet(result))
        },
        options: {
            plugins: {
              title: {
                display: true,
                text: 'Summary'
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                    display: false
                  }
              },
              y: {
                stacked: true,
                grid: {
                    display: false
                  }

              }
            }
          }
    });


}

const lostOpportunityPie = ( data ) =>{
    new Chart(document.getElementById("all").getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data.map(result=> new DataSet(result))
        }
    })
}

const  displayActivityData = async ( index ) =>{
    let i = parseInt(index)
        output.innerHTML = new Card(myData[parseInt(index)]).item
        await activityHourlyChart(myData[index])
}

const fetchData = async (fromDate=new Date().toISOString().slice(0, 10),selectedChannel="Inbound")=>{
    let response = await fetch(`${path}/lost_opportunity/all/lost_opportunity.php?date=${fromDate}&channel=${selectedChannel}`)
    let data = await response.json()
    myData = await data
    loadLostOpportunitySummaryPage(await myData)
                   
                            
}

const  lostOpportunitySummaryTable = ( data ) =>{
        let tableContent="";
        data.map((stat,index)=>{
        let duration  = stat.payload.time[0].duration;
        if(duration>0){
        tableContent +=`<tr>
                             <td>
                                <a class="btn btn-sm p-0  fw-bold" href="#" onClick = displayActivityData(${index})>
                                     ${stat.title.toUpperCase()}
                                </a>
                            </td>
                            <td class="text-center">
                                ${Math.round(duration /3600)}
                            </td>
                            <td class="text-center">
                                ${Math.round(duration/3600)/8}
                            </td>
                            <td class="text-center">
                                ${Math.round(duration /3600)*stat.hourlyTarget.value}
                            </td>
                        </tr>`
                            }
            }
        )
  return tableContent;

}

const lostOpportunitySummaryCards = ( allData ) =>{
    let hours =  allData.map(data=>(data.payload.time[0].duration!=null)?data.payload.time[0].duration:0)
                        .reduce((result,item)=>result+parseInt(item),0)/3600
    
    return `
                    <div class="row bg-trans m-1 p-1">
                        <div class="col-sm-12 col-lg-4 pb-3">
                                <div class="card border-0 bg-vivian-red rounded-top"">
                                    <h6 class="card-header text-center ">Duration (hours) </h6>
                                    <h4 class=" text-center" >${Math.round(hours)}</h4>
                                    <small class="text-center  fw-lighter">The total lost duration</small>
                                </div>         
                            </div>
                            <div class="col-sm-12 col-lg-4 pb-3">
                                <div class="card border-0 bg-vivian-red rounded-top">
                                    <h6 class="card-header text-center">FTE </h6>
                                    <h4 class=" text-center" >${Math.round(hours)/8}</h4>
                                    <small class="text-center  fw-lighter">The equivalent number of agents</small>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-4 pb-3">
                                <div class="card border-0 bg-vivian-red rounded-top">
                                    <h6 class="card-header text-center ">${allData[0].hourlyTarget.type} </h6>
                                    <h4 class="text-center">${Math.round(hours)*allData[0].hourlyTarget.value}</h4> 
                                    <small class="text-center  fw-lighter">*Target hourly ${allData[0].hourlyTarget.type} ${allData[0].hourlyTarget.value} </small>                                  
                                </div>
                            </div>
                    
                        <div class="col-sm-12 col-lg-5 mt-3">
                            <table class="table table-responsive table-sm ">
                            <thead class="thead-dark">
                                <tr class="bg-dark">
                                    <th  scope="col">Activity</th>
                                    <th class="text-center " scope="col">Duration (Hours)</th>
                                    <th class="text-center" scope="col">FTE</th>
                                    <th class="text-center" scope="col">Contacts</th>
                                </tr>
                                </thead>
                                <tbody  id="container">
                                </tbody>
                            </table>
                        </div>
                        <div class="col-sm-12 col-lg-7 mt-3">
                            <canvas id="all">
                            </canvas>                
                            
                        </div>
                        
                    </div>`

}

const  lostOpportunityStackedHourlyChart = ( data )=>{
    const labels = data[0].payload.hourly.map(time=>time[0].time.slice(0,5))
    class DataSet{
        constructor(stats){
            this.stats = stats;
            this.label = stats.title
            this.data  = stats.payload.hourly.map(output=>output[0].agents)
            this.backgroundColor = [
                'rgba('+Math.floor(Math.random() * 256)+', '+Math.floor(Math.random() * 256)+', '+Math.floor(Math.random() * 256)+', 0.5)'
            ]
        }
        
        
    }



    new Chart(document.getElementById("all").getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data.map(result=> new DataSet(result))
        },
        options: {
            plugins: {
              title: {
                display: true,
                text: 'Summary'
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
                grid: {
                    display: false
                  }
              },
              y: {
                stacked: true,
                grid: {
                    display: false
                  }

              }
            }
          }
    });


}
const lostOpportunitySummarySegmentCharts = (data)=>{
    let summaryPie = document.createElement("div")
    summaryPie.setAttribute('class','row')
    let title = document.createElement("h5")
    title.setAttribute('class','text-center')
    title.textContent=("Summary Per segment")
    summaryPie.append(title)
    const renderSegmentSummaryChart =(ctx,item)=>{
        
        
        if(item.payload.description.length!=0){
          let myLabel = item.payload.team.map(data=>data.SEGMENT)
          let myData = item.payload.team.map(data=>data.COUNTOF)
          let myColors= item.payload.team.map(()=>'rgba('+Math.floor(Math.random() * 256)+', '+Math.floor(3)+', '+Math.floor(Math.random() * 256)+', 1)')
            
          new Chart(ctx.getContext('2d'), {
              type: 'pie',
              data: {
                  labels: myLabel,
                  datasets: [{
                      label:item.title,
                      data: myData,
                      backgroundColor: myColors,
                      borderColor: myColors,
                      borderWidth: 1
                  }]
              },options: {
                plugins: {
                    title: {
                        display: true,
                        text: item.title.toUpperCase()
                    }
                }
            }
              
          });
        }
              
  
  
      
                      
    }
    data.forEach(item=>{
        
        let element = document.createElement("canvas");
        element.setAttribute('id',item.title)
        let card = document.createElement("div")
        card.setAttribute('class','col-lg-4 col-md-6 col-sm-12 p-3 bg-vivian-red')
        if(item.payload.time[0].duration!=null&&item.payload.time[0].duration!=0){
            console.log(item.payload)
            summaryPie.append(card) 
        }
        card.append(element)
        renderSegmentSummaryChart(element,item)  
       
    })

    return summaryPie
}

const loadLostOpportunitySummaryPage = ( data )=>{
    output.innerHTML = (lostOpportunitySummaryCards(data));
    container.innerHTML  =  lostOpportunitySummaryTable( data );
    lostOpportunityStackedHourlyChart( data )
    output.append(lostOpportunitySummarySegmentCharts(data))

                            }

document.querySelector("#search").addEventListener('click',()=>{
                                                                let fromInput = document.querySelector("#fromdate").value
                                                                let channelInput = document.querySelector("#channel").value
                                                                fetchData(fromDate=fromInput,selectedChannel=channelInput)
                                                            }
)

document.querySelector("#importPage").addEventListener('click',(e)=>{
    e.preventDefault()
    importForm()
})

document.querySelector("#homePage").addEventListener('click',(e)=>{
    e.preventDefault()
    fetchData()
})

fetchData()