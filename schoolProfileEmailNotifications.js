angular.module('main.schoolProfile.emailNotificationSettings', ['emailNotificationSettingsService']).config(function config($stateProvider) {
    $stateProvider.state('main.schoolProfile.emailNotificationSettings', {
        parent: 'main', url: 'schoolprofile/emailnotificationsettings',
        views: {
            'article': {
                templateUrl: 'schoolProfile/emailNotificationSettings/schoolProfileEmailNotificationSettings.article.tpl.html',
                controller: 'SchoolProfileEmailNotificationSettingsArticleCtrl'
            },
             'aside': {
                 templateUrl: 'schoolProfile/schoolProfile.aside.tpl.html',
                 controller: 'SchoolProfileAsideCtrl'
            },
            
        },
         stateType: 'schoolProfile'
    }
    );
})
    .controller('SchoolProfileEmailNotificationSettingsArticleCtrl', function ($filter, $scope, emailNotificationSettingsService, filterService) {
    var loadingModalInstance;
    $scope.emailNotificationSettingsService = emailNotificationSettingsService;
    $scope.passwordExpiration = 'true';
    $scope.mailboxes = filterService.globalFiltersOptions.entities;
    $scope.hasMailboxAccess = angular.fromJson(sessionStorage.session).HasMailboxAccess;
    // Save and Update Scope method for auto subscribe 
    $scope.updateAutoSubscribe = function () {
        // Send update request 
        emailNotificationSettingsService.updateEmailNotificationAutoSubscribed({
            IsAutoSubscribed: emailNotificationSettingsService.emailNotificationSettings.Data.IsAutoSubscribed
        }
        );
        //load response data back in from the API after error is returned and load into modal. 
        emailNotificationSettingsService.updateEmailNotificationAutoSubscribedPromise.$promise.then(function (response) {
            if (response.Errors.length) {
                loadingModalInstance = $scope.openLoadingResourceModal(emailNotificationSettingsService.updateEmailNotificationAutoSubscribedPromise);
            }
        }
        );
    };

    // Insert or Delete on/off Scope method for email notifications 
    $scope.updateEmailNotifications = function (emailNotificationSetting, emailNotificationTypeId) {
        if (!emailNotificationSetting.EmailNotificationTypeId) {
            emailNotificationSetting.EmailNotificationTypeId = emailNotificationTypeId;
        }
        emailNotificationSettingsService.updateEmailNotificationSettings(emailNotificationSetting);
        //load response data back in from the API after error is returned and load into modal. 
        emailNotificationSettingsService.updateEmailNotificationSettingsPromise.$promise.then(function (response) {
            if (response.Errors.length) {
                loadingModalInstance = $scope.openLoadingResourceModal(emailNotificationSettingsService.updateEmailNotificationSettingsPromise);
            }
        }
        );
    };

    // Insert or Delete on/off Scope method for email notification mailboxes 
    $scope.updateEmailNotificationMailbox = function (emailNotificationSettingMailbox, emailNotificationMailboxName) {
        if (!emailNotificationSettingMailbox.Mailbox) {
            emailNotificationSettingMailbox.Mailbox = emailNotificationMailboxName;
        }
        emailNotificationSettingsService.updateEmailNotificationMailboxSettings(emailNotificationSettingMailbox);
        //load response data back in from the API after error is returned and load into modal. 
        emailNotificationSettingsService.updateEmailNotificationMailboxSettingsPromise.$promise.then(function (response) {
            if (response.Errors.length) {
                loadingModalInstance = $scope.openLoadingResourceModal(emailNotificationSettingsService.updateEmailNotificationMailboxSettingsPromise);
            }
        }
        );
    };

    // Get email notification settings if they haven't already been requested 
    if (!emailNotificationSettingsService.emailNotificationSettings.$resolved) {
        emailNotificationSettingsService.getEmailNotificationSettings();
    }

    //Select section settings 
    $scope.sectionSetters = {
        autoSubscribe: function (newValue) {
            emailNotificationSettingsService.emailNotificationSettings.Data.IsAutoSubscribed = newValue;
            $scope.updateAutoSubscribe();
        },
         newCertifications: function (newValue) {
            var emailNotifications = emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications;
            emailNotifications['1'] = {
                EmailNotificationProfileId: emailNotifications['1'] ? emailNotifications['1'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '1',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['1'], 1);
            emailNotifications['2'] = {
                EmailNotificationProfileId: emailNotifications['2'] ? emailNotifications['2'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '2',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['2'], 2);
        },
         pendingCertifications: function (newValue) {
            var emailNotifications = emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications;
            emailNotifications['3'] = {
                EmailNotificationProfileId: emailNotifications['3'] ? emailNotifications['3'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '3',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['3'], 3);
            emailNotifications['4'] = {
                EmailNotificationProfileId: emailNotifications['4'] ? emailNotifications['4'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '4',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['4'], 4);
            emailNotifications['5'] = {
                EmailNotificationProfileId: emailNotifications['5'] ? emailNotifications['5'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '5',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['5'], 5);
        },
        newRejects: function (newValue) {
            var emailNotifications = emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications;
            emailNotifications['9'] = {
                EmailNotificationProfileId: emailNotifications['9'] ? emailNotifications['9'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '9',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['9'], 9);
            emailNotifications['10'] = {
                EmailNotificationProfileId: emailNotifications['10'] ? emailNotifications['10'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '10',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['10'], 10);
            emailNotifications['11'] = {
                EmailNotificationProfileId: emailNotifications['11'] ? emailNotifications['11'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '11',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['11'], 11);
        },
         pendingRejects: function (newValue) {
            var emailNotifications = emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications;
            emailNotifications['12'] = {
                EmailNotificationProfileId: emailNotifications['12'] ? emailNotifications['12'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '12',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['12'], 12);
            emailNotifications['13'] = {
                EmailNotificationProfileId: emailNotifications['13'] ? emailNotifications['13'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '13',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['13'], 13);
            emailNotifications['14'] = {
                EmailNotificationProfileId: emailNotifications['14'] ? emailNotifications['14'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '14',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['14'], 14);
        },
         other: function (newValue) {
            var emailNotifications = emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications;
            emailNotifications['16'] = {
                EmailNotificationProfileId: emailNotifications['16'] ? emailNotifications['16'].EmailNotificationProfileId : '',
                EmailNotificationTypeId: '16',
                Value: newValue
            }
            ;
            $scope.updateEmailNotifications(emailNotifications['16'], 16);
        },
         mailbox: function (newValue) {
            var emailNotificationMailbox = emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes;
            if ($scope.hasMailboxAccess) {
                angular.forEach($filter('unique')($scope.mailboxes, 'Mailbox'), function (mailbox) {
                    emailNotificationMailbox[mailbox.Mailbox] = {
                        EmailNotificationProfileMailboxId: emailNotificationMailbox[mailbox.Mailbox] ? emailNotificationMailbox[mailbox.Mailbox].EmailNotificationProfileMailboxId : '',
                        EmailNotificationProfileId: emailNotificationMailbox[mailbox.Mailbox] ? emailNotificationMailbox[mailbox.Mailbox].EmailNotificationProfileId : '',
                        Mailbox: mailbox.Mailbox, Value: newValue
                    }
                    ;
                    $scope.updateEmailNotificationMailbox(emailNotificationMailbox[mailbox.Mailbox], mailbox.Mailbox);
                }
                );
            }
        }
    };

    $scope.checkAll = function (sectionValue) {
        angular.forEach($scope.sectionSetters, function (sectionSetter) {
            sectionSetter(sectionValue);
        }
        );
    };
}

);