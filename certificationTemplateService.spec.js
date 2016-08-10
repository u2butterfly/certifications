describe('certification template service', function () {

    var mockSettings = {
        apiDomain: 'http://localhost/MyER.WebApi',
        apiPort: ''
    };

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('settings', mockSettings);
        });
    });

    beforeEach(module('certificationTemplateService'));

    beforeEach(inject(function (_$httpBackend_, _certificationTemplateService_, _settings_) {
        $httpBackend = _$httpBackend_;
        certificationTemplateService = _certificationTemplateService_;
        settings = _settings_;
    }));

    it('should exist', function () {
        expect(certificationTemplateService).toBeDefined();
    });

    describe('> get certifications templates method', function () {

        it('should get a list of templates when the method is called', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/certificationtemplate').respond({
                Errors: [],
                Data: {
                    Templates: [
                        {
                            Id: '0',
                            name: 'Freshman 2015',
                            gradeLevelId: '1',
                            enrollmentStatusId: '1',
                            anticipatedGraduationDate: '05/09/2019',
                            loanFrom: '08/01/2015',
                            loanTo: '08/01/2019',
                            disbursements: [{
                                id: '1',
                                date: '08/15/2015',
                                percentage: '0.5',
                                holdReleaseFlag: 'Hold'
                            }]

                        }
                    ]
                },
                SuccessMessage: ''
            });

            certificationTemplateService.getCertificationTemplates();
            $httpBackend.flush();

            expect(certificationTemplateService.certificationTemplates.Errors).toEqual([]);

            expect(certificationTemplateService.certificationTemplates.Data).toEqual({
                Templates: [
                       {
                           Id: '0',
                           name: 'Freshman 2015',
                           gradeLevelId: '1',
                           enrollmentStatusId: '1',
                           anticipatedGraduationDate: '05/09/2019',
                           loanFrom: '08/01/2015',
                           loanTo: '08/01/2019',
                           disbursements: [{
                               id: '1',
                               date: '08/15/2015',
                               percentage: '0.5',
                               holdReleaseFlag: 'Hold'
                           }]
                       }
                ]
            });

            expect(certificationTemplateService.certificationTemplates.SuccessMessage).toEqual('');

        });

    });

    describe('> create certification template method', function () {

        it('should post data to the API when creating a new template', function() {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/certificationtemplate').respond({
                Errors: [],
                Data: {
                    CertificationTemplates: []
                },
                SuccessMessage: ''
            });        

            $httpBackend.expectPOST(settings.apiDomain + settings.apiPort + '/api/certificationtemplate', {

                            Name: 'Freshman 2015',
                            AnticipatedGraduationDate: '05/09/2019',
                            EnrollmentStatusId: '1',
                            GradeLevelId: '1',
                            LoanFrom: '08/01/2015',
                            LoanTo: '08/01/2019',
                            Disbursements: [{
                                DisbursementNumber: '1',
                                AmountPercentage: '0.5',
                                HoldReleaseFlag: 'Hold',
                                DisbursementDate: '08/15/2015'
                            }]
             
            }).respond({
                Errors: [],
                Data: {
                            CertificationTemplateId: '0',
                            Name: 'Freshman 2015',
                            AnticipatedGraduationDate: '05/09/2019',
                            EnrollmentStatusId: '1',
                            GradeLevelId: '1',
                            LoanFrom: '08/01/2015',
                            LoanTo: '08/01/2019',
                            Disbursements: [{
                                DisbursementNumber: '1',
                                AmountPercentage: '0.5',
                                HoldReleaseFlag: 'Hold',
                                DisbursementDate: '08/15/2015'
                            }]
                },
                SuccessMessage: ''

            });

            var formTemplateData = {

                            Name: 'Freshman 2015',
                            AnticipatedGraduationDate: '05/09/2019',
                            EnrollmentStatusId: '1',
                            GradeLevelId: '1',
                            LoanFrom: '08/01/2015',
                            LoanTo: '08/01/2019',
                            Disbursements: [{
                                DisbursementNumber: '1',
                                AmountPercentage: '0.5',
                                HoldReleaseFlag: 'Hold',
                                DisbursementDate: '08/15/2015'
                            }]

            };

            certificationTemplateService.getCertificationTemplates();
            certificationTemplateService.createCertificationTemplate(formTemplateData);

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            expect(certificationTemplateService.createCertificationTemplatePromise.SuccessMessage).toEqual('');

            //expect to verify the new cert template is in the list of cert templates.
            expect(certificationTemplateService.certificationTemplates.Data.CertificationTemplates[0]).toEqual({
                CertificationTemplateId: '0',
                Name: 'Freshman 2015',
                AnticipatedGraduationDate: '05/09/2019',
                EnrollmentStatusId: '1',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Disbursements: [{
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015'
                }]
            });

        });
    });

    it(' > delete certification templates', function () {
        // Get certification templates
        $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/certificationtemplate').respond({
            Data: {
                CertificationTemplates: [{
                    CertificationTemplateId: '0',
                    Name: 'Freshman 2015',
                    AnticipatedGraduationDate: '05/09/2019',
                    EnrollmentStatusId: '1',
                    GradeLevelId: '1',
                    LoanFrom: '08/01/2015',
                    LoanTo: '08/01/2019',
                    Version: '08/08/2015',
                    Disbursements: [{
                        CertificationDisbursementTemplateId: '1',
                        CertificationTemplateId: '1',
                        DisbursementNumber: '1',
                        AmountPercentage: '0.5',
                        HoldReleaseFlag: 'Hold',
                        DisbursementDate: '08/15/2015',
                        Version: '08/08/2015'
                        }]
                    },
                    {
                    CertificationTemplateId: '1',
                    Name: 'Freshman 2015',
                    AnticipatedGraduationDate: '05/09/2019',
                    EnrollmentStatusId: '1',
                    GradeLevelId: '1',
                    LoanFrom: '08/01/2015',
                    LoanTo: '08/01/2019',
                    Version: '08/08/2015',
                    Disbursements: [{
                        CertificationDisbursementTemplateId: '1',
                        CertificationTemplateId: '1',
                        DisbursementNumber: '1',
                        AmountPercentage: '0.5',
                        HoldReleaseFlag: 'Hold',
                        DisbursementDate: '08/15/2015',
                        Version: '08/08/2015'
                        }]
                    }
                ]
            }
        });
        certificationTemplateService.getCertificationTemplates();
        $httpBackend.flush();

        // Delete certification templates 
        $httpBackend.expectDELETE(settings.apiDomain + settings.apiPort + '/api/certificationtemplate/' + certificationTemplateService.certificationTemplates.Data.CertificationTemplates[0].CertificationTemplateId).respond(true);
        certificationTemplateService.deleteCertificationTemplates([certificationTemplateService.certificationTemplates.Data.CertificationTemplates[0]]);
        $httpBackend.flush();

        expect(certificationTemplateService.certificationTemplates.Data.CertificationTemplates).toEqual([{
            CertificationTemplateId: '1',
            Name: 'Freshman 2015',
            AnticipatedGraduationDate: '05/09/2019',
            EnrollmentStatusId: '1',
            GradeLevelId: '1',
            LoanFrom: '08/01/2015',
            LoanTo: '08/01/2019',
            Version: '08/08/2015',
            Disbursements: [{
                CertificationDisbursementTemplateId: '1',
                CertificationTemplateId: '1',
                DisbursementNumber: '1',
                AmountPercentage: '0.5',
                HoldReleaseFlag: 'Hold',
                DisbursementDate: '08/15/2015',
                Version: '08/08/2015'
            }]
        }]);

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('> update certification template method', function () {

        it('should put data to the API when updating an existing template', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/certificationtemplate').respond({
                Errors: [],
                Data: {
                    CertificationTemplates: [{
                        CertificationTemplateId: '0',
                        Name: 'Freshman 2015',
                        AnticipatedGraduationDate: '05/09/2019',
                        EnrollmentStatusId: '1',
                        GradeLevelId: '1',
                        LoanFrom: '08/01/2015',
                        LoanTo: '08/01/2019',
                        Version: '08/08/2015',
                        Disbursements: [{
                            CertificationDisbursementTemplateId: '1',
                            CertificationTemplateId: '1',
                            DisbursementNumber: '1',
                            AmountPercentage: '0.5',
                            HoldReleaseFlag: 'Hold',
                            DisbursementDate: '08/15/2015',
                            Version: '08/08/2015'
                        }]
                    }]
                },
                SuccessMessage: ''
            });

            $httpBackend.expectPUT(settings.apiDomain + settings.apiPort + '/api/certificationtemplate', {

                CertificationTemplateId: '0',
                Name: 'Sophomore 2015',
                AnticipatedGraduationDate: '05/09/2019',
                EnrollmentStatusId: '1',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Version: '08/08/2015',
                Disbursements: [{
                    CertificationDisbursementTemplateId: '1',
                    CertificationTemplateId: '1',
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015',
                    Version: '08/08/2015'
                }]

            }).respond({
                Errors: [],
                Data: {
                        CertificationTemplateId: '0',
                        Name: 'Sophomore 2015',
                        AnticipatedGraduationDate: '05/09/2019',
                        EnrollmentStatusId: '1',
                        GradeLevelId: '1',
                        LoanFrom: '08/01/2015',
                        LoanTo: '08/01/2019',
                        Version: '08/08/2015',
                        Disbursements: [{
                            CertificationDisbursementTemplateId: '1',
                            CertificationTemplateId: '1',
                            DisbursementNumber: '1',
                            AmountPercentage: '0.5',
                            HoldReleaseFlag: 'Hold',
                            DisbursementDate: '08/15/2015',
                            Version: '08/08/2015'
                        }]

                },
                SuccessMessage: ''

            });

            var formTemplateData = {
                CertificationTemplateId: '0',
                Name: 'Sophomore 2015',
                AnticipatedGraduationDate: '05/09/2019',
                EnrollmentStatusId: '1',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Version: '08/08/2015',
                Disbursements: [{
                    CertificationDisbursementTemplateId: '1',
                    CertificationTemplateId: '1',
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015',
                    Version: '08/08/2015'
                }]

            };

            //get the certification templates and update with the form data.
            certificationTemplateService.getCertificationTemplates();
            certificationTemplateService.updateCertificationTemplate(formTemplateData);

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            //expect that the data was changed when updated.
            expect(certificationTemplateService.certificationTemplates.Data.CertificationTemplates[0]).toEqual({
                CertificationTemplateId: '0',
                Name: 'Sophomore 2015',
                AnticipatedGraduationDate: '05/09/2019',
                EnrollmentStatusId: '1',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Version: '08/08/2015',
                Disbursements: [{
                    CertificationDisbursementTemplateId: '1',
                    CertificationTemplateId: '1',
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015',
                    Version: '08/08/2015'
                }]
            });

        });

        it('should not update the template list if an error comes back', function () {

            $httpBackend.expectGET(settings.apiDomain + settings.apiPort + '/api/certificationtemplate').respond({
                Errors: [],
                Data: {
                    CertificationTemplates: [{
                        CertificationTemplateId: '0',
                        Name: 'Freshman 2015',
                        AnticipatedGraduationDate: '05/09/2019',
                        EnrollmentStatusId: '1',
                        GradeLevelId: '1',
                        LoanFrom: '08/01/2015',
                        LoanTo: '08/01/2019',
                        Version: '08/08/2015',
                        Disbursements: [{
                            CertificationDisbursementTemplateId: '1',
                            CertificationTemplateId: '1',
                            DisbursementNumber: '1',
                            AmountPercentage: '0.5',
                            HoldReleaseFlag: 'Hold',
                            DisbursementDate: '08/15/2015',
                            Version: '08/08/2015'
                        }]
                    }]
                },
                SuccessMessage: ''
            });

            $httpBackend.expectPUT(settings.apiDomain + settings.apiPort + '/api/certificationtemplate', {

                CertificationTemplateId: '0',
                Name: 'Sophomore 2015',
                AnticipatedGraduationDate: '06/09/2019',
                EnrollmentStatusId: '2',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Version: '08/08/2015',
                Disbursements: [{
                    CertificationDisbursementTemplateId: '1',
                    CertificationTemplateId: '1',
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015',
                    Version: '08/08/2015'
                }]

            }).respond({
                Errors: ['Template name must be unique.'],
                Data: {},
                SuccessMessage: ''

            });

            var formTemplateData = {
                CertificationTemplateId: '0',
                Name: 'Sophomore 2015',
                AnticipatedGraduationDate: '06/09/2019',
                EnrollmentStatusId: '2',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Version: '08/08/2015',
                Disbursements: [{
                    CertificationDisbursementTemplateId: '1',
                    CertificationTemplateId: '1',
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015',
                    Version: '08/08/2015'
                }]

            };

            //get the certification templates and update with the form data.
            certificationTemplateService.getCertificationTemplates();
            certificationTemplateService.updateCertificationTemplate(formTemplateData);

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            //expect that the data was not changed attempted update.
            expect(certificationTemplateService.certificationTemplates.Data.CertificationTemplates[0]).toEqual({
                CertificationTemplateId: '0',
                Name: 'Freshman 2015',
                AnticipatedGraduationDate: '05/09/2019',
                EnrollmentStatusId: '1',
                GradeLevelId: '1',
                LoanFrom: '08/01/2015',
                LoanTo: '08/01/2019',
                Version: '08/08/2015',
                Disbursements: [{
                    CertificationDisbursementTemplateId: '1',
                    CertificationTemplateId: '1',
                    DisbursementNumber: '1',
                    AmountPercentage: '0.5',
                    HoldReleaseFlag: 'Hold',
                    DisbursementDate: '08/15/2015',
                    Version: '08/08/2015'
                }]
            });

        });

    });



    describe('> apply template tracking', function () {

        it('should send a request to the API when a template is applied', function () {

            $httpBackend.expectPOST(settings.apiDomain + settings.apiPort + '/api/certificationtemplate/trackapply/1').respond(true);

            certificationTemplateService.trackApply({
                CertificationTemplateId: 1
            });

            $httpBackend.flush();

            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

        });

    });

    describe('> apply template method', function () {

        it('should update the grade level', function () {

            var loan = {
                gradeLevelId: 1
            };

            var template = {
                GradeLevelId: 3
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.gradeLevelId).toEqual(3);

        });

        it('should update the enrollment status', function () {

            var loan = {
                enrollmentStatusId: 1
            };

            var template = {
                EnrollmentStatusId: 2
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.enrollmentStatusId).toEqual(2);

        });

        it('should update the anticipated graduation date', function () {

            var loan = {
                anticipatedGraduationDate: 01012015
            };

            var template = {
                AnticipatedGraduationDate: '2017-12-31T00:00:00'
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.anticipatedGraduationDate).toEqual('12312017');

        });

        it('should update the loan from and loan to dates', function () {

            var loan = {
                loanFrom: '01012015',
                loanTo: '01012016'
            };

            var template = {
                LoanFrom: '2015-12-31T00:00:00',
                LoanTo: '2016-12-31T00:00:00'
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.loanFrom).toEqual('12312015');
            expect(loan.loanTo).toEqual('12312016');

        });

        it('should update the disbursements', function () {

            var loan = {
                canEdit: true,
                certifiedAmount: 1000,
                disbursements: [
                    {
                        amount: '',
                        date: '',
                        holdReleaseFlag: ''
                    }
                ]
            };

            var template = {
                Disbursements: [
                    {
                        AmountPercentage: 20,
                        DisbursementDate: "2015-06-01T00:00:00",
                        DisbursementNumber: 1,
                        HoldReleaseFlag: "H"
                    },
                    {
                        AmountPercentage: 30,
                        DisbursementDate: "2015-12-01T00:00:00",
                        DisbursementNumber: 2,
                        HoldReleaseFlag: "R"
                    },
                    {
                        AmountPercentage: 35,
                        DisbursementDate: "2016-06-01T00:00:00",
                        DisbursementNumber: 3,
                        HoldReleaseFlag: "H"
                    },
                    {
                        AmountPercentage: 15,
                        DisbursementDate: "2016-12-01T00:00:00",
                        DisbursementNumber: 4,
                        HoldReleaseFlag: "R"
                    }
                ]
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.disbursements).toEqual([
                    {
                        amount: 200,
                        date: "06012015",
                        holdReleaseFlag: "H"
                    },
                    {
                        amount: 300,
                        date: "12012015",
                        holdReleaseFlag: "R"
                    },
                    {
                        amount: 350,
                        date: "06012016",
                        holdReleaseFlag: "H"
                    },
                    {
                        amount: 150,
                        date: "12012016",
                        holdReleaseFlag: "R"
                    }
            ]);

            loan = {
                canEdit: true,
                certifiedAmount: 1002,
                disbursements: [
                    {
                        amount: '',
                        date: '',
                        holdReleaseFlag: ''
                    }
                ]
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.disbursements).toEqual([
                    {
                        amount: 202,
                        date: "06012015",
                        holdReleaseFlag: "H"
                    },
                    {
                        amount: 300,
                        date: "12012015",
                        holdReleaseFlag: "R"
                    },
                    {
                        amount: 350,
                        date: "06012016",
                        holdReleaseFlag: "H"
                    },
                    {
                        amount: 150,
                        date: "12012016",
                        holdReleaseFlag: "R"
                    }
            ]);

            loan = {
                canEdit: true,
                certifiedAmount: 1003,
                disbursements: [
                    {
                        amount: '',
                        date: '',
                        holdReleaseFlag: ''
                    }
                ]
            };

            certificationTemplateService.applyCertificationTemplate(loan, template);

            expect(loan.disbursements).toEqual([
                    {
                        amount: 202,
                        date: "06012015",
                        holdReleaseFlag: "H"
                    },
                    {
                        amount: 300,
                        date: "12012015",
                        holdReleaseFlag: "R"
                    },
                    {
                        amount: 351,
                        date: "06012016",
                        holdReleaseFlag: "H"
                    },
                    {
                        amount: 150,
                        date: "12012016",
                        holdReleaseFlag: "R"
                    }
            ]);

        });

    });

});

