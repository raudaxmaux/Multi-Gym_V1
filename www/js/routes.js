angular.module('routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.loginfo', {
    url: '/loginfo',
    views: {
      'menuContent': {
        templateUrl: 'templates/getLogInfo.html',
        controller: 'GetLogInfo'
      }
    }
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

  .state('app.logout', {
    url: '/logout',
    views: {
      'menuContent': {
        templateUrl: 'templates/logout.html',
        controller: 'LogOutCtrl'
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
      },
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



    .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html',
          controller: 'InicioCtrl'
        }
      },
           resolve:{
              geoPos: function($rootScope, $cordovaGeolocation, Utils){    
                      return $cordovaGeolocation.getCurrentPosition({timeout: 20000, enableHighAccuracy: true}).then(function(position){
                        return position;                      
                      }, function(error){
                        console.log("GPS desligado.");
                        Utils.alertshow('Sem academias', 'Academias não encontradas. Verifique se seu GPS está ativado.');
                      })
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
          },
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

    .state('app.listagem', {
      url: '/busca_listagem',
      views: {
        'menuContent': {
          templateUrl: 'templates/busca_listagem.html',
          controller: 'BuscaListaCtrl'
        }
      }
    })

    .state('app.cidades', {
      url: '/busca_cidades',
      views: {
        'menuContent': {
          templateUrl: 'templates/busca_cidades.html',
          controller: 'BuscaListaCidadesCtrl'
        }
      }
    })

    .state('app.academia', {
      url: '/resultado_academia/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/resultado_academia.html',
          controller: 'resultadoBuscaAcademiaCtrl'
        }        
      },
        resolve: {
              unicaAcad: function(accessFactory, $stateParams){
                  console.log($stateParams.id)
                  var theAcademy = accessFactory.pegaAcademiaUnica($stateParams.id);
                  return theAcademy.once("value").then(function(snapshot){              
                    return snapshot.val();
                  })              
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
  $urlRouterProvider.otherwise('/app/loginfo');
});
