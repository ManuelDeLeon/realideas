import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  Accounts.emailTemplates.siteName = "Real Ideas";
  Accounts.emailTemplates.from = "Real Ideas <everyone@realideas.site>";

  if (Meteor.settings.smtp) {
    process.env.MAIL_URL = Meteor.settings.smtp;
  }

  SyncedCron.add({
    name: 'Recalculate ratings of the ideas',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 24 hours');
    },
    job: function() {
      console.log("Calc Ratings");
    }
  });

  SyncedCron.start();

});
