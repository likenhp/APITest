class APIData{
    constructor(){
        this.data = {};
        this.animal = null;
        this.error = null;
        this.number = null;

        //this.value = this.value.bind(this);

        this.handleAPIData = this.handleAPIData.bind(this);
        this.handleAPIDataSuccess = this.handleAPIDataSuccess.bind(this);
        this.handleAnimalSearch = this.handleAnimalSearch.bind(this);
        this.handleAnimalSearchSuccess = this.handleAnimalSearchSuccess.bind(this);
        this.handlecreateAnimal = this.handlecreateAnimal.bind(this);
        this.handlecreateAnimalSuccess = this.handlecreateAnimalSuccess.bind(this);
        this.handleAnimalDelete = this.handleAnimalDelete.bind(this);
        this.handleAnimalDeleteSuccess = this.handleAnimalDeleteSuccess.bind(this);
        this.handleAPIError = this.handleAPIError.bind(this);
        this.displayData = this.displayData.bind(this);
    }

    addEventHandlers(){
        $("#getDataButton").on("click", this.handleAPIData);
        $("#findAnimalButton").on("click", this.findAnimal);
        $("#createButton").on("click", this.createAnimal);
        $("#deleteButton").on("click", this.deleteAnimal);
    }

    findAnimal = () => {
        $("#animalContent").empty();
        this.value = $("#findAnimal").val().trim();
        /* Test to ensure no field is empty */
        if(this.value === ""){
            alert("Must fill out field");
            return;
        }
        /* Test to ensure the id is a number */
        this.mustBeNumber = /^[0-9]+$/;
        this.regex = new RegExp(this.mustBeNumber);
        if( this.regex.test(Number(this.value)) && Number(this.value)>0){
            this.handleAnimalSearch((Number(this.value)));
        }else{
            alert("Must use a valid number for id search. Number must be greater than 0 with no decimals or special characters");
        }
        
    }

    createAnimal = () => {
        $("#createContent").empty();
        this.commonName = $("#commonName").val();
        this.scientificName = $("#scientificName").val();
        this.family = $("#family").val();
        this.imageURL = $("#imageURL").val();
        /* Test to ensure no field is empty */
        if(this.commonName === "" || this.scientificName === "" || this.family === "" || this.imageURL === ""){
            alert("Must fill out all fields");
            return;
        }
        /* Checking to see if the values are strings and not numbers*/
        this.mustBeNumber = /^[0-9]+$/;
        this.regex = new RegExp(this.mustBeNumber);
        if(typeof this.commonName !== "string" || this.regex.test(this.commonName)){
            alert("Common Name not valid");
            return;
        }
        if(typeof this.scientificName !== "string" || this.regex.test(this.scientificName)){
            alert("Scientific Name not valid");
            return;
        }
        if(typeof this.family !== "string" || this.regex.test(this.family)){
            alert("Family Name not valid");
            return;
        }
        /* Test to see if the link is a valid URL */
        this.http = /^https?:\/\//;
        this.regexHttp = new RegExp(this.http);
        if(!this.regexHttp.test(this.imageURL)){
            alert("imageURL not valid, must contain https:// or http://");
            return;
        }
        this.handlecreateAnimal(this.commonName, this.scientificName, this.family, this.imageURL);
    }

    deleteAnimal = () =>{
        this.animalId = $("#deleteData").val();

        if(this.animalId === ""){
            alert("Must fill out field");
            return;
        }
        /* Test to ensure the id is a number */
        this.mustBeNumber = /^[0-9]+$/;
        this.regex = new RegExp(this.mustBeNumber);
        if( this.regex.test(Number(this.animalId)) && Number(this.animalId)>0){
            this.handleAnimalDelete((Number(this.animalId)));
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
                /* Test to see if animal is already in list, will not run if animal already exists (no duplicates) */
                if(!$("#listContent #listAnimal").hasClass(resp.list[key].id)){
                this.animal = $("<div>",{id: "listAnimal","class": resp.list[key].id});
                this.animalId = $("<div>",{"class": "animalId"}).text(resp.list[key].id);
                this.animalCommonName = $("<div>",{"class": "animalName"}).text(resp.list[key].commonName);
                this.imageURL = $("<a>",{"href": `${imageURL}`}).attr('target','_blank').text(resp.list[key].imageURL);
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
            this.imageURL = $("<a>",{"href": `${imageURL}`}).attr('target','_blank').text(resp.animal.imageURL);
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

    handlecreateAnimal(commonName, scientificName, family, imagerURL){
        $.ajax({
            url: "https://animalrestapi.azurewebsites.net/Animal/Create",
            method: "post",
            data: {
                "candidateID": "13b1bdc9-586d-436e-958d-f64827035d8d",
                "commonName": commonName,
                "scientificName": scientificName,
                "family": family,
                "imageURL": imagerURL
            },
            dataType: "json",
            success: this.handlecreateAnimalSuccess,
            error: this.handleAPIError
        });
    }

    handlecreateAnimalSuccess(resp){
        console.log(resp);
    }

    handleAnimalDelete(id){
        $.ajax({
            url: "https://animalrestapi.azurewebsites.net/Animal/Delete",
            method: "post",
            data: {
                "candidateID": "13b1bdc9-586d-436e-958d-f64827035d8d",
                "id": id
            },
            dataType: "json",
            success: this.handleAnimalDeleteSuccess,
            error: this.handleAPIError
        });
    }

    handleAnimalDeleteSuccess(resp){
        console.log(resp);
    }

    handleAPIError(resp){
        alert("Error: " +resp.status);
    }
}