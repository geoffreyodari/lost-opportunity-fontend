const importForm = ()=>{
   document.querySelector("#output").innerHTML =`<div class="card  bg-vivian-red p-3 mb-3">
                                                    <h4 class="text-center">Import Data</h4>

                                                    <form class="row">
                                                        <div class="row">
                                                        <div class="col-6">
                                                        <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="dataContentRadio" value="Late login" id="radioLateLogin">
                                                        <label class="form-check-label" for="radioLateLogin">
                                                        Late login
                                                        </label>
                                                        </div>
                                                        <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="dataContentRadio" value="Absence" id="radioAbsence">
                                                        <label class="form-check-label" for="radioAbsence">
                                                            Absence
                                                        </label>
                                                        </div>

                                                        <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="dataContentRadio" value="Offphone" id="radioOffphone">
                                                        <label class="form-check-label" for="radioOffphone">
                                                            Offphone
                                                        </label>
                                                        </div>
                                                        <div class="form-check">
                                                        <input class="form-check-input" type="radio" name="dataContentRadio" value="Special Assignment" id="radioSpecialAssignment">
                                                        <label class="form-check-label" for="radioSpecialAssignment">
                                                            Special Assignment
                                                        </label>
                                                        </div>
                                                        <div class="form-check">
                                                        <input class="form-check-input" type="radio"  name="dataContentRadio" value="Training" id="radioTraining">
                                                        <label class="form-check-label" for="radioTraining">
                                                            Training
                                                        </label>
                                                        </div>

                                                        </div>
                                                        <div class="row col-sm-12 col-lg-6">
                                                        <div class="col-lg-6 col-sm-12 mb-3">
                                                            <label for="formFileSm" class="form-label">Date</label>
                                                            <input class="form-control form-control-sm" type="date" placeholder="Default input" aria-label="default input example" id="importDate">
                                                        </div>
                                                        
                                                        <div class="col-lg-6 col-sm-12 mb-3">
                                                            <label for="formFileSm" class="form-label">Import CSV data</label>
                                                            <input class="form-control form-control-sm" id="formFileSm" accept=".csv" type="file">
                                                        </div>
                                                        </div>


                                                        </div>
                                                        <div class="mb-3 text-center">
                                                        <button type="button" class="btn btn-dark" id="import" onclick="importSpreadsheetData()">Import CSV</button>
                                                        </div>  
                                                    </form>

                                                </div>`
}