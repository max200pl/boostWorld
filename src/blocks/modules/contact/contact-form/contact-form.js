document.addEventListener("DOMContentLoaded", function ()
{
     let fieldFormDiv = document.querySelectorAll(".form__input, .form__select, .form__textarea");
     const formContact = document.querySelector("#contact-form");
     const submitButton = document.querySelector("#form-btn")
     const form = document.querySelector("form");
     const successAlert = document.querySelector("#SuccessAlert");
     const errorAlert = document.querySelector("#ErrorAlert");
     const linearActivity = document.querySelector("#linear-activity")
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


     formContact.addEventListener('submit', (event) =>
     {

          event.preventDefault();
          const body = new FormData(form);

          const requestURL = '/contact'
          const headers = {
               'Content-Type': 'application/json'
          }


          function sendRequest(method, url, body = null)
          {
               return fetch(url, {
                    method: method,
                    body: JSON.stringify(body),
                    headers: headers
               })
                    .then(response =>
                    {
                         if (response.ok) {
                              console.log('ok');
                              successAlert.style.display = "block";
                              return response.json()
                         }

                         return response.json().then(error =>
                         {
                              errorAlert.style.display = "block";
                         })
                    })
          }

          sendRequest('POST', requestURL, body)
               .then(data => console.log(data))
               .catch(err => console.log(err))

     })

     formValidate()
     function formValidate() 
     {

          for (let field of fieldFormDiv) {

               field.addEventListener('blur', function ()
               {

                    let check
                    let attrName = this.name
                    let valueText = this.value;

                    const attentionName = document.getElementById("attention-name")
                    const attentionEmail = document.getElementById("attention-email")
                    const attentionSelect = document.getElementById("attention-select")

                    switch (attrName) {
                         case 'name':
                              check = nameRegex.test(valueText.trim());
                              if (!valueText) {
                                   attentionName.innerHTML = "Please enter your name";
                              } else if (!check) {
                                   attentionName.innerHTML = "Please enter your correct name";
                              }
                              break;
                         case 'email':
                              check = emailRegex.test(valueText)
                              if (!valueText) {
                                   attentionEmail.innerHTML = "Please enter your email";
                              } else if (!check) {
                                   attentionEmail.innerHTML = "Please enter your correct email";
                              }

                              break;
                         case 'select':
                              check = selectRegex.test(valueText)
                              if (!check) {
                                   attentionSelect.innerHTML = "Please choose the one you need";
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
})
