import "./import/modules";
import 'regenerator-runtime/runtime'


const ajaxSend = async (formData) =>
{
     const fetchResp = await fetch('/contact', {
          method: "POST",
          body: formData
     });
     if (!fetchResp.ok) {
          throw new Error(`статус ошибки ${fetchResp.status}`);
     }
     return await fetchResp.text();
};
const forms = document.querySelector("form");
forms.forEach(form =>
{
     form.addEventListener('submit', function (e)
     {
          e.preventDefault();
          const formData = new FormData(this);
          ajaxSend(formData)
               .then((response) =>
               {
                    console.log(response);
                    form.reset();
               })
               .catch((err) => console.log(err))
     })
})
