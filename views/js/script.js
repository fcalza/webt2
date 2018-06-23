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
    e.preventDefault();
    var texto1 = $('#texto1').val();
    var texto2 = $('#texto2').val();
    if(texto1== null || texto2 ==""){
    //$(this).css({ "border": "2px solid red" })
      //alert($(this).prev('').html() + " é obrigatório.");
      texto1.value="Campo de preenchimento obrigatório";
      texto1.style.color="red";
    return false;
    }


    $.ajax( {
      url: "https://api.mlab.com/api/1/databases/bdweb/collections/trabalhoweb?apiKey=gCbrbBf-fJLdHvKzd4eN_OwagUjimc5K",
      data: JSON.stringify({
        "texto1" : texto1,
        "texto2" : texto2
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
        output += '<p>'+data.texto1+'</p>';
        output += '<p>'+data.texto2+'</p>';
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
