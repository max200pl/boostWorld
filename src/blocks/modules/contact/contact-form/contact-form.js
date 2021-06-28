const formContact = document.getElementById('contact-form');
let fieldFormDiv = document.querySelectorAll(".form__input, .form__select, .form__textarea");
let groupDiv = document.querySelectorAll('.form__group');
formContact.addEventListener('submit', formSend);
async function formSend(e)
{
     e.preventDefault();
}

function formValidate() 
{
     let valid = true;

     for (let field of fieldFormDiv) {

          field.addEventListener('blur', function ()
          {
               let attrName = this.name
               let valueText = this.value;
               let check
               let checkSuccess = 0

               switch (attrName) {
                    case 'name':
                         check = /(^[A-Z]{1}[a-z]{1,14}( [A-Z]{1})?([a-z]{1,14})?$)|(^[А-Я]{1}[а-я]{1,14}( [А-Я]{1})?([а-я]{1,14})?$)/.test(valueText);
                         valid = false

                         if (!valueText || !check) {
                              console.log('плохо');
                              valid = false;
                         }

                         break;
                    case 'email':
                         check = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/.test(valueText)
                         break;
                    case 'select':
                         check = /^[1-9]$/.test(valueText)
                         console.log(check);
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