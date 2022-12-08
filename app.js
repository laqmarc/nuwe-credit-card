
/**
 * The function takes the form data, converts it to an object, and then displays the object's values in
 * the results div.
 * @param event - The event object that is passed to the event handler.
 */
function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());

  // console.table({ values });

/* Adding the values of the form to the results div. */
 document.getElementById('results').innerHTML += 
 '<div class="allok">ALL OK</div>' + 
 'Name: ' + values.name + '<br/>' + 
 'Credit card: ' + values.cardnumber + '<br/>' + 
 'Expiration Date: ' + values.expirationdate + '<br/>' + 
 'CVV: ' + values.cvv + '<br/>' + 
 'Zipcode: ' + values.zipcode + '<br/>' +
 '<a href="/">RETURN</a>' ;

/* Showing the results div. */
 results.style.display = 'block';

}

/* Listening for the submit event on the form. */
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);


/* A jQuery plugin that is used to format the input.
* used in credit card number  
*/
$(":input").inputmask();

/**
 * It replaces the value of the input with the value of the input after it has been formatted.
 * @param e - The event object
 * @returns The value of the input field.
 */
function formatString(e) {
  
  var inputChar = String.fromCharCode(e.keyCode);
  var code = e.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  e.target.value = e.target.value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Pre entering more than 1 `/`
  );
}
