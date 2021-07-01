document.addEventListener("DOMContentLoaded", function ()
{
     let fieldFormDiv = document.querySelectorAll(".form__input, .form__select, .form__textarea");
     const formContact = document.getElementById("contact-form");
     const submitButton = document.getElementById("form-btn")
     const form = document.querySelector("form");
     const successAlert = document.getElementById("SuccessAlert");
     const errorAlert = document.getElementById("ErrorAlert");
     const linearActivity = document.getElementById("linear-activity")
     const ERROR_MESSAGE =
     {
          "SIGNATURE_IS_BAD": "Token signature is bad",
          "GDS_NOT_FOUND": "Accounts not found",
          "VALIDATION_REQUIRED": "This field is required",
          "AUTH_VALIDATION_LOGIN": "",
          "AUTH_VALIDATION_NAME": "",
          "AUTH_VALIDATION_PASSWORD": "",
          "AUTH_VALIDATION_EMAIL": "",
          "AUTH_VALIDATION_CONTACTS": "",
          "SIGN_UP_USERNAME_ALREADY_EXISTS": "",
          "LOGIN_COULDNT_FOUND_USER": "",
          "LOGIN_UNCORRECT_PASSWORD_OR_LOGIN": "",
          "AUTH_UNAUTHORIZED": "Unauthorized",
          "NEWS_TO_UPDATE_NOT_FOUND": "",
          "GDS_STATUS_INVALID": "",
          "GDS_WITH_ID_NOT_FOUND": "",
          "GDS_CATEGORY_INVALID": "",
          "GDS_TAG_INVALID": "",
          "NEWS_NOT_FOUND": "No article found for the specified category",
          "NEWS_GDS_STATUS_INVALID": "",
          "NEWS_WITH_ID_NOT_FOUND": "",
          "NEWS_CATEGORY_INVALID": "Post category invalid",
          "VALIDATION_PROMOCODE_NAME": "",
          "PROMOCODE_WITH_ID_NOT_FOUND": "",
          "PROMOCODE_TO_UPDATE_NOT_FOUND": "",
          "PROMOCODE_LIST_IS_EMPTY": "",
          "PROMOCODE_WITH_NAME_NOT_FOUND": "",
          "PROMOCODE_NAME_ALREADY_EXISTS": "",
          "PURCHASE_VALIDATION_NAME": "",
          "PURCHASE_VALIDATION_CONTACTS": "",
          "PURCHASE_VALIDATION_NOTES": "",
          "PURCHASE_VALIDATION_PROMOCODE": "",
          "PURCHASE_WITH_ID_NOT_FOUND": "",
          "PURCHASE_TO_UPDATE_NOT_FOUND": "",
          "PURCHASE_CUSTOMER_LIST_IS_EMPTY": "",
          "PROMOCODE_VALIDATION_NAME": "",
          "MAIL_SEND_SERVER_ERROR": "Mail send error",
          "MAIL_SEND_SUCCESS": "Mail send success"
     }
     const nameRegex = /(^[A-Z]{1}[a-z]{1,26}( [A-Z]{1})?([a-z]{1,14})?( [A-Z]{1})?([a-z]{1,14})?( )?$)|(^[А-Я]{1}[а-я]{1,27}( [А-Я]{1})?([а-я]{1,14})?( [А-Я]{1})?([а-я]{1,14})?$)/
     const emailRegex = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/
     const selectRegex = /^[1-9]$/

     const validationObject = {
          name: {
               validationStatus: false,
               errorMessage: "Please enter your correct name"
          },
          email: {
               validationStatus: false,
               errorMessage: "Please enter your correct email"
          },
          select: {
               validationStatus: false,
               errorMessage: "Please choose the one you need"
          }
     }


     function removeAttribute()
     {

          let isFormInvalid = Boolean(Object.values(validationObject).find(el => !el.validationStatus))

          if (isFormInvalid) {
               submitButton.disabled = true;
          } else {
               submitButton.disabled = false;
          }
     }


     formContact.addEventListener('submit', function (event)
     {
          event.preventDefault();
          removeAttribute()

          //=========== POST REQUEST
          const body = new FormData(form);
          const requestURL = '/contact'
          const headers = {
               'Content-Type': 'application/json'
          }

          function sendRequest(method, url, body = null)
          {
               linearActivity.style.display = "block";
               return fetch(url, {
                    method: method,
                    body: JSON.stringify(body),
                    headers: headers
               })
                    .then(response =>
                    {
                         if (response.ok) {
                              form.reset();
                              successAlert.style.display = "block";
                              linearActivity.style.display = "none";
                              return response.json()
                         }

                         return response.json().then(error =>
                         {
                              linearActivity.style.display = "none";
                              errorAlert.style.display = "block";
                         })
                    })
          }

          sendRequest('POST', requestURL, body)
               .then(data => console.log(data))
               .catch(err => console.log(err))

     })


     function formValidate() 
     {

          for (let field of fieldFormDiv) {

               field.addEventListener('blur', function ()
               {
                    //=========== CHECK VALIDATIONS 

                    let check = false
                    let attrName = this.name
                    let valueText = this.value;

                    const attentionName = document.getElementById("attention-name")
                    const attentionEmail = document.getElementById("attention-email")
                    const attentionSelect = document.getElementById("attention-select")

                    switch (attrName) {
                         case 'name':
                              removeAttribute()
                              validationObject.name.validationStatus = nameRegex.test(valueText.trim())
                              check = validationObject.name.validationStatus
                              if (!valueText) {
                                   check = false
                              } else if (!check) {
                                   attentionName.innerHTML = validationObject.name.errorMessage
                              }
                              break;
                         case 'email':
                              removeAttribute()
                              validationObject.email.validationStatus = emailRegex.test(valueText.trim())
                              check = validationObject.email.validationStatus
                              if (!valueText) {
                                   check = false
                              } else if (!check) {
                                   attentionEmail.innerHTML = validationObject.email.errorMessage
                              }
                              break;
                         case 'select':
                              removeAttribute()
                              validationObject.select.validationStatus = selectRegex.test(valueText.trim())
                              check = validationObject.select.validationStatus
                              if (!check) {
                                   attentionSelect.innerHTML = validationObject.select.errorMessage;
                              }
                              break;
                         case 'messages':
                              check = true
                              break;
                    }
                    this.parentNode.classList.remove("success")
                    this.parentNode.classList.remove("error")

                    if (check) {
                         this.parentNode.classList.add("success")
                    } else {
                         this.parentNode.classList.add("error")
                    }
               })
          }
     }
     formValidate()
})
