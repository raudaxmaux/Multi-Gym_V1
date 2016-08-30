angular.module('routes', [])

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
        controller: 'LogCtrl'
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
          templateUrl: 'templates/series.html',
          controller: 'SeriesCtrl'
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

        .state('app.perfilcompleto', {
          url: '/perfilcompleto',
          views: {
            'menuContent': {
              templateUrl: 'templates/perfilcompleto.html',
              controller: 'PerfilCompCtrl'
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
  })

   .state('app.mapa', {
    url: '/mapa',
    views: {
      'menuContent': {
        templateUrl: 'templates/mapa.html',
        controller: 'MapaCtrl'
      }
    }
  }); 


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login_inicial');
});
