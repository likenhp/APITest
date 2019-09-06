$(document).ready(intitalize);

var api;

function intitalize(){
    api = new APIData();
    api.addEventHandlers();
    // api.handleAPIData();
    $("#listContent").hide();
    $("#animalContent").hide();
}