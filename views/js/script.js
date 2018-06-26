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
      today = dd+"/"+mm+"/"+yyyy;

    e.preventDefault();
    var regiao = $('#select-regiao').val();
    var comprasFinalizadas = $('#compras-finalizadas').val();
    var desi = $('#desistencia').val();
    var valor = $('#valor').val();
    var dataVenda = $('#dataVenda').val();
    var dataAdd = today;
    //    if(texto1== null || texto2 ==""){
    //$(this).css({ "border": "2px solid red" })
      //alert($(this).prev('').html() + " é obrigatório.");


    var parts = dataVenda.split('-');
    var dataVenda = parts[2] + '/' + parts[1] + '/' + parts[0];
      console.log(dataVenda);
    $.ajax( {
      url: "https://api.mlab.com/api/1/databases/bdweb/collections/trabalhoweb?apiKey=gCbrbBf-fJLdHvKzd4eN_OwagUjimc5K",
      data: JSON.stringify({
        "regiao" : regiao,
        "comprasFinalizadas" : comprasFinalizadas,
        "desistencia" : desi,
        "valor" : valor,
        "dataVenda" : dataVenda,
        "dataAdd" : dataAdd
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
      $('dataVenda').val();
      $('dataAdd').val();
  });

});

var contar=0;
function getDados(){
var coDesis=0;
var coFinalis=0;
var coValor=0.0;
var coPercent=0;
var coValorString="";
var noDesis=0;
var noFinalis=0;
var noValor=0.0;
var noPercent=0;
var noValorString="";

  if(contar==0){$("#resultados").slideDown();
    contar=1;
    $.ajax({
      url: "https://api.mlab.com/api/1/databases/bdweb/collections/trabalhoweb?apiKey=gCbrbBf-fJLdHvKzd4eN_OwagUjimc5K",
    }).done(function(data){
      console.log(data);
      var output = '<div>';
      $.each(data, function(key, data){
        output += '<div class="well">';
        output += '<h3>ID: '+data._id["$oid"]+'</h3>';
        output += '<p>Região: '+data.regiao+'</p>';
        output += '<p>Compras finalizadas: '+data.comprasFinalizadas+'</p>';
        output += '<p>Desistencias: '+data.desistencia+'</p>';
        output += '<p>Valor: '+data.valor+'</p>';
        output += '<p>Data da Venda: '+data.dataVenda+'</p>';
        output += '<p>Data adicionado: '+data.dataAdd+'</p>';
        output += '</div>';
/////////////centro-Oeste
        if(data.regiao=='Centro-Oeste' && data.comprasFinalizadas!=''){
          var coFinalistemp = parseInt(data.comprasFinalizadas);
          coFinalis+=coFinalistemp;
        }
        if(data.regiao=='Centro-Oeste' && data.desistencia!=''){
          var coDesistemp = parseInt(data.desistencia);
          coDesis+=coDesistemp;
        }
        if(data.regiao=='Centro-Oeste'){
          console.log("valor.data   "+data.valor);

          //var coValortemp = parseFloat(data.valor.replace(',',''));
          var coValortemp = data.valor.replace(',','');
          console.log("1 "+coValortemp);

          coValortemp = coValortemp.replace('.','');
          console.log("2 "+coValortemp);
          coValortemp = parseInt(coValortemp)/100;

          coValor+=coValortemp;
          coValorString = coValor.toString();
          coValorString = coValorString.replace('.',',');
          console.log("valorFINAL   " + coValorString);
        }


        if(data.regiao=='Nordeste' && data.comprasFinalizadas!=''){
          var noFinalistemp = parseInt(data.comprasFinalizadas);
          noFinalis+=noFinalistemp;
        }
        if(data.regiao=='Nordeste' && data.desistencia!=''){
          var noDesistemp = parseInt(data.desistencia);
          noDesis+=noDesistemp;
        }
        if(data.regiao=='Nordeste'){
          console.log("valor.data   "+data.valor);

          //var coValortemp = parseFloat(data.valor.replace(',',''));
          var noValortemp = data.valor.replace(',','');
          console.log("1 "+noValortemp);

          noValortemp = noValortemp.replace('.','');
          console.log("2 "+noValortemp);
          noValortemp = parseInt(noValortemp)/100;

          noValor+=noValortemp;
          noValorString = noValor.toString();
          noValorString = noValorString.replace('.',',');
          console.log("valorFINAL   " + noValorString);
        }

        });
      if(coDesis>coFinalis){
        var coPercenttemp = (coFinalis/coDesis);
        coPercent=coPercenttemp;
        coPercent = coPercent.toFixed(2);
        coPercent=coPercent.toString();
        var percentagem = coPercent.split('.');
        coPercent = percentagem[1] +'%';
      }
      if(coFinalis>coDesis){
        var coPercenttemp = (coDesis/coFinalis);
        coPercent=coPercenttemp;
        coPercent = coPercent.toFixed(2);
        coPercent=coPercent.toString();
        var percentagem = coPercent.split('.');
        coPercent = percentagem[1] +'%';
      }

      $('#coFinalis').val(coFinalis);
      $('#coDesis').val(coDesis);
      $('#coValor').val(coValorString);
      $('#coPercent').val(coPercent);
      /////////////Nordeste

      if(noDesis>noFinalis){
      var noPercenttemp = (noFinalis/noDesis);
      noPercent=noPercenttemp;
      noPercent = noPercent.toFixed(2);
      noPercent=noPercent.toString();
      var percentagem = noPercent.split('.');
      noPercent = percentagem[1] +'%';
      }
      if(noFinalis>noDesis){
      var noPercenttemp = (noDesis/noFinalis);
      noPercent=noPercenttemp;
      noPercent = noPercent.toFixed(2);
      noPercent=noPercent.toString();
      var percentagem = noPercent.split('.');
      noPercent = percentagem[1] +'%';
      }

      $('#noFinalis').val(noFinalis);
      $('#noDesis').val(noDesis);
      $('#noValor').val(noValorString);
      $('#noPercent').val(noPercent);

      output+= '</div>';
      $('#resultados').html(output);
    });
  }else{
    $("#resultados").slideUp();
    contar = 0;
  }
  $('#dataAdd').val();

}
/*
$('#valor').keyup(function(){
    var v = $(this).val();
    v=v.replace(/\D/g,'');
    v=v.replace(/(\d{1,2})$/, ',$1');
    v=v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    v = v != ''?'R$ '+v:'';
    $(this).val(v);
});*/

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
