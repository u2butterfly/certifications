/*jslint es5: true */
/*jshint es5: true */
angular.module('emailNotificationSettingsService', [
        'ngResource'
])

.service('emailNotificationSettingsService', function ($interval, $resource, settings) {

    var emailNotificationSettingsResource = $resource(settings.apiDomain + ':port/api/emailnotification/:id', { port: settings.apiPort });
    var emailNotificationAutoSubscribeResource = $resource(settings.apiDomain + ':port/api/emailnotification/autosubscribe', { port: settings.apiPort });
    var emailNotificationMailboxSettingsResource = $resource(settings.apiDomain + ':port/api/emailnotificationmailbox/:id', { port: settings.apiPort });

    // Keep track of elapsed time since data was updated
    var minutesSinceUpdate = 0;
    var minutesSinceUpdatePromise;

    var resetMinutesSinceUpdate = function () {
        $interval.cancel(minutesSinceUpdatePromise);
        minutesSinceUpdate = 0;
        minutesSinceUpdatePromise = $interval(function () {
            minutesSinceUpdate++;
        }, 1000 * 60);
    };

    // Get emailNotifications
    var emailNotificationSettings = {};
    var getEmailNotificationSettings = function () {
        emailNotificationSettings = emailNotificationSettingsResource.get();
        emailNotificationSettings.$promise.finally(function () {
            resetMinutesSinceUpdate();
        });
    };


    //Update auto subscribe mailbox
    var updateEmailNotificationAutoSubscribedPromise = {};

    var updateEmailNotificationAutoSubscribed = function (postData) {
        updateEmailNotificationAutoSubscribedPromise = emailNotificationAutoSubscribeResource.save(postData);
    };


    //Update email notification settings
    var updateEmailNotificationSettingsPromise = {};

    var updateEmailNotificationSettings = function (emailNotification) {
        if (emailNotification.Value) {
            //Insert new email notification
            updateEmailNotificationSettingsPromise = emailNotificationSettingsResource.save(emailNotification);
            updateEmailNotificationSettingsPromise.$promise.then(
             function (response) {
                 if (response.Errors.length < 1) {
                    
                         angular.copy(response.Data, emailNotification);
                   
                 }
             });
        } else if (emailNotification.EmailNotificationProfileId) {
            ////Delete email notification 
            updateEmailNotificationSettingsPromise = emailNotificationSettingsResource.remove({ id: emailNotification.EmailNotificationProfileId });
            updateEmailNotificationSettingsPromise.$promise.then(
             function (response) {
                 if (response.Errors.length < 1) {
                     angular.copy(response.Data, emailNotification);
                 }
             });
        }
    };

    //Update email notification mailbox settings
    var updateEmailNotificationMailboxSettingsPromise = {};

    var updateEmailNotificationMailboxSettings = function (emailNotificationMailbox) {
        if (emailNotificationMailbox.Value) {
            //Insert new email notification
            updateEmailNotificationMailboxSettingsPromise = emailNotificationMailboxSettingsResource.save(emailNotificationMailbox);

            updateEmailNotificationMailboxSettingsPromise.$promise.then(
              function (response) {
                  if (response.Errors.length < 1) {
                      angular.copy(response.Data, emailNotificationMailbox);
                  }
              });
        } else {
            //Delete email notification 
            updateEmailNotificationMailboxSettingsPromise = emailNotificationMailboxSettingsResource.remove({ id: emailNotificationMailbox.EmailNotificationProfileMailboxId });

            updateEmailNotificationMailboxSettingsPromise.$promise.then(
               function (response) {
                  if (response.Errors.length < 1) {
                       angular.copy(response.Data, emailNotificationMailbox);
                   }
               });
        }
    };

    // Expose data and method (getters)
    return {
        getEmailNotificationSettings: getEmailNotificationSettings,
        updateEmailNotificationAutoSubscribed: updateEmailNotificationAutoSubscribed,
        updateEmailNotificationSettings: updateEmailNotificationSettings,
        updateEmailNotificationMailboxSettings: updateEmailNotificationMailboxSettings,
        get emailNotificationSettings() { return emailNotificationSettings; },
        get minutesSinceUpdate() { return minutesSinceUpdate; },
        get updateEmailNotificationAutoSubscribedPromise() { return updateEmailNotificationAutoSubscribedPromise; },
        get updateEmailNotificationSettingsPromise() { return updateEmailNotificationSettingsPromise; },
        get updateEmailNotificationMailboxSettingsPromise() { return updateEmailNotificationMailboxSettingsPromise; }
    };

})

;