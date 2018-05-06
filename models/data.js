const User = require('./user');

module.exports.getDashboardData = function(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      if (error) {
        let errorObj = {
          success: false,
          message: 'Error retrieving data.',
          error: error
        }
        reject(errorObj);
      } else if (user) {
        let today = new Date();
        let lastSevenDays = new Date().setDate(today.getDate()-7);
        let lastThirtyDays = new Date().setDate(today.getDate()-30);
        let lastNinetyDays = new Date().setDate(today.getDate()-90);
        let lastOneEightyDays = new Date().setDate(today.getDate()-180);
        let userData = {};

        // PROFILE VIEWS

        let profileViewsLast7Days = [];
        let profileViewsLast30Days = [];
        let profileViewsLast90Days = [];
        let profileViewsLast180Days = [];
        user.dataProfileViews.forEach((view) => {
          if (view.createdAt > lastOneEightyDays) {
            profileViewsLast180Days.push(view);
          }
          if (view.createdAt > lastNinetyDays) {
            profileViewsLast90Days.push(view);
          }
          if (view.createdAt > lastThirtyDays) {
            profileViewsLast30Days.push(view);
          }
          if (view.createdAt > lastSevenDays) {
            profileViewsLast7Days.push(view);
          }
        });

        userData['profileViewsLast7Days'] = profileViewsLast7Days;
        userData['profileViewsLast30Days'] = profileViewsLast30Days;
        userData['profileViewsLast90Days'] = profileViewsLast90Days;
        userData['profileViewsLast180Days'] = profileViewsLast180Days;
        userData['profileViewsAll'] = user.dataProfileViews;

        // END DATA COLLECTION

        let successObj = {
          success: true,
          message: 'Succesfully retrieved user data.',
          data: userData
        }
        resolve(successObj);
      } else {
        let errorObj = {
          success: false,
          message: 'Unable to get data.',
          error: ''
        }
        reject(errorObj);
      }
    });
  });
}