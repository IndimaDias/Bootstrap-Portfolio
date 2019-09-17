$(document).ready(function(){
debugger;
$("#cardProjects").hide();  
  
      
      var database = firebase.database();

    //   hide data entering form on page load
        

//   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// button submit on admin page 
$("#btnSubmit").on("click",function(event){
    event.preventDefault();

    // read user name and password from the login window
    var userName = $("#userName").val().trim();
    var password = $("#password").val().trim();


    // read child data with the parent "user"
    database.ref("user/").on("child_added",function(snapshot){
       
        var data = snapshot.val();            
        // var keys = Object.keys(data);

    //    console.log(snapshot.val().child(keys));

        var loginName = data.name;
      
        var loginPassword = data.password;


        if ((loginName === userName) && (loginPassword === password)){
            // password and username matches
            console.log("true");
            $("#cardLogin").hide();
            $("#cardProjects").show();

        }
        else
        {
            alert("Invalid username password");
        }
      }, function(errorObject) {
  
        // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
      });

      
  });

//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

$("#btnAddImg").on("click",function(event){
    event.preventDefault();

    var projectName = $("#proTitle").val().trim();
    var imgLink = $("#imgAddress").val().trim();
    var projectLink = $ ("#proLink").val().trim();
    var proGitLink = $("#proGitLink").val().trim();

    database.ref("projects").push({
        projectName : projectName,
        imgLink : imgLink,
        projectLink : projectLink,
        gitLink : proGitLink,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#frmProjects")[0].reset();

})

})