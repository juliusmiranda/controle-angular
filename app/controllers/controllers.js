app.controller('HomeCtrl', function($scope, $location)
{
   $scope.activetab = $location.path();
});

app.controller('SobreCtrl', function($scope, $location)
{
   $scope.activetab = $location.path();
});

app.controller('ContatoCtrl', function($scope, $location)
{
   $scope.activetab = $location.path();
});


app.controller('FornecedoresCtrl', function($scope, $location, $firebaseArray, $http, $routeParams){
	$scope.activetab = '/fornecedores';
	$scope.fornecedor = {};
	ref = new Firebase("https://testebhlog0.firebaseio.com/fornecedores");

	$scope.edita = [];
	$scope.fornecedores = $firebaseArray(ref);
	
	$scope.buscaCep = function($event, c){
	    var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13) {
		        $scope.buscaCEP(c);
		    }

	  };
	$scope.buscaCnpj = function($event, c){
	    var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13) {
		        $scope.buscaCNPJ(c);
		    }

	  };

	$scope.proximo = function($event, el){
		var keyCode = $event.which || $event.keyCode;
	    if (keyCode === 13) {
	        $(".form-control:eq("+el+")").focus();
	    }
	  };

		
	$scope.buscaCNPJ = function(c){
		c = c.toString();
		tmp = c.replace(/[^0-9]/g, '');
		$http.get('/cnpj.php?cnpj='+tmp).then(function(response){
			console.log(response.data);
			if(response.data.status == "ERROR"){
				if(response.data.message){
					alert(response.data.message);
					$(".form-control:eq(0)").focus();
					$(".form-control:eq(0)").select();
				}
			}else{
				$scope.fornecedor.razao_social = response.data.nome;
				$scope.fornecedor.nome_fantasia = response.data.fantasia;
				$scope.fornecedor.email = response.data.email;
				$scope.fornecedor.telefone = response.data.telefone;
				$scope.fornecedor.cep = response.data.cep;
				$scope.fornecedor.logradouro = response.data.logradouro;
				$scope.fornecedor.numero = response.data.numero;
	            $scope.fornecedor.bairro = response.data.bairro;
	            $scope.fornecedor.cidade = response.data.municipio;
	            $scope.fornecedor.estado = response.data.uf;
	            if(response.data.fantasia == ""){
	            	$(".form-control:eq(2)").focus();	
	            }else{
	            	$(".form-control:eq(3)").focus();	
	            }
			}
			
		});
	}

	$scope.buscaCEP = function(c){
		c = c.toString();
		tmp = c.replace(/[^0-9]/g, '');
		$http.get('https://viacep.com.br/ws/'+tmp+'/json').then(function(response){
			$scope.fornecedor.logradouro = response.data.logradouro;
            $scope.fornecedor.bairro = response.data.bairro;
            $scope.fornecedor.cidade = response.data.localidade;
            $scope.fornecedor.estado = response.data.uf;
            $(".form-control:eq(8)").focus();
		});
	}

	$scope.removeRegistro = function(fornecedor){
  		$scope.fornecedores.$remove(fornecedor);
  	};

	$scope.salvarRegistro = function(fornecedor, id){
		if(id != undefined){
			n = new Firebase("https://testebhlog0.firebaseio.com/fornecedores");
			result = n.child(id);
			delete fornecedor.$id;
			delete fornecedor.$priority;
			result.update(fornecedor);
			delete $scope.editar;
			$scope.fornecedor = {};
		}else{
			$scope.fornecedores.$add(fornecedor);
			$scope.fornecedor = {};
		}
	};

	$scope.editarFornecedor = function(fornecedor,id){
		$scope.editar = "True";
		dst = angular.extend($scope.fornecedor, fornecedor);
	};

	$scope.cancelarCadastro = function(){
		delete $scope.editar;
		$scope.fornecedor = {};
	}


});

app.controller('TarefasCtrl', function($scope, $location, $firebaseArray){
   $scope.activetab = $location.path();
   ref = new Firebase("https://testebhlog0.firebaseio.com/tarefas");
	$scope.tarefa = {};
	$scope.tarefas = $firebaseArray(ref);
	  
	$scope.addTarefa = function() {
		var date = new Date();
		$scope.dia = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
		console.log($scope.dia);
		$scope.tarefas.$add({
			data : $scope.dia,
			nome : $scope.tarefa.nova
		});
		$scope.tarefa.nova = '';
  	};

  	$scope.confirmaAcao = function(tarefa){
  		check = confirm("Certeza absoluta?");
  		if(check){
  			$scope.tarefas.$remove(tarefa);
  		}
  	};
});

app.controller('OrcamentoCtrl', function($scope, $location, $firebaseArray)
{	
	$scope.activetab = $location.path();
	ref = new Firebase("https://testebhlog0.firebaseio.com/orcamentos");
	$scope.dados = {};
	
	  $scope.messages = $firebaseArray(ref);
	  
	  
	$scope.addMessage = function() {

		$scope.messages.$add({
			nome : $scope.dados.novo
		});
	};
});