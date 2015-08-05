if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  var i = 0;
  var d_timer = Session.setDefault('timer', 10);

  // Meteor.methods({
  //   nextQ: function () {
  //     alert("you're Right!!!");
  //     Session.set('Num1', Math.floor(Math.random() * 15) + 1);
  //     var N1 = Session.get('Num1')
  //     Session.set('Num2', Math.floor(Math.random() * 15) + 1);
  //     var N2 = Session.get('Num2')
  //     Session.set('timer', d_timer);
  //     Session.set('counter', d_counter);
  //   }
  // });

  Template.body.helpers({
    Num1: function () {
      Session.set('Num1', Math.floor(Math.random() * 15) + 1 );
      var N1 = Session.get('Num1')
      return N1
    },
    Num2: function () {
      Session.set('Num2', Math.floor(Math.random() * 15) + 1 );
      var N2 = Session.get('Num2')
      return N2
    },
    counter: function () {
      return Session.get('counter');
    },
    solution: function () {
      return Session.get('Num1') + Session.get('Num2');
    },
    YN: function () {
      if (Session.get('counter') === Session.get('Num1') + Session.get('Num2')) {
        return "Correct"}
        else {
          return "Wrong"
      }
    },
    timer: function () {
      var timeInc = setTimeout(function() { Session.set('timer', Session.get('timer') - 1)}, 1000)
      if (Session.get('timer') <= 0) {
        clearTimeout(timeInc)
      }
      else {
        return Session.get('timer')
      }
    }
  });

  Template.body.events({
    'solution check': function () {
      // Check to see if the counter reaches the solution
    }
  });

  Template.buttons.events({
    'click .button1': function () {
      // increment the counter by 1 when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },
    'click .button2': function () {
      // increment the counter by 2 when button is clicked
      Session.set('counter', Session.get('counter') + 2);
    },
    'click .button3': function () {
      // increment the counter by 3 when button is clicked
      Session.set('counter', Session.get('counter') + 3);
    },
    'click .button4': function () {
      // increment the counter by 4 when button is clicked
      Session.set('counter', Session.get('counter') + 4);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}