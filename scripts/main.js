/**
 * @overview A collection of functions to aid in validating inputs conjointly with the HTML5 validation API. For each element listened to in `setupValidationListeners()` there should be corresponding html attributes (e.g. pattern, required) within the elements tag so that the `validationHandler()` can run correctly.
 *
 * In order for this to work the HTML input needs to be structured so that the conditional errors appear after the form input in the markup, e.g.:
 *
 * <label for="form-field__input--title">
 *
 *     <input class="form-field__input--title" type="text">
 *
 *     <span class="form-field__validation form-field__validation--invalid">
 *
 *     <span class="form-field__validation form-field__validation--valid">
 *
 *     <span class="form-field__validation form-field__validation--valueMissing">
 *
 * </label>
 *
 */

/**
 * Remove any existing validation classes from an input element
 * @param {Element} inputElement - The input element to check for validation classes
 * @returns {void}
 */
function removeValidationClasses(inputElement) {

    inputElement.classList.contains('valueMissing') ? inputElement.classList.remove('valueMissing') : '';
    inputElement.classList.contains('valid') ? inputElement.classList.remove('valid') : '';
    inputElement.classList.contains('invalid') ? inputElement.classList.remove('invalid') : '';

}

/**
 * Determine whether an input element has the required attribute
 * @param {HTMLInputElement} inputElement - THe input element to check for the required attribute
 * @returns {Boolean} - True if the inputElement has the required attribute, else false.
 */
function inputElementRequired(inputElement) {

    return inputElement.required;

}

/**
 * Determine whether an input element has any value
 * @param {HTMLInputElement} inputElement - The input element to check for a value
 * @returns {Boolean} - True if the inputElement does not have a value.
 */
function inputElementEmpty(inputElement) {

    return inputElement.value === '';

}

/**
 * A handler to determine the validity of an input and apply a css class to the element based on the validity.
 * @param {object} e - The default event object.
 * @returns {void}
 */
function validationHandler(e) {

    var inputElement = e.target;
    removeValidationClasses(inputElement);

    // do not validate an unrequired empty input
    if (!inputElementRequired(inputElement) && inputElementEmpty(inputElement)) {

        return;

    }

    // return early if there is a value missing
    if (inputElement.validity.valueMissing) {

        inputElement.classList.add('invalid');
        return;

    }

    inputElement.validity.valid ?
        inputElement.classList.add('valid')
        :
        inputElement.classList.add('invalid');

}

/**
 * Add validation listeners for an input element to be fired on input, blur, and invalid events.
 * @param {Element} formInput - A DOM node for a form input that should be validated
 * @returns {void}
 */
function addValidationListeners(formInput) {

    if (!formInput) {

        console.log('no form input for ' + formInput.attributes.id);
        return;

    }

    formInput.addEventListener('input', validationHandler);
    formInput.addEventListener('blur', validationHandler);
    formInput.addEventListener('invalid', validationHandler);

}


/**
 * Set up validation listeners on any input elements to validate
 * @returns {void}
 */
function setupValidationListeners() {

    var formInputs = document.querySelectorAll('.form-field__input');
    formInputs.forEach(function(formInput) {

       addValidationListeners(formInput);

    });

}

window.addEventListener('DOMContentLoaded', function () {

    setupValidationListeners();

});
