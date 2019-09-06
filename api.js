class APIData{
    constructor(){
        this.data = {};


        this.handleAPIData = this.handleAPIData.bind(this);
        this.handleAPIDataSuccess = this.handleAPIDataSuccess.bind(this);
        this.handleAPIDataError = this.handleAPIDataError.bind(this);
    }

    addEventHandlers(){
        $("#getDataButton").on("click", this.handleAPIData);
    }

    handleAPIData(){
        $.ajax({
            url: "https://animalrestapi.azurewebsites.net/Animal/List",
            method: "get",
            data: {"candidateID": "13b1bdc9-586d-436e-958d-f64827035d8d"},
            dataType: "json",
            success: this.handleAPIDataSuccess,
            error: this.handleAPIDataError
        });
    }

    handleAPIDataSuccess(resp){
        console.log(resp);
        debugger;
        if(resp.status === "OK"){
            for(let key in resp.list){
                console.log(resp.list[key]);
            }
        }
    }

    handleAPIDataError(resp){
        console.log(resp);
    }
}