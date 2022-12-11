/**
 * The function takes the form data, converts it to an object, and then displays the object's values in
 * the results div.
 * @param event - The event object that is passed to the event handler.
 */
function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());

  

  /* Adding the values of the form to the results div. */
  document.getElementById('results').innerHTML +=
    '<div class="allok">ALL OK</div>' +
    'Name: ' + values.name + '<br/>' +
    'Credit card: ' + values.cardnumber + '<br/>' +
    'Expiration Date: ' + values.expirationdate + '<br/>' +
    'CVV: ' + values.cvv + '<br/>' +
    'Zipcode: ' + values.zipcode + '<br/>' +
    '<a href="/">RETURN</a>';

  /* Showing the results div. */
  results.style.display = 'block';
  /* Disable the button */
  document.getElementById('validateButton').disabled = "true";
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

  let code = e.keyCode;
  let allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

/* Replacing the value of the input with the value of the input after it has been formatted. */
  e.target.value = e.target.value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/')
    .replace(/^(0[1-9]{1}|1[0-2]{1})$/g, '$1/')
    .replace(/^([0-1]{1})([3-9]{1})$/g, '0$1/$2')
    .replace(/^(\d)\/(\d\d)$/g, '0$1/$2')
    .replace(/^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g, '$1/$2')
    .replace(/^([0]{1,})\/|[0]{1,}$/g, '0')
    .replace(/[^\d\/]|^[\/]{0,}$/g, '')
    .replace(/\/\//g, '/');
}

/**
 * If the year of the credit card is less than the current year, or if the year is the same but the
 * month is less than the current month, then the credit card is expired.
 */
function compareDate() {

  let today = new Date();
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yy = today.getFullYear().toString().slice(-2);
  let month = document.getElementById('expirationdate').value.toString().substring(0, 2);
  let year = document.getElementById('expirationdate').value.toString().slice(-2);

  if (yy > year) {
    alert('credit card expired');
    document.getElementById("expirationdate").value = "";
    document.getElementById("expirationdate").focus();
  } else if (yy === year) {
    if (mm > month) {
      alert('credit card expired');
      document.getElementById("expirationdate").value = "";
      document.getElementById("expirationdate").focus();
    } else if (mm === month) {
      alert('Credit card expire this month')
    }
  }
}