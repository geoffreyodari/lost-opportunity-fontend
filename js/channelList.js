const channelList = document.querySelector("#channel");


const loadChannels = async ()=>{
    let response = await fetch("http://localhost/lost_opportunity/all/channel_list.php");
    let data = await response.json()
    channelList.innerHTML=await data.map(item=>`<option value="${item.channel}">${item.channel}</option>`).join("");
}

loadChannels()