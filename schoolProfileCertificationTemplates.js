/*jslint es5: true */
/*jshint es5: true */
angular.module('main.schoolProfile.certificationTemplates', [
    'certificationTemplateService'
])

.config(function config($stateProvider) {

    $stateProvider.state('main.schoolProfile.certificationTemplates', {
        parent: 'main',
        url: 'schoolprofile/certificationtemplates',
        views: {
            'article': {
                templateUrl: 'schoolProfile/certificationTemplates/schoolProfileCertificationTemplates.article.tpl.html',
                controller: 'SchoolProfileCertificationTemplatesArticleCtrl'
            },
            'aside': {
                templateUrl: 'schoolProfile/schoolProfile.aside.tpl.html',
                controller: 'SchoolProfileAsideCtrl'
            },
            'detail@main.schoolProfile.certificationTemplates': {
                templateUrl: 'schoolProfile/certificationTemplates/schoolProfileCertificationTemplates.article.detail.tpl.html',
                controller: 'SchoolProfileCertificationTemplatesArticleDetailCtrl'
            },
            'list@main.schoolProfile.certificationTemplates': {
                templateUrl: 'schoolProfile/certificationTemplates/schoolProfileCertificationTemplates.article.list.tpl.html',
                controller: 'SchoolProfileCertificationTemplatesArticleListCtrl'
            },
        },
        params: {
            certificationTemplate: ''
        },
        stateType: 'schoolProfile'
    });

})

.controller('SchoolProfileCertificationTemplatesArticleCtrl', function ($filter, $modal, $scope, $state, certificationTemplateService) {

    $scope.certificationTemplateService = certificationTemplateService;

    $scope.maxTemplateCount = angular.fromJson(sessionStorage.session).MaxCertificationTemplateCount;

    //Pass in certification templates into show detail.
    //$scope.showDetail = function (certificationTemplates) - this name comes from the template and passes into this function.  If no values, then it opens a new template. 

    $scope.rmhOverride = function () {
        return $scope.certificationTemplateDetailFormData ? 160 : false;
    };

    $scope.showDetail = function (certificationTemplate) {

        if (certificationTemplate && certificationTemplate.CertificationTemplateId) {

            $scope.certificationTemplateDetailFormData = {
                certificationTemplateId: certificationTemplate.CertificationTemplateId,
                name: certificationTemplate.Name,
                nameCopy: certificationTemplate.Name,
                anticipatedGraduationDate: $filter('date')(certificationTemplate.AnticipatedGraduationDate, 'MMddyyyy'),
                enrollmentStatusId: certificationTemplate.EnrollmentStatusId,
                gradeLevelId: certificationTemplate.GradeLevelId,
                loanFrom: $filter('date')(certificationTemplate.LoanFrom, 'MMddyyyy'),
                loanTo: $filter('date')(certificationTemplate.LoanTo, 'MMddyyyy'),
                version: certificationTemplate.Version,
                disbursements: [
                    {
                        certificationDisbursementTemplateId: certificationTemplate.Disbursements[0] ? certificationTemplate.Disbursements[0].CertificationDisbursementTemplateId : '',
                        certificationTemplateId: certificationTemplate.Disbursements[0] ? certificationTemplate.Disbursements[0].CertificationTemplateId : '',
                        disbursementNumber: certificationTemplate.Disbursements[0] ? certificationTemplate.Disbursements[0].DisbursementNumber : '1',
                        amountPercentage: certificationTemplate.Disbursements[0] ? certificationTemplate.Disbursements[0].AmountPercentage : '',
                        holdReleaseFlag: certificationTemplate.Disbursements[0] ? certificationTemplate.Disbursements[0].HoldReleaseFlag : '',
                        disbursementDate: certificationTemplate.Disbursements[0] ? $filter('date')(certificationTemplate.Disbursements[0].DisbursementDate, 'MMddyyyy') : '',
                        version: certificationTemplate.Disbursements[0] ? certificationTemplate.Disbursements[0].Version : ''
                    },
                    {
                        certificationDisbursementTemplateId: certificationTemplate.Disbursements[1] ? certificationTemplate.Disbursements[1].CertificationDisbursementTemplateId : '',
                        certificationTemplateId: certificationTemplate.Disbursements[1] ? certificationTemplate.Disbursements[1].CertificationTemplateId : '',
                        disbursementNumber: certificationTemplate.Disbursements[1] ? certificationTemplate.Disbursements[1].DisbursementNumber : '2',
                        amountPercentage: certificationTemplate.Disbursements[1] ? certificationTemplate.Disbursements[1].AmountPercentage : '',
                        holdReleaseFlag: certificationTemplate.Disbursements[1] ? certificationTemplate.Disbursements[1].HoldReleaseFlag : '',
                        disbursementDate: certificationTemplate.Disbursements[1] ? $filter('date')(certificationTemplate.Disbursements[1].DisbursementDate, 'MMddyyyy') : '',
                        version: certificationTemplate.Disbursements[1] ? certificationTemplate.Disbursements[1].Version : ''
                    },
                    {
                        certificationDisbursementTemplateId: certificationTemplate.Disbursements[2] ? certificationTemplate.Disbursements[2].CertificationDisbursementTemplateId : '',
                        certificationTemplateId: certificationTemplate.Disbursements[2] ? certificationTemplate.Disbursements[2].CertificationTemplateId : '',
                        disbursementNumber: certificationTemplate.Disbursements[2] ? certificationTemplate.Disbursements[2].DisbursementNumber : '3',
                        amountPercentage: certificationTemplate.Disbursements[2] ? certificationTemplate.Disbursements[2].AmountPercentage : '',
                        holdReleaseFlag: certificationTemplate.Disbursements[2] ? certificationTemplate.Disbursements[2].HoldReleaseFlag : '',
                        disbursementDate: certificationTemplate.Disbursements[2] ? $filter('date')(certificationTemplate.Disbursements[2].DisbursementDate, 'MMddyyyy') : '',
                        version: certificationTemplate.Disbursements[2] ? certificationTemplate.Disbursements[2].Version : ''
                    },
                    {
                        certificationDisbursementTemplateId: certificationTemplate.Disbursements[3] ? certificationTemplate.Disbursements[3].CertificationDisbursementTemplateId : '',
                        certificationTemplateId: certificationTemplate.Disbursements[3] ? certificationTemplate.Disbursements[3].CertificationTemplateId : '',
                        disbursementNumber: certificationTemplate.Disbursements[3] ? certificationTemplate.Disbursements[3].DisbursementNumber : '4',
                        amountPercentage: certificationTemplate.Disbursements[3] ? certificationTemplate.Disbursements[3].AmountPercentage : '',
                        holdReleaseFlag: certificationTemplate.Disbursements[3] ? certificationTemplate.Disbursements[3].HoldReleaseFlag : '',
                        disbursementDate: certificationTemplate.Disbursements[3] ? $filter('date')(certificationTemplate.Disbursements[3].DisbursementDate, 'MMddyyyy') : '',
                        version: certificationTemplate.Disbursements[3] ? certificationTemplate.Disbursements[3].Version : ''
                    }
                ]
            };

        } else if (certificationTemplateService.certificationTemplates.Data.CertificationTemplates.length < $scope.maxTemplateCount && certificationTemplateService.certificationTemplates.$promise.$$state.status > 0) {

            $scope.certificationTemplateDetailFormData = {
                name: '',
                nameCopy: '',
                anticipatedGraduationDate: '',
                enrolllmentStatusId: '',
                gradeLevelId: '',
                loanFrom: '',
                loanTo: '',
                disbursements: [
                    {
                        disbursementNumber: '1',
                        amountPercentage: '',
                        holdReleaseFlag: '',
                        disbursementDate: ''
                    },
                    {
                        disbursementNumber: '2',
                        amountPercentage: '',
                        holdReleaseFlag: '',
                        disbursementDate: ''
                    },
                    {
                        disbursementNumber: '3',
                        amountPercentage: '',
                        holdReleaseFlag: '',
                        disbursementDate: ''
                    },
                    {
                        disbursementNumber: '4',
                        amountPercentage: '',
                        holdReleaseFlag: '',
                        disbursementDate: ''
                    }
                ]
            };

        }

    };

    // Get certification templates if they haven't already been requested
    if (!certificationTemplateService.certificationTemplates.$resolved) {
        certificationTemplateService.getCertificationTemplates();
    }

    if ($state.params.certificationTemplate) {
        $scope.showDetail($state.params.certificationTemplate);
    }

})

.controller('SchoolProfileCertificationTemplatesArticleDetailCtrl', function ($scope, $state, certificationTemplateService, referenceDataService) {

    var allowNavigate = false;
    var loadingModalInstance;

    // Create and Update: Expose services to view
    $scope.certificationTemplateService = certificationTemplateService;
    $scope.enrollmentStatuses = referenceDataService.globalReferenceDataResults.enrollmentStatuses;
    $scope.gradeLevelCodes = referenceDataService.globalReferenceDataResults.gradeLevelCodesSortable;

    $scope.closeDetail = function () {

        var clearDetails = function () {
            $scope.$parent.certificationTemplateDetailFormData = undefined;
            $scope.certificationTemplateDetailForm.$setPristine();
        };

        if ($scope.certificationTemplateDetailForm.$dirty) {
            $scope.openConfirmModal(
            clearDetails,
            'Are you sure you want to close this template without saving your changes?',
            'Yes',
            'No'
        );
        } else {
            clearDetails();
        }

    };

    // Create Scope method

    // Save and Update Scope method
    $scope.saveCertificationTemplate = function () {

        if ($scope.$parent.certificationTemplateDetailFormData.certificationTemplateId) {

            // Send update request
            certificationTemplateService.updateCertificationTemplate($scope.$parent.certificationTemplateDetailFormData);

            // Open loading modal
            loadingModalInstance = $scope.openLoadingResourceModal(certificationTemplateService.updateCertificationTemplatePromise);

            // Set form to pristine if update was successful
            certificationTemplateService.updateCertificationTemplatePromise.$promise.then(function (response) {
                if (response.Errors.length < 1) {
                    //load response data back in from the API after successful update/save
                    $scope.showDetail(response.Data);
                    $scope.certificationTemplateDetailForm.$setPristine();
                }
            });

         } else {

            // Send create request
            certificationTemplateService.createCertificationTemplate($scope.$parent.certificationTemplateDetailFormData);

            // Open loading modal
            certificationTemplateService.createCertificationTemplatePromise.$promise.then(function (response) {
                if (response.Errors.length < 1) {
                    //load response data back in from the API after successful update/save
                    $scope.showDetail(response.Data);
                    $scope.certificationTemplateDetailForm.$setPristine();
                }
            });

            // Set form to pristine if create was successful
            loadingModalInstance = $scope.openLoadingResourceModal(certificationTemplateService.createCertificationTemplatePromise);
         }

    };

    // Confirm navigation after form values have been modified
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        if (!allowNavigate && $scope.certificationTemplateDetailForm.$dirty) {

            // Prevent navigation
            event.preventDefault();

            // Take this action if user clicks 'Yes' in confirm modal
            var navigate = function () {
                allowNavigate = true;
                $state.go(toState.name, toParams);
            };

            // Open confirm modal
            $scope.openConfirmModal(
                navigate,
                'Are you sure you want to close this template without saving your changes?',
                'Yes',
                'No'
            );
        }

    });

})

.controller('SchoolProfileCertificationTemplatesArticleListCtrl', function ($filter, $scope, certificationTemplateService, referenceDataService) {

    $scope.certificationTemplateService = certificationTemplateService;
    $scope.enrollmentStatuses = referenceDataService.globalReferenceDataResults.enrollmentStatuses;
    $scope.gradeLevelCodes = referenceDataService.globalReferenceDataResults.gradeLevelCodes;

    $scope.setAllCheckboxes = function () {
        $scope.checkAllBox = !$scope.checkAllBox;
        angular.forEach(certificationTemplateService.certificationTemplates.Data.CertificationTemplates, function (certificationTemplate) {
            certificationTemplate.checked = $scope.checkAllBox;
        });
    };

    $scope.deleteCertificationTemplates = function () {

        var certificationTemplatesToBeDeleted = $filter('filter')(certificationTemplateService.certificationTemplates.Data.CertificationTemplates, { checked: true }, true);

        if (certificationTemplatesToBeDeleted.length) {
            $scope.openConfirmModal(
                function () {

                    certificationTemplateService.deleteCertificationTemplates(certificationTemplatesToBeDeleted);
                    $scope.openLoadingResourceModal(certificationTemplateService.deleteCertificationTemplatePromise);

                    // Close the detail form if the template was deleted
                    certificationTemplateService.deleteCertificationTemplatePromise.$promise.then(function () {
                        
                        if ($filter('filter')(certificationTemplatesToBeDeleted, { CertificationTemplateId: $scope.certificationTemplateDetailFormData.certificationTemplateId }, true).length) {
                            $scope.$parent.certificationTemplateDetailFormData = undefined;
                        }
                    });

                },
                'Are you sure you want to permanently delete the selected templates?',
                'Yes',
                'No'
            );
        }

    };

    $scope.$watch(function () { return certificationTemplateService.certificationTemplates; }, function (newValue) {

        if (newValue.Data) {
            // Show a popover indicating that a maximum of 20 templates has been reached.
            $scope.addIconPopoverText = newValue.Data.CertificationTemplates.length < $scope.$parent.maxTemplateCount ? '' : 'Maximum of 20 templates has been reached';
        }

    }, true);

})

;