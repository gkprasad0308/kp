module.exports.createViews = function (db, done) {
  db.save('_design/client', {
    views: {
      all: {
       map: 
        function(doc) {
          var tempDoc = {}; 
          //Copy all properties except portfolio
          for (var e in doc) { 
            if (e != "portfolio") { 
              tempDoc[e] = doc[e]
            }
          }
          // Calculate total and find weighted average
          var sum = 0;
          for (var index = 0; index < doc.portfolio.length; index++) {
           sum += doc.portfolio[index].annualizedRateOfReturn;
          } 
          //Create arr element
          tempDoc.arr = Math.round(sum / doc.portfolio.length);
          emit(doc._id, tempDoc)
         }
      },
      byId: {
        map: 
          function (doc) {
             emit(doc._id, doc) 
          }
      }
      
    }
  }, done)
}
