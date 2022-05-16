

const sendSpreadSheetData= async (data)=>{
    const response = await fetch(
            path+'/lost_opportunity/all/import_data.php',
        {
            method:"POST",
            body:data,
        }

    )
    return await response.json()
}

const importSpreadsheetData = ()=>{
    const uploadButton = document.querySelector("#upload");
    const fileInput = document.querySelector('#formFileSm')
    const date =  document.querySelector('#importDate')
    const radioButtons = document.querySelectorAll('input[name="dataContentRadio"]');

    let selectedOption;
    let data = new FormData();
    for(const radioButton of radioButtons){
        if(radioButton.checked){
                selectedOption=radioButton.value;
                break;
             }
        }
    
    data.append('date',date.value);
    data.append('fileContentType',selectedOption);
    data.append('file',fileInput.files[0]);

    return (sendSpreadSheetData(data));
}


