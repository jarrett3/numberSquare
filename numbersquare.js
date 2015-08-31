if (Meteor.isClient) {
  // counter starts at 0
  Meteor.subscribe('userData');

  Accounts.ui.config ({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Session.setDefault('counter', 0);
  Session.set('scoreOff', 0);
  Session.set('myTimer', 0);
  Session.set('Num1', Math.floor(Math.random() * 15) + 1 );
  Session.set('Num2', Math.floor(Math.random() * 15) + 1 );

  Template.main.helpers({
    user: function () {
      return Meteor.user();
    },
    Num1: function () {
      return Session.get('Num1')
    },
    Num2: function () {
      return Session.get('Num2')
    },
    counter: function () {
      return Session.get('counter');
    },
    solution: function () {
      return Session.get('Num1') + Session.get('Num2');
    },
    myTimer: function () {
      if (Session.get('myTimer') === 0 || Session.get('counter') > Session.get('Num1') + Session.get('Num2')) {
        Meteor.clearInterval(rTimer);
        Session.set('myTimer', 0)
        $("button.start").show();
        Session.set('counter', 0);
      }
      if (Session.get('myTimer') === 0) {
        Meteor.call('dec1Points');
      }
      else {
        return Session.get('myTimer') + " Seconds"
      }
    },
    scoreOff: function () {
      return Session.get('scoreOff')
    }
  });

  Template.highScore.helpers({
    players: function() {
      return Meteor.users.find({}, {sort: {'score': -1}});
    }
  });

  // Function to subtract 1 second from timer
  function sTimer() {
    Session.set('myTimer', Session.get('myTimer') - 1)
  }

  $(function(){
    // Enabling Popover Example 1 - HTML (content and title from html tags of element)
    $("[data-toggle=popover]").popover();

    // Enabling Popover Example 2 - JS (hidden content and title capturing)
    $("#highScore_pop").popover({
        html: true, 
        content: function() {
          return $('#highScore_content').html();
        }
    });
  });

  $(function(){
    // Enabling Popover Example 1 - HTML (content and title from html tags of element)
    $("[data-toggle=popover]").popover();

    // Enabling Popover Example 2 - JS (hidden content and title capturing)
    $("#help_pop").popover({
        html: true, 
        content: function() {
          return $('#help_content').html();
        }
    });
  });

  Template.buttons.events({
    'click .start': function () {
      // Reset timer to 10 seconds
      Session.set('myTimer', 10);
      // Begin timer loop on click
      rTimer = Meteor.setInterval(sTimer, 1000);
      // Hide start button on click
      $("button.start").hide();
    },
    'click .button1': function () {
      // increment the counter by 1 when button is clicked
      if (Session.get('myTimer') > 0) {
        Session.set('counter', Session.get('counter') + 1);
      }
      if (Session.get('counter') === Session.get('Num1') + Session.get('Num2') && Session.get('myTimer') > 0) {
        Meteor.call('setNums');
        Session.set('counter', 0);
        Session.set('myTimer', 10);
        Meteor.call('incPoints');
        Session.set('scoreOff', Session.get('scoreOff') + 1);
      }
      if (Session.get('counter') > Session.get('Num1') + Session.get('Num2')) {
        Meteor.call('dec2Points');
        Session.set('scoreOff', Session.get('scoreOff') - 2);
      }
    },
    'click .button2': function () {
      // increment the counter by 2 when button is clicked
      if (Session.get('myTimer') > 0) {
        Session.set('counter', Session.get('counter') + 2);
      }
      if (Session.get('counter') === Session.get('Num1') + Session.get('Num2') && Session.get('myTimer') > 0) {
        Meteor.call('setNums');
        Session.set('counter', 0);
        Session.set('myTimer', 10);
        Meteor.call('incPoints');
        Session.set('scoreOff', Session.get('scoreOff') + 1);
      }
      if (Session.get('counter') > Session.get('Num1') + Session.get('Num2')) {
        Meteor.call('dec2Points');
        Session.set('scoreOff', Session.get('scoreOff') - 2);
      }
    },
    'click .button3': function () {
      // increment the counter by 3 when button is clicked
      if (Session.get('myTimer') > 0) {
        Session.set('counter', Session.get('counter') + 3);
      }
      if (Session.get('counter') === Session.get('Num1') + Session.get('Num2') && Session.get('myTimer') > 0) {
        Meteor.call('setNums');
        Session.set('counter', 0);
        Session.set('myTimer', 10);
        Meteor.call('incPoints');
        Session.set('scoreOff', Session.get('scoreOff') + 1);
      }
      if (Session.get('counter') > Session.get('Num1') + Session.get('Num2')) {
        Meteor.call('dec2Points');
        Session.set('scoreOff', Session.get('scoreOff') - 2);
      }
    },
    'click .button4': function () {
      // increment the counter by 4 when button is clicked
      if (Session.get('myTimer') > 0) {
        Session.set('counter', Session.get('counter') + 4);
      }
      if (Session.get('counter') === Session.get('Num1') + Session.get('Num2') && Session.get('myTimer') > 0) {
        Meteor.call('setNums');
        Session.set('counter', 0);
        Session.set('myTimer', 10);
        Meteor.call('incPoints');
        Session.set('scoreOff', Session.get('scoreOff') + 1);
      }
      if (Session.get('counter') > Session.get('Num1') + Session.get('Num2')) {
        Meteor.call('dec2Points');
        Session.set('scoreOff', Session.get('scoreOff') - 2);
      }
    }
  });
};

if (Meteor.isServer) {

  Meteor.publish("userData", function () {
    return Meteor.users.find({}, {sort: {'score': -1}});
  });

  Accounts.onCreateUser(function (options, user) {
    user.score = 0;
    user.clicks = 0;
    return user;
  })


  Meteor.startup(function () {
    // code to run on server at startup

  });
};

Meteor.methods({
  setNums: function () {
    Session.set('Num1', Math.floor(Math.random() * 15) + 1 );
    Session.set('Num2', Math.floor(Math.random() * 15) + 1 );
  },
  incPoints: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'score': 1}});
  },
  dec2Points: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'score': -0}})
  },
  dec1Points: function () {
    Meteor.users.update({_id: this.userId}, {$inc: {'score': -1}})
  }
});