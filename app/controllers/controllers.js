app.controller('HomeCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('SobreCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('ContatoCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('FornecedoresCtrl', function($rootScope, $location, $firebaseArray, $http, $routeParams){
	$rootScope.activetab = '/fornecedores';
	ref = new Firebase("https://testebhlog0.firebaseio.com/fornecedores");
	$rootScope.fornecedores = $firebaseArray(ref);
	$rootScope.acao = 'listar';
	
	$rootScope.param = $routeParams.param;
	console.log($rootScope.param);

	$rootScope.home = function(){
		$location.path('/fornecedores');
	}

	$rootScope.buscaCep = function(c){
		/* BUSCAR CEP */
		c = c.toString();
		tmp = parseInt(c.replace(/[^0-9\.]/g, ''), 10);
		var cep = 'https://viacep.com.br/ws/'+tmp+'/json/';
		jQuery.ajax({
	        async: true,
	        url: cep,
	        dataType: 'jsonp',
	        method: "GET",
	        error: function (jqXHR, textStatus, errorThrown) {
	            console.log(textStatus + ': ' + errorThrown);
	        },
	        success: function (data, textStatus, jqXHR) {
	            if (data.Error || data.Response) {
	                exists = 0;
	            }
	            console.log(data);
	        }
	    });	
	}
		
	$rootScope.confirmaAcao = function(fornecedor){
  		check = confirm("Certeza absoluta?");
  		if(check){
  			$rootScope.fornecedores.$remove(fornecedor);
  		}
  	};

  	$rootScope.editarFornecedor = function(fornecedor){
  		//console.log(fornecedor.$id);
  		$location.path('/editar_fornecedores/'+fornecedor.$id);
  		//$rootScope.acao = "editar";
  	};

	$rootScope.cadastrarFornecedor = function(){
		//window.location.assign('/#/cadastrar/fornecedores');
		$location.path('/cadastrar_fornecedores');
		console.log($location.path());
		
	}

	$rootScope.salvarRegistro = function(fornecedor){
		$rootScope.fornecedores.$add(fornecedor);
	}

	$rootScope.listar = function(){
		$rootScope.acao = 'listar';
	}

});

app.controller('TarefasCtrl', function($rootScope, $location, $firebaseArray){
   $rootScope.activetab = $location.path();
   ref = new Firebase("https://testebhlog0.firebaseio.com/tarefas");
	$rootScope.tarefa = {};
	$rootScope.tarefas = $firebaseArray(ref);
	  
	$rootScope.addTarefa = function() {
		var date = new Date();
		$rootScope.dia = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
		console.log($rootScope.dia);
		$rootScope.tarefas.$add({
			data : $rootScope.dia,
			nome : $rootScope.tarefa.nova
		});
		$rootScope.tarefa.nova = '';
  	};

  	$rootScope.confirmaAcao = function(tarefa){
  		check = confirm("Certeza absoluta?");
  		if(check){
  			$rootScope.tarefas.$remove(tarefa);
  		}
  	};
});

app.controller('OrcamentoCtrl', function($rootScope, $location, $firebaseArray)
{	
	$rootScope.activetab = $location.path();
	ref = new Firebase("https://testebhlog0.firebaseio.com/orcamentos");
	$rootScope.dados = {};
	  // create a synchronized array
	
	  $rootScope.messages = $firebaseArray(ref);
	  
	  // add new items to the array
	  // the message is automatically added to our Firebase database!
	$rootScope.addMessage = function() {

		$rootScope.messages.$add({
			nome : $rootScope.dados.novo
		});
	};
});