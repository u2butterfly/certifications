/*jslint es5: true */
/*jshint es5: true */
describe('email notifications settings service', function () {

    var mockSettings = {
        apiDomain: 'http://localhost/MyER.WebApi',
        apiPort: ''
    };

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('settings', mockSettings);
        });
    });

    beforeEach(module('emailNotificationSettingsService'));

    beforeEach(inject(function (_$httpBackend_, _emailNotificationSettingsService_, _settings_) {
        $httpBackend = _$httpBackend_;
        emailNotificationSettingsService = _emailNotificationSettingsService_;
        settings = _settings_;
    }));

    it('should exist', function () {
        expect(emailNotificationSettingsService).toBeDefined();
    });

    describe('> get email notifications settings method', function () {

        it('should get email notifications when the method is called', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/emailnotification').respond({
                Errors: [],
                Data: {
                    IsAutoSubscribed: 'true',
                    EmailNotifications: {
                        '1': {
                            EmailNotificationProfileId: '1',
                            EmailNotificationTypeId: '1',
                            Value: 'true',
                        }
                    },
                    EmailNotificationMailboxes: {
                        '1': {
                            EmailNotificationProfileMailboxId: '1',
                            EmailNotificationProfileId: '1',
                            Mailbox: 'IU',
                            Value: 'true'
                        }
                    }
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.getEmailNotificationSettings();
            $httpBackend.flush();

            expect(emailNotificationSettingsService.emailNotificationSettings.Errors).toEqual([]);

            expect(emailNotificationSettingsService.emailNotificationSettings.Data).toEqual({
                IsAutoSubscribed: 'true',
                EmailNotifications: {
                    '1': {
                        EmailNotificationProfileId: '1',
                        EmailNotificationTypeId: '1',
                        Value: 'true',
                    }
                },
                EmailNotificationMailboxes:
                {
                    '1': {
                        EmailNotificationProfileMailboxId: '1',
                        EmailNotificationProfileId:
                    '1',
                        Mailbox:
                    'IU',
                        Value:
                    'true'
                    }
                }
            });

            expect(emailNotificationSettingsService.emailNotificationSettings.SuccessMessage).toEqual('');

        });

    });

    describe('> update auto subscribe email notifications method', function () {

        it('should put data to the API when editing auto subscribe', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/emailnotification').respond({
                Errors: [],
                Data: {
                    IsAutoSubscribed: 'true'
                },
                SuccessMessage: ''
            });

            $httpBackend.expectPOST(settings.apiDomain + settings.apiPort + '/api/emailnotification/autosubscribe', {

                IsAutoSubscribed: 'false'

            }).respond({
                Errors: [],
                Data: {
                    IsAutoSubscribed: 'false'
                },
                SuccessMessage: ''

            });

            var isAutoSubscribed = {
                IsAutoSubscribed: 'false'
            };

            emailNotificationSettingsService.getEmailNotificationSettings();

            emailNotificationSettingsService.updateEmailNotificationAutoSubscribed(isAutoSubscribed);

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            //expect that the data was changed when updated.
            expect(emailNotificationSettingsService.updateEmailNotificationAutoSubscribedPromise.Data).toEqual({
                IsAutoSubscribed: 'false'
            });


        });
    });

    describe('> update email notifications method', function () {
     
        it('should put data to the API when editing email notification setting', function () {
            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/emailnotification').respond({
                Errors: [],
                Data: {
                    EmailNotifications: {}
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.getEmailNotificationSettings();
            $httpBackend.flush();

            $httpBackend.expectPOST(settings.apiDomain + settings.apiPort + '/api/emailnotification', {

                EmailNotificationTypeId: '1',
                Value: true

            }).respond({
                Errors: [],
                Data: {
                    EmailNotificationProfileId: '1',
                    EmailNotificationTypeId: '1',
                    Value: true
                },
                SuccessMessage: ''

            });

            emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications['1'] = {

                EmailNotificationTypeId: '1',
                Value: true

            };
            emailNotificationSettingsService.updateEmailNotificationSettings(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications['1']);

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

           
            //expect that the data was changed when updated.
            expect(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications['1']).toEqual({
                   
                        EmailNotificationProfileId: '1',
                        EmailNotificationTypeId: '1',
                        Value: true
                  
            });
        });


    });

    describe('> delete email notifications method', function () {       

        it('should delete email notification setting', function() {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/emailnotification').respond({
                Errors: [],
                Data: {
                    EmailNotifications: {
                        '1': {
                            EmailNotificationProfileId: '1',
                            EmailNotificationTypeId: '1',
                            Value: true
                        }
                    }
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.getEmailNotificationSettings();
            $httpBackend.flush();

            //Delete email notifications

            $httpBackend.expectDELETE(settings.apiDomain + settings.apiPort + '/api/emailnotification/3644').respond({
                Errors: [],
                Data:{
                    EmailNotifications: {}
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications['1'] = {
                EmailNotificationProfileId: '3644',
                EmailNotificationTypeId: '1',
                Value: false

            };
            emailNotificationSettingsService.updateEmailNotificationSettings(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications['1']);

            $httpBackend.flush();

            expect(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotifications['1']).toEqual({
                EmailNotifications: {}
            });

        });


    });

    describe('> update email mailboxes notifications method', function () {
      
        it('should put data to the API when editing email notification setting', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/emailnotification').respond({
                Errors: [],
                Data: {
                    EmailNotificationMailboxes: {}
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.getEmailNotificationSettings();
            $httpBackend.flush();

            $httpBackend.expectPOST(settings.apiDomain + settings.apiPort + '/api/emailnotificationmailbox', {

                Mailbox: 'SYR',
                Value: true

            }).respond({
                Errors: [],
                Data: {
                    EmailNotificationProfileMailboxId: 448,
                    EmailNotificationProfileId: 3643,
                    Mailbox: 'SYR',
                    Value: true
                },
                SuccessMessage: ''

            });

            emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes['SYR'] = {

                Mailbox: 'SYR',
                Value: true

            };
            emailNotificationSettingsService.updateEmailNotificationMailboxSettings(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes['SYR']);

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();


            //expect that the data was changed when updated.
            expect(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes['SYR']).toEqual({

                EmailNotificationProfileMailboxId: 448,
                EmailNotificationProfileId: 3643,
                Mailbox: 'SYR',
                Value: true

            });
        });


    });


    describe('> delete email notification mailboxes method', function () {
      
        it('should delete email notification setting', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/emailnotification').respond({
                Errors: [],
                Data: {
                    EmailNotificationMailboxes: {
                        'SYR': {
                            EmailNotificationProfileMailboxId: 448,
                            EmailNotificationProfileId: 3643,
                            Mailbox: 'SYR',
                            Value: true
                        }
                    }
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.getEmailNotificationSettings();
            $httpBackend.flush();

            //Delete email notifications

            $httpBackend.expectDELETE(settings.apiDomain + settings.apiPort + '/api/emailnotificationmailbox/448').respond({
                Errors: [],
                Data: {
                    EmailNotificationMailboxes: {}
                },
                SuccessMessage: ''
            });

            emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes['SYR'] = {
                EmailNotificationProfileMailboxId: 448,
                EmailNotificationProfileId: 3643,
                Mailbox: 'SYR',
                Value: false

            };
            emailNotificationSettingsService.updateEmailNotificationMailboxSettings(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes['SYR']);

            $httpBackend.flush();

            expect(emailNotificationSettingsService.emailNotificationSettings.Data.EmailNotificationMailboxes['SYR']).toEqual({

                EmailNotificationMailboxes: {}
               
            });

        });

    });



});

