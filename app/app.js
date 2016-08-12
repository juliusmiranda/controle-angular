var app = angular.module('app',['ngRoute', 'firebase']);

app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   $locationProvider.html5Mode(true);

   $routeProvider

   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'app/views/home.html',
      controller     : 'HomeCtrl',
   })

   // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
   .when('/sobre', {
      templateUrl : 'app/views/sobre.html',
      controller  : 'SobreCtrl',
   })

   // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
   .when('/contato', {
      templateUrl : 'app/views/contato.html',
      controller  : 'ContatoCtrl',
   })

   .when('/fornecedores', {
      templateUrl : 'app/views/fornecedores.html',
      controller : 'FornecedoresCtrl',
   })

   .when('/cadastrar_fornecedores', {
      templateUrl : 'app/views/cadastrar_fornecedores.html',
      controller : 'FornecedoresCtrl',
   })

   .when('/editar_fornecedores/:param', {
      templateUrl : 'app/views/editar_fornecedores.html',
      controller : 'FornecedoresCtrl',
   })

   .when('/orcamento', {
      templateUrl : 'app/views/orcamento.html',
      controller  : 'OrcamentoCtrl',
   })
   
   .when('/tarefas', {
      templateUrl : 'app/views/tarefas.html',
      controller  : 'TarefasCtrl',
   })

   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});