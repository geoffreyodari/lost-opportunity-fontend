const uploadButton = document.querySelector("#upload");

const fileInput = document.querySelector('#formFileSm')

const date =  document.querySelector('#date')

const radioButtons = document.querySelectorAll('input[name="dataContentRadio"]');

const uploadSheetData= async (data)=>{
    const response = await fetch(
            path+'/lost_opportunity/all/import_data.php',
        {
            method:"POST",
            body:data,
        }

    )
    return await response.json()
}

const upload = ()=>{
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

    return (uploadSheetData(data));
}


