angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login_inicial', {
    url: '/login_inicial',
    views: {
      'menuContent': {
        templateUrl: 'templates/login_inicial.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.avisos', {
    url: '/avisos',
    views: {
      'menuContent': {
        templateUrl: 'templates/avisos.html',
        controller: 'AvisosCtrl'
      }
    }
  })


  .state('app.series', {
      url: '/series',
      views: {
        'menuContent': {
          templateUrl: 'templates/series.html'
        }
      }
    })


    .state('app.perfil', {
      url: '/perfil',
      views: {
        'menuContent': {
          templateUrl: 'templates/perfil.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.presenca', {
      url: '/presenca',
      views: {
        'menuContent': {
          templateUrl: 'templates/presenca.html',
        }
      }
    })

        //novos controllers BUSCA

    .state('app.busca', {
      url: '/busca',
      views: {
        'menuContent': {
          templateUrl: 'templates/busca.html',
          controller: 'BuscaCtrl'
        }
      }
    })

        //novos controllers TREINOS

    .state('app.treinos_agendados', {
      url: '/treinos_agendados',
      views: {
        'menuContent': {
          templateUrl: 'templates/treinos_agendados.html',
          controller: 'Treinos_agendadosCtrl'
        }
      }
  })

  .state('app.agendar_treinos', {
    url: '/agendar_treinos',
    views: {
      'menuContent': {
        templateUrl: 'templates/agendar_treinos.html',
        controller: 'Agendar_treinosCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login_inicial');
});
