const User = require('./user');

let today = new Date();
let lastDay = new Date().setDate(today.getDate()-1);
let lastSevenDays = new Date().setDate(today.getDate()-7);
let lastThirtyDays = new Date().setDate(today.getDate()-30);
let lastNinetyDays = new Date().setDate(today.getDate()-90);
let lastOneEightyDays = new Date().setDate(today.getDate()-180);
let lastThreeSixFive = new Date().setDate(today.getDate()-365);
let userData = {};

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

        userData['profileViews'] = getProfileViews(user);
        userData['propertiesAddedPendingSold'] = getPropertiesAddedPendingSold(user);
        userData['connectionsMade'] = user.dataConnectionsMade.length;
        userData['invitesSent'] = user.dataInvitesSent.length;
        userData['propertiesBought'] = user.dataPropertyBought.length;
        userData['propertiesSold'] = user.dataPropertySold.length;
        // userData['connectionRequestAcceptedPercentage'] = getConnectionRequestAcceptedPercentage(user);
        // userData['invitesSentConnectionsMadePercentage'] = getInvitesSentPercentage(user);
        // userData['bidsSentPercentage'] = getBidsSentPercentage(user);

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

var getProfileViews = function(user) {
  let profileViewsToday = [];
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
    if (view.createdAt > lastDay) {
      profileViewsToday.push(view);
    }
  });

  let data = [
    {
      "name": "Today",
      "value": profileViewsToday.length
    },
    {
      "name": "Last 7 Days",
      "value": profileViewsLast7Days.length
    },
    {
      "name": "Last 30 Days",
      "value": profileViewsLast30Days.length
    },
    {
      "name": "Last 90 Days",
      "value": profileViewsLast90Days.length
    },
    {
      "name": "Last 180 Days",
      "value": profileViewsLast180Days.length
    }
  ];

  return data;
}

var getPropertiesAddedPendingSold = function(user) {
  let propertiesAdded30Days = 0;
  let propertiesAdded90Days = 0;
  let propertiesAdded180Days = 0;
  let propertiesAdded365Days = 0;

  let propertiesSoldPending30Days = 0;
  let propertiesSoldPending90Days = 0;
  let propertiesSoldPending180Days = 0;
  let propertiesSoldPending365Days = 0;

  let propertiesSold30Days = 0;
  let propertiesSold90Days = 0;
  let propertiesSold180Days = 0;
  let propertiesSold365Days = 0;

  user.dataPropertyAdded.forEach((prop) => {
    if (prop.createdAt > lastThirtyDays) {
      propertiesAdded30Days++;
    }
    if (prop.createdAt > lastNinetyDays) {
      propertiesAdded90Days++;
    }
    if (prop.createdAt > lastOneEightyDays) {
      propertiesAdded180Days++;
    }
    if (prop.createdAt > lastThreeSixFive) {
      propertiesAdded365Days++;
    }
  });

  user.dataPropertySoldPending.forEach((prop) => {
    if (prop.createdAt > last30Days) {
      propertiesSoldPending30Days++;
    }
    if (prop.createdAt > last90Days) {
      propertiesSoldPending90Days++;
    }
    if (prop.createdAt > lastOneEightyDays) {
      propertiesSoldPending180Days++;
    }
    if (prop.createdAt > lastThreeSixFive) {
      propertiesSoldPending365Days++;
    }
  });

  user.dataPropertySold.forEach((prop) => {
    if (prop.createdAt > last30Days) {
      propertiesSold30Days++;
    }
    if (prop.createdAt > last90Days) {
      propertiesSold90Days++;
    }
    if (prop.createdAt > lastOneEightyDays) {
      propertiesSold180Days++;
    }
    if (prop.createdAt > lastThreeSixFive) {
      propertiesSold365Days++;
    }
  })

  let data = [
    {
      "name": "Added",
      "series": [
        {
          "name": "Last 30 Days",
          "value": propertiesAdded30Days
        },
        {
          "name": "Last 90 Days",
          "value": propertiesAdded90Days
        },
        {
          "name": "Last 180 Days",
          "value": propertiesAdded180Days
        },
        {
          "name": "Last 365 Days",
          "value": propertiesAdded365Days
        }
      ]
    },
    {
      "name": "Sold-Pending",
      "series": [
        {
          "name": "Last 30 Days",
          "value": propertiesSoldPending30Days
        },
        {
          "name": "Last 90 Days",
          "value": propertiesSoldPending90Days
        },
        {
          "name": "Last 180 Days",
          "value": propertiesSoldPending180Days
        },
        {
          "name": "Last 365 Days",
          "value": propertiesSoldPending365Days
        }
      ]
    },
    {
      "name": "Sold",
      "series": [
        {
          "name": "Last 30 Days",
          "value": propertiesSold30Days
        },
        {
          "name": "Last 90 Days",
          "value": propertiesSold90Days
        },
        {
          "name": "Last 180 Days",
          "value": propertiesSold180Days
        },
        {
          "name": "Last 365 Days",
          "value": propertiesSold365Days
        }
      ]
    }
  ];

  return data;
}

var getConnectionRequestAcceptedPercentage = function(user) {
  let percentage = user.dataConnectionRequestsSent.length / user.dataConnectionsMade.length;

  let data = [
    {
      "name": "Accepted",
      "value": percentage
    }
  ]

  return data;
}

var getInvitesSentPercentage = function(user) {
  let percentage = user.dataInvitesSent.length / user.dataConnectionsMade.length;

  let data = [
    {
      "name": "Invites",
      "value": percentage
    }
  ]

  return data;
}

var getBidsSentPercentage = function(user) {
  let percentage = user.dataBidsSent.length / user.dataPropertyBought.length;

  let data = [
    {
      "name": "Bids",
      "value": percentage
    }
  ]

  return data;
}



