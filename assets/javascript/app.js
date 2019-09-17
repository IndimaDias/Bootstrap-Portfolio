$(document).ready(function(){

    // setTimeout(startSVGAnimation($('svg')),3000);

    var config = {
        apiKey: "AIzaSyBXHhqgb-e5jirVkCNUWT_-KRv9ORAfeNg",
        authDomain: "projectportfolio-716ce.firebaseapp.com",
        databaseURL: "https://projectportfolio-716ce.firebaseio.com",
        projectId: "projectportfolio-716ce",
        storageBucket: "projectportfolio-716ce.appspot.com",
        messagingSenderId: "24314421763",
        appId: "1:24314421763:web:7ea835ad30cdc86c"
      };
      
      firebase.initializeApp(config);
      
      var database = firebase.database();

    $("#divDropdown").hide();
    startAnimation();
    // loadProjects();
    
   
   loadCarousel();
    
   


   
    

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Menu button on click;
    $("#btnMenu").on("click", function(){
        $("#divDropdown").toggle ();
    });

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // Down arrow click

    $("#btnArrow").on("click",function(e) {
        debugger;
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(this).offset().top},500);
    });

    // Download button pressed to download the resume
    $('#btnDownload').click(function(e) {
        
        e.preventDefault();  //stop the browser from following
        window.location.href = 'assets/uploads/ResumeIndima.pdf';
    });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function loadProjects (){
        
        // this function will dynamically build a card for each record in the database 
        // this card includes the image, and the link to the page 
       
        var divRow = $("<div>");

        divRow.addClass("cardRow row");
        divRow.attr("id","divProjects");
        var i = 0;
        database.ref("projects/").on("child_added",function(snapshot){
           
            var data= snapshot.val();
                i += 1;
                
                var cardImage = $("<div>");
                cardImage.addClass("card-image");
        
                var proImage = $("<img>");
                proImage.attr("src",data.imgLink);
                proImage.attr("alt",data.projectName);

                var cardAction = $("<div>");
                cardAction.addClass("card-action center-align");

                var proName = $("<h5>");
                proName.addClass("projectName center-align black-text");
                proName.text(data.projectName);

                var proLink = $("<a>");
                // proLink.addClass("projectLinks center-align black-text");
                proLink.attr("href" ,data.projectLink);
                proLink.append('<i class="material-icons black-text projectLinks">link</i>');

                var proGitLink = $("<a>");
                proGitLink.attr("href" ,data.gitLink);
                proGitLink.append('<img class = "btnIcon" src="./assets/images/GitHub-Mark-32px.png">');

                // proLink.text(data.projectName);

                cardImage.append(proImage);
                cardAction.append(proName,proLink,proGitLink);

                var divCard = $("<div>");
                divCard.addClass("card cardProject");
                divCard.append(cardImage);
                divCard.append(cardAction);

                var divCardCol = $("<div>");
                divCardCol.addClass("col s12 m9 l4 cardx");
                divCardCol.attr("id","id"+i);

               
                divCardCol.append(divCard);

         
                divRow.append(divCardCol);
                

                var divPortfolio = $("#divPortfolio");
                divPortfolio.append(divRow);

            // }
        },function(errorobj){
             // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
        });
    }

    // *****************************
function startAnimation(){
    var elements = $('.txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = $(elements[i]).attr('data-rotate');
      var period = $(elements[i]).attr('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
 
  };

 //*********************************** */ 

 function loadCarousel(){
    var divCarousel = $("<div>");
    
    divCarousel.addClass("carousel");
    divCarousel.attr("id","carousel1");
    divCarousel.data("ride","carousel");

    
    
    var i = 0;
    database.ref("projects/").on("child_added",function(snapshot){
        var data= snapshot.val();
       
        
        var aTag = $("<a>");
        console.log(i);
        if (i == 0){
            aTag.addClass("carousel-item active");
        }
        else{
            aTag.addClass("carousel-item");
        }

        aTag.attr("href","#!");
                
        var imgTag = $("<img>").addClass("d-block w-100");
        imgTag.attr("src",data.imgLink);
        

        aTag.append(imgTag);
      
        divCarousel.append(aTag);


        i += 1;

    },function(errorobj){
             // In case of error this will print the error
        console.log("The read failed: " + errorObject.code);
    });

    var divPortfolio = $("#divPortfolio");
    divPortfolio.append(divCarousel);

    $('#carousel1').carousel();
   
 }
    
});