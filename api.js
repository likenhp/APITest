class APIData{
    constructor(){
        this.data = {};
        this.animal = null;
        this.error = null;
        this.number = null;

        //this.value = this.value.bind(this);
        this.findAnimal = this.findAnimal.bind(this);
        this.handleAPIData = this.handleAPIData.bind(this);
        this.handleAPIDataSuccess = this.handleAPIDataSuccess.bind(this);
        this.handleAnimalSearch = this.handleAnimalSearch.bind(this);
        this.handleAnimalSearchSuccess = this.handleAnimalSearchSuccess.bind(this);
        this.handleAPIError = this.handleAPIError.bind(this);
        this.displayData = this.displayData.bind(this);
    }

    addEventHandlers(){
        $("#getDataButton").on("click", this.handleAPIData);
        $("#findAnimalButton").on("click", this.findAnimal);
    }

    findAnimal() {
        $("#animalContent").empty();
        this.value = $("#findAnimal").val();
        this.mustBeNumber = /^[0-9]+$/;
        this.regex = new RegExp(this.mustBeNumber);
        if( this.regex.test(Number(this.value)) && Number(this.value)>0){
            this.handleAnimalSearch((Number(this.value)));
        }else{
            alert("Must use a valid number for id search. Number must be greater than 0 with no decimals or special characters");
        }
        
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
            error: this.handleAPIError
        });
    }

    handleAPIDataSuccess(resp){
        if(resp.status === "OK"){
            if(resp.list.length <= 0){
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

    handleAnimalSearch(id){
        $.ajax({
            url: `https://animalrestapi.azurewebsites.net/Animal/Id/${id}`,
            method: "get",
            data: {"candidateID": "13b1bdc9-586d-436e-958d-f64827035d8d"},
            dataType: "json",
            success: this.handleAnimalSearchSuccess,
            error: this.handleAPIError
        });
    }

    handleAnimalSearchSuccess(resp){
        if(resp.status === "OK"){
            this.animal = $("<div>",{id: "listAnimal","class": resp.animal.id});
            this.animalId = $("<div>",{"class": "animalId"}).text(resp.animal.id);
            this.animalCommonName = $("<div>",{"class": "animalName"}).text(resp.animal.commonName);
            this.imageURL = $("<div>",{"class": "imageURL"}).text(resp.animal.imageURL);
            this.scienceName = $("<div>",{"class": "scienceName"}).text(resp.animal.scientificName);
            this.family = $("<div>",{"class": "scienceName"}).text(resp.animal.family)
            this.animal.append(this.animalId, this.animalCommonName, this.scienceName, this.family, this.imageURL);
            $("#animalContent").append(this.animal);

            if($("#animalContent").is(":visible") !== true){
                $("#animalContent").show();
            }
        }else{
            $("#animalContent").text(resp.status);
            $("#animalContent").show();
        }
    }

    handleAPIError(resp){
        alert("Error: " +resp.status);
    }
}