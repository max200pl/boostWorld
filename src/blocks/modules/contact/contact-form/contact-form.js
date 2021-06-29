(function ()
{
     let fieldFormDiv = document.querySelectorAll(".form__input, .form__select, .form__textarea");

     const formContact = document.querySelector('form');

     formContact.addEventListener('submit', (event) =>
     {
          console.log('ok');
          event.preventDefault();

          let checkForm = formValidate();
          console.log(checkForm);
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
                              check = /(^[A-Z]{1}[a-z]{1,26}( [A-Z]{1})?([a-z]{1,14})?( [A-Z]{1})?([a-z]{1,14})?( )?$)|(^[А-Я]{1}[а-я]{1,27}( [А-Я]{1})?([а-я]{1,14})?( [А-Я]{1})?([а-я]{1,14})?$)/.test(valueText.trim());
                              if (!valueText) {
                                   attentionName.innerHTML = "Please enter your name";
                              } else if (!check) {
                                   attentionName.innerHTML = "Please enter your correct name";
                              }
                              break;
                         case 'email':
                              check = /^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/.test(valueText)
                              if (!valueText) {
                                   attentionEmail.innerHTML = "Please enter your email";
                              } else if (!check) {
                                   attentionEmail.innerHTML = "Please enter your correct email";
                              }

                              break;
                         case 'select':
                              check = /^[1-9]$/.test(valueText)
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

                    return check;
               })
          }
     }
})()

