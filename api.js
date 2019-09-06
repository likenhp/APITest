class APIData{
    constructor(){
        this.data = {};
        this.animal = null;
        this.error = null;

        this.handleAPIData = this.handleAPIData.bind(this);
        this.handleAPIDataSuccess = this.handleAPIDataSuccess.bind(this);
        this.handleAPIDataError = this.handleAPIDataError.bind(this);
        this.displayData = this.displayData.bind(this);
    }

    addEventHandlers(){
        $("#getDataButton").on("click", this.handleAPIData);
    }

    createVisualData(){

    }

    displayData(){
        if($("#listContent").is(":visible") === true){
            $("#listContent").hide();
        }else{
            $("#listContent").show();
        }
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
        if(resp.status === "OK"){
            if(resp.list.length <=0){
                return
            }
            for(let key in resp.list){
                if(!$("#listContent #listAnimal").hasClass(resp.list[key].id)){
                this.animal = $("<div>",{id: "listAnimal","class": resp.list[key].id});
                this.animalId = $("<div>",{"class": "animalId"}).text(resp.list[key].id);
                this.animalCommonName = $("<div>",{"class": "animalName"}).text(resp.list[key].commonName);
                this.imageURL = $("<div>",{"class": "imageURL"}).text(resp.list[key].imageURL);
                this.animal.append(this.animalId, this.animalCommonName, this.imageURL);
                $("#listContent").append(this.animal);
                }
            }
        }
        this.displayData();
    }

    handleAPIDataError(resp){
        alert("Error: " +resp.status);
    }
}