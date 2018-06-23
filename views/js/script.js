var countProdVendidos =0;
var countDesistenciaVendas=0;
var countVendasCanceladas=0;


function produtosVendidos () {

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2", // "light2", "dark1", "dark2"
    animationEnabled: true, // change to true
    title:{
      text: "Produtos vendidos"
    },
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "column",
      dataPoints: [
        { label: "AR CONDICIONADO",  y: 110  },
        { label: "CELULAR", y: 215  },
        { label: "TELEVISÃO", y: 25  },
        { label: "COMPUTADOR",  y: 30  },
        { label: "GELADEIRA",  y: 28  }
      ]
    }
    ]
  });
  chart.render();
  if(countProdVendidos ==0){$("#chartContainer").slideDown();
    countProdVendidos = 1;
    countDesistenciaVendas = 0;
    countVendasCanceladas = 0;
  }
  else{
    $("#chartContainer").slideUp();
    countProdVendidos = 0;
  }
}
function vendasCanceladas() {

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2", // "light2", "dark1", "dark2"
    animationEnabled: true, // change to true
    title:{
      text: "Vendas canceladas"
    },
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "column",
      dataPoints: [
            { label: "Março",  y: 30  },
            { label: "Abril",  y: 7  },
            { label: "Maio", y: 11  },
            { label: "Junho", y: 29  },
            { label: "Julho",  y: 28  }

              ]
    }]
  });
  chart.render();
  if(countVendasCanceladas ==0){$("#chartContainer").slideDown();
    countVendasCanceladas = 1;
    countDesistenciaVendas = 0;
    countProdVendidos = 0;
  }
  else{
    $("#chartContainer").slideUp();
    countVendasCanceladas = 0;

  }
}
function desistenciaVendas () {
  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2", // "light2", "dark1", "dark2"
    animationEnabled: true, // change to true
    title:{
      text: "Desistência de vendas"
    },
    data: [
    {
      // Change type to "bar", "area", "spline", "pie",etc.
      type: "area",
      color: "yellow",
      dataPoints: [
        { label: "Março",  y: 10  },
        { label: "Abril", y: 15  },
        { label: "Maio", y: 25  },
        { label: "Junho",  y: 30  },
        { label: "Julho",  y: 28  }
      ]
    }]
    });
  chart.render();
  if(countDesistenciaVendas ==0){$("#chartContainer").slideDown();
    countDesistenciaVendas = 1;
    countVendasCanceladas = 0;
    countProdVendidos = 0;
  }
  else{
    $("#chartContainer").slideUp();
    countDesistenciaVendas = 0;
  }
}
let perfil;
let userID;
let userName;
let userEmail;
let userPicture;
let userToken;
let count;
function onSignIn(response) {
  // Recebendo o TOKEN que você usará nas demais requisições à API:
  userToken = response.getAuthResponse().id_token;
  console.log("token: " + userToken);
};

$(document).ready(function(){
  $('#add').on('submit', function(e){

    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
}
if(mm<10){mm='0'+mm}
today = dd+mm+yyyy;

    e.preventDefault();
    var regiao = $('#select-regiao').val();
    var comprasFinalizadas = $('#compras-finalizadas').val();
    var desi = $('#desistencia').val();
    var valor = $('#valor').val();
    var dataAdicionado = today;
    //    if(texto1== null || texto2 ==""){
    //$(this).css({ "border": "2px solid red" })
      //alert($(this).prev('').html() + " é obrigatório.");


    $.ajax( {
      url: "https://api.mlab.com/api/1/databases/bdweb/collections/trabalhoweb?apiKey=gCbrbBf-fJLdHvKzd4eN_OwagUjimc5K",
      data: JSON.stringify({
        "regiao" : regiao,
        "comprasFinalizadas" : comprasFinalizadas,
        "desistencia" : desi,
        "valor" : valor,
        "dataAdd" : today
     }),
      type: "POST",
      contentType: "application/json",
      success:function(data){
        //window.location.href="#"

      },
      error:function(xhr, status, err){
        console.log(err);
      }

      });
      $('#select-regiao').val('');
      $('#compras-finalizadas').val('');
      $('#desistencia').val('');
      $('#valor').val('');
  });

});

var contar=0;

function getDados(){

  if(contar==0){$("#resultados").slideDown();
    contar=1;
    $.ajax({
      url: "https://api.mlab.com/api/1/databases/bdweb/collections/trabalhoweb?apiKey=gCbrbBf-fJLdHvKzd4eN_OwagUjimc5K",
    }).done(function(data){
      console.log(data);
      var output = '<div>';
      $.each(data, function(key, data){
        output += '<div class="well">';
        output += '<h3>'+data._id["$oid"]+'</h3>';
        output += '<p>'+data.regiao+'</p>';
        output += '<p>'+data.comprasFinalizadas+'</p>';
        output += '<p>'+data.desistencia+'</p>';
        output += '<p>'+data.valor+'</p>';
        output += '</div>';
      });
      output+= '</div>';
      $('#resultados').html(output);
    });
  }else{
    $("#resultados").slideUp();
    contar = 0;
  }
}

function maskIt(w,e,m,r,a){
// Cancela se o evento for Backspace
if (!e) var e = window.event
if (e.keyCode) code = e.keyCode;
else if (e.which) code = e.which;
// Variáveis da função
var txt  = (!r) ? w.value.replace(/[^\d]+/gi,'') : w.value.replace(/[^\d]+/gi,'').reverse();
var mask = (!r) ? m : m.reverse();
var pre  = (a ) ? a.pre : "";
var pos  = (a ) ? a.pos : "";
var ret  = "";
if(code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g,'').length) return false;
// Loop na máscara para aplicar os caracteres
for(var x=0,y=0, z=mask.length;x<z && y<txt.length;){
if(mask.charAt(x)!='#'){
ret += mask.charAt(x); x++; }
else {
ret += txt.charAt(y); y++; x++; } }
// Retorno da função
ret = (!r) ? ret : ret.reverse()
w.value = pre+ret+pos; }
// Novo método para o objeto 'String'
String.prototype.reverse = function(){
return this.split('').reverse().join(''); };
