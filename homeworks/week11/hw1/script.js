/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */
document.addEventListener('DOMContentLoaded', () => {
  let username = '';
  let roleId = '';
  const table = document.querySelector('.roles');
  const btn = document.querySelector('.submit-btn');
  if (table) {
    table.addEventListener('click',
      (e) => {
        if (e.target.nodeName === 'INPUT') {
          const yes = confirm('你確定要更改角色嗎？');

          if (yes) {
            // arr.push();
            // .dataset.username

            // role
            roleId = e.target.nextSibling.innerHTML === 'user' ? 2 : 3;
            // ussername
            username = e.target.id.split('_')[1];
            const allRadioInput = document.querySelectorAll('input[type="radio"]');
            Array.from(allRadioInput).map((x) => x.disabled = true);
            const radioUserInput = document.querySelector(`#user_${username}`);
            const radioLockInput = document.querySelector(`#userlock_${username}`);
            console.log(radioUserInput);
            radioUserInput.disabled = false;
            radioLockInput.disabled = false;
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = false;
          } else {
            e.preventDefault();
          }
        }
      });
  }
  if (btn) {
    btn.addEventListener('click', () => {
      const http = new XMLHttpRequest();
      const url = 'handle_roles.php';
      const params = `username=${username}&roleId=${roleId}`;
      http.open('POST', url, true);

      // Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = () => { // Call a function when the state changes.
        if (http.readyState === 4 && http.status >= 200 && http.status < 400) {
          alert('修改成功!!');
          window.location.reload();
        }
      };
      http.send(params);
    });
  }
});
