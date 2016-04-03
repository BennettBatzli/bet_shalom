myApp.factory('DataFactory', ['$http', function($http) {

    //lessonPlan stores information for a single lesson plan, used to populate the lesson plan view
    var lessonPlan = undefined;
    //lessonPlans stores the information for all the chosen lesson plans
    var lessonPlans = {};
    //Variables to store the state and the lesson id for the lesson plan view
    var lessonViewState = undefined;
    var lessonId = undefined;


    //The private function to save a lesson plan
    var saveLessonPlan = function(lessonPlan){
      var promise = $http.post('/lesson', lessonPlan).then(function(response) {
        console.log(response);
      });
      return promise;
    };

    //The private function to update a lesson plan
    var editLessonPlan = function(lessonPlan){
        $http.put('/lesson', lessonPlan).then(function(response) {
            console.log(response);
        });
    };

    //The private function to retrieve a lesson plan based on a passed-in user id
    var retrieveLessonPlan = function(id){
        console.log(id);
        var promise = $http.get('/lesson/' + id).then(function(response) {
            lessonPlan = response.data;
            console.log(lessonPlan);
        });
        return promise;
    };

    //function to retrieve all the lessons based on the user id, only gets all lessons until tables are in place
    var teacherRetrieveLessonPlans = function(userId){
        var promise = $http.get('/teacher_dashboard').then(function(response) {
            lessonPlans = response.data;
            console.log('DataFactory: ' + lessonPlans);
        });
        return promise;
    };

    //function to retrieve all the lessons based on the status, only getting all at the moment because I'm bad at sql ;D
    var adminRetrieveLessonPlans = function(){
        var promise = $http.get('/admin_dashboard').then(function(response) {
            lessonPlans = response.data;
            console.log('DataFactory: ' + lessonPlans);
        });
        return promise;
    };

  var publicApi = {
      factorySaveLessonPlan: function(lessonPlan){
        return saveLessonPlan(lessonPlan);
      },
      factoryEditLessonPlan: function(lessonPlan){
          return editLessonPlan(lessonPlan);
      },
      factoryGetLessonPlan: function(id){
          return retrieveLessonPlan(id);
      },
      factoryLessonPlan: function(){
          return lessonPlan;
      },
      factoryTeacherRetrieveLessonPlans: function(userId){
          return teacherRetrieveLessonPlans(userId);
      },
      factoryAdminRetrieveLessonPlans: function() {
          return adminRetrieveLessonPlans();
      },
      factoryLessonPlans: function(){
          return lessonPlans;
      },
      factoryLessonViewState: function(){
          return lessonViewState;
      },
      factoryStoredLessonId: function(){
          return lessonId;
      }
  };

  return publicApi;

}]);
