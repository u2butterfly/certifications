/*jslint es5: true */
/*jshint es5: true */
angular.module('certificationTemplateService', [
        'ngResource'
])

.service('certificationTemplateService', function ($filter, $interval, $resource, settings) {

    var certificationTemplatesResource = $resource(settings.apiDomain + ':port/api/certificationtemplate/:id', { port: settings.apiPort }, { update: { method: 'PUT' } });
    var certificationTemplatesTrackingResource = $resource(settings.apiDomain + ':port/api/certificationtemplate/trackapply/:certificationTemplateId', { port: settings.apiPort });
    var addSlashesToDateStrings = function (originalDate) {
        return originalDate ? originalDate.replace(/(\d\d)(\d\d)(\d\d\d\d)/, '$1/$2/$3') : originalDate;
    };

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

    // Apply certification template
    var applyCertificationTemplate = function (loan, certificationTemplate) {

        var addDisbursement = function () {
            if (loan.canEdit && loan.disbursements.length < 4) {

                var newDisbursement = {};

                // Set the default value of the hold/release flag
                newDisbursement.holdReleaseFlag = loan.schoolHoldReleaseFlag;

                // Append the new disbursement to the list
                loan.disbursements.push(newDisbursement);

            }
        };

        // Replace existing values only if the template has a value for the corresponding property
        loan.gradeLevelId = certificationTemplate.GradeLevelId || loan.gradeLevelId;
        loan.enrollmentStatusId = certificationTemplate.EnrollmentStatusId || loan.enrollmentStatusId;
        loan.anticipatedGraduationDate = $filter('date')(certificationTemplate.AnticipatedGraduationDate, 'MMddyyyy') || loan.anticipatedGraduationDate;
        loan.loanFrom = $filter('date')(certificationTemplate.LoanFrom, 'MMddyyyy') || loan.loanFrom;
        loan.loanTo = $filter('date')(certificationTemplate.LoanTo, 'MMddyyyy') || loan.loanTo;

        angular.forEach(certificationTemplate.Disbursements, function (disbursement) {

            // Create the disbursement before trying to apply the template to it
            while (loan.canEdit && !loan.disbursements[disbursement.DisbursementNumber - 1]) {
                addDisbursement();
            }

            // Apply template values to the disbursement
            loan.disbursements[disbursement.DisbursementNumber - 1].date = $filter('date')(disbursement.DisbursementDate, 'MMddyyyy') || loan.disbursements[disbursement.DisbursementNumber - 1].date;
            loan.disbursements[disbursement.DisbursementNumber - 1].amount = Math.floor(disbursement.AmountPercentage / 100 * loan.certifiedAmount) || loan.disbursements[disbursement.DisbursementNumber - 1].amount;
            loan.disbursements[disbursement.DisbursementNumber - 1].holdReleaseFlag = disbursement.HoldReleaseFlag || loan.disbursements[disbursement.DisbursementNumber - 1].holdReleaseFlag;

        });

        // Correct for rounding errors after applying template to disbursement amounts
        var sumOfDisbursementAmounts = 0;
        var sumOfDisbursementAmountPercentages = 0;

        angular.forEach(loan.disbursements, function (disbursement) {
            sumOfDisbursementAmounts += disbursement.amount || 0;
        });

        angular.forEach(certificationTemplate.Disbursements, function (disbursement) {
            sumOfDisbursementAmountPercentages += disbursement.AmountPercentage || 0;
        });

        if (loan.certifiedAmount && sumOfDisbursementAmounts !== (sumOfDisbursementAmountPercentages / 100 * loan.certifiedAmount)) {
            if (loan.disbursements[0].amount) {
                loan.disbursements[0].amount += Math.floor(sumOfDisbursementAmountPercentages / 100 * loan.certifiedAmount) - sumOfDisbursementAmounts;
            } else if (loan.disbursements[1].amount) {
                loan.disbursements[1].amount += Math.floor(sumOfDisbursementAmountPercentages / 100 * loan.certifiedAmount) - sumOfDisbursementAmounts;
            } else if (loan.disbursements[2].amount) {
                loan.disbursements[2].amount += Math.floor(sumOfDisbursementAmountPercentages / 100 * loan.certifiedAmount) - sumOfDisbursementAmounts;
            } else if (loan.disbursements[3].amount) {
                loan.disbursements[3].amount += Math.floor(sumOfDisbursementAmountPercentages / 100 * loan.certifiedAmount) - sumOfDisbursementAmounts;
            }
        }

        // Track apply template
        trackApply(certificationTemplate);

    };

    // Get certification templates
    var certificationTemplates = {};
    var getCertificationTemplates = function () {
        certificationTemplates = certificationTemplatesResource.get();
        certificationTemplates.$promise.finally(function () {
            resetMinutesSinceUpdate();
        });
    };

    // Create certification templates
    var createCertificationTemplatePromise = {};

    var createCertificationTemplate = function (postData) {

        postData.loanFrom = addSlashesToDateStrings(postData.loanFrom);
        postData.loanTo = addSlashesToDateStrings(postData.loanTo);
        postData.anticipatedGraduationDate = addSlashesToDateStrings(postData.anticipatedGraduationDate);

        angular.forEach(postData.disbursements, function (disbursement, index) {
            disbursement.disbursementDate = addSlashesToDateStrings(disbursement.disbursementDate);
        });

        createCertificationTemplatePromise = certificationTemplatesResource.save(postData);

        //This function will show the saved template in the list after it has been saved.
        createCertificationTemplatePromise.$promise.then(
        function (response) {
            if (response.Errors.length < 1) {
                certificationTemplates.Data.CertificationTemplates.push(response.Data);
            }
        });
    };

    //Delete certification templates
    var deleteCertificationTemplatePromise = {};

    var deleteCertificationTemplates = function (certificationTemplatesToBeDeleted) {
        angular.forEach(certificationTemplatesToBeDeleted, function(certificationTemplate) {

            deleteCertificationTemplatePromise = certificationTemplatesResource.remove({ id: certificationTemplate.CertificationTemplateId });

            deleteCertificationTemplatePromise.$promise.then(
            function () {
                certificationTemplates.Data.CertificationTemplates.splice(certificationTemplates.Data.CertificationTemplates.indexOf(certificationTemplate), 1);
            });

        });
    };

    // Track when a user applies a certification template
    var trackApply = function (certificationTemplate) {
        certificationTemplatesTrackingResource.save({
            certificationTemplateId: certificationTemplate.CertificationTemplateId
        }, {});
    };

    // Update certification templates
    var updateCertificationTemplatePromise = {};

    var updateCertificationTemplate = function (putData) {

        putData.loanFrom = addSlashesToDateStrings(putData.loanFrom);
        putData.loanTo = addSlashesToDateStrings(putData.loanTo);
        putData.anticipatedGraduationDate = addSlashesToDateStrings(putData.anticipatedGraduationDate);

        angular.forEach(putData.disbursements, function (disbursement) {
            disbursement.disbursementDate = addSlashesToDateStrings(disbursement.disbursementDate);
        });

        updateCertificationTemplatePromise = certificationTemplatesResource.update({ id: putData.certificationTemplateId }, putData);

        updateCertificationTemplatePromise.$promise.then(
        function (response) {

            if (response.Errors.length < 1) {

                var certificationTemplateToBeRemoved = $filter('filter')(certificationTemplates.Data.CertificationTemplates, { CertificationTemplateId: putData.certificationTemplateId }, true);

                certificationTemplates.Data.CertificationTemplates.splice(certificationTemplates.Data.CertificationTemplates.indexOf(certificationTemplateToBeRemoved[0]), 1);
                certificationTemplates.Data.CertificationTemplates.push(response.Data);

            }

        });
    };
  
    // Expose data and method (getters)
    return {
        applyCertificationTemplate: applyCertificationTemplate,
        createCertificationTemplate: createCertificationTemplate,
        deleteCertificationTemplates: deleteCertificationTemplates,
        trackApply: trackApply,
        updateCertificationTemplate: updateCertificationTemplate,
        getCertificationTemplates: getCertificationTemplates,
        get certificationTemplates() { return certificationTemplates; },
        get createCertificationTemplatePromise() { return createCertificationTemplatePromise; },
        get deleteCertificationTemplatePromise() { return deleteCertificationTemplatePromise; },
        get minutesSinceUpdate() { return minutesSinceUpdate; },
        get updateCertificationTemplatePromise() { return updateCertificationTemplatePromise; }
    };

})

;