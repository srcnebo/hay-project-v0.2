$(document).ready(function(){
 /****** Swipper Initiation and Settings*******/
    var swiper = new Swiper('.swiper-container', {
          speed:2000,
          spaceBetween: 70,
          direction:'horizontal',
          effect:'coverflow',
          allowTouchMove:false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type:'progressbar'
          },
        });

/************** Main Input Button Settings***********/  
  
    $("#searchBtn").click(function(){
        var inputValue = $("#searchInput").val();
        var baseUrl = 'https://www.yliopistonapteekki.fi/catalogsearch/result/?q='
        window.open(baseUrl + inputValue)
    });

/************ Configuring the Select options*************/  
  
  var queryUrl = 'https://www.yliopistonapteekki.fi/'
  
  var mainCategory = {
    'terveys-ja-apteekki':['allergia','kipu-ja-flunssa','lapset-aitiys-ja-raskaus','elaimet'],
    'kauneus-ja-ihonhoito':['aurinkotuotteet','hiustenhoito','ihonhoito-kasvot','meikit'],
    'hyvinvointi-ja-ravinto':['laihdutus-ja-painonhallinta','proteiini-ja-muut-lisaravinteet','superfood']
  }

  var secondaryCategory = {
    'allergia':['antihistamiini-ja-kortisoni-suun-kautta','ihottuma-ja-ihon-kutina','nenasumute-allergia','silmatipat-allergia'],
    'kipu-ja-flunssa':['kipu-ja-kuume','kurkkukipu-ja-aanen-kaheys','nenasumute-tukkoisuus','yskanlaake'],
    'lapset-aitiys-ja-raskaus':['imetys-1','raskaus','lapset','vauvanhoito'],
    'elaimet':['elainruoka','haavanhoito','matolaake','silmat-ja-korvat'],
    'aurinkotuotteet':['aurinkovoide-kasvoille','aurinkovoide-lapsille','auringonoton-jalkeen','aurinkovoide-vartalolle'],
    'hiustenhoito':['hiustarvikkeet','shampoo-ja-kuivashampoo','hoitoaine','hiusvarit'],
    'ihonhoito-kasvot':['akne','atooppinen-iho','ihonpuhdistus','kasvojen-puhdistuslaitteet'],
    'meikit':['kasvomeikit','meikkaustarvikkeet','silmameikit','kynnet'],
    'laihdutus-ja-painonhallinta':['laihdutuslaake-ja-muut-valmisteet-laihdutukseen','vahaenerginen-dieetti-vlcd-ateriankorvikkeet','rasvanpolttajat','puhdistus-paasto-ja-detox'],
    'proteiini-ja-muut-lisaravinteet':['proteiini-ja-massanlisays','juomat-ja-jauheet-energiaan','aminohappovalmisteet','tehonlisaajat'],
    'superfood':['marjajauheet-ja-supermarjat','muut-superfood-jauheet-ja-tuotteet','raakakaakao','viherjauheet-ja-tabletit']
  }
  
 /************Getting The main keys as array of the two Catergories Obj***/
  
  var aMainCat = Object.keys(mainCategory)
  var aSecondCat = Object.keys(secondaryCategory)
  
  /**********Manually Set the ID for the Select options and Card Title****/
  
  var aTitleId = ['firstTitle','secondTitle','thirdTitle']
  var aSelectId = ['firstSelect','secondSelect', 'thirdSelect']
  
  /***** Generic Function to help build the values for the Select & Options***/
   
  var buildCard = function(num,arrArg,txtArg){
    $('#' + aTitleId[num]).text(txtArg);
    $('#' + aSelectId[num])
         .append($("<option selected='true' disabled='disabled'>Select</option>"))
    arrArg.forEach(function(value) {   
     $('#' + aSelectId[num])
         .append($("<option></option>")
                    .text(value));
      });
  };
  
/****** Event Handler for first Select *********/  
  
  var buildFollowUpCards1 = function(){
    $('#' + aSelectId[1]).empty();
     var selectedvalue = $('#' + aSelectId[0]).val();
    queryUrl+='/' + selectedvalue
     buildCard(1,mainCategory[selectedvalue],'Pls Choose 2nd Category');
    swiper.slideNext(2000);
   };
  
  /****** Event Handler for second Select *********/  
  
  var buildFollowUpCards2 = function(){
    $('#' + aSelectId[2]).empty();
     var selectedvalue = $('#' + aSelectId[1]).val();
    queryUrl+='/' + selectedvalue
     buildCard(2,secondaryCategory[selectedvalue],'Pls Choose last Category');
    swiper.slideNext(2000);
  };
  
  /****** Event Handler for third Select *********/  
  
  var finalCall = function(){
     var selectedvalue = $('#' + aSelectId[2]).val();
    queryUrl+='/' + selectedvalue
    swiper.slideTo(0,2000)
     window.open(queryUrl + '.html')
    queryUrl='https://www.yliopistonapteekki.fi/'
  }
  
  buildCard(0,aMainCat,'Pls Choose a Category');
  
  /*******Event Handlers for the 3 Select & Options****/
  
   $('#' + aSelectId[0]).change(buildFollowUpCards1)
   $('#' + aSelectId[1]).change(buildFollowUpCards2)
   $('#' + aSelectId[2]).change(finalCall)
  
});