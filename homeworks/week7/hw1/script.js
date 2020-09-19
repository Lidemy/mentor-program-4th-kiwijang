/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* https://eslint.org/docs/rules/no-case-declarations 把 case 包起來 */
document.addEventListener('DOMContentLoaded', () => {
  const nicknameEle = document.querySelector('input[name="nickname"]');
  const emailEle = document.querySelector('input[name="email"]');
  const telEle = document.querySelector('input[name="tel"]');
  const typegroupEle = document.getElementById('typegroup_wrap');
  const knownEle = document.querySelector('input[name="known"]');
  const typegroupEleErrorClassList = typegroupEle.nextElementSibling.classList;

  function isInputPass(ele) {
    if (ele.value) {
      ele.nextElementSibling.classList.remove('visible');
      ele.classList.remove('input-bd-red');
      return true;
    }
    ele.nextElementSibling.classList.add('visible');
    ele.classList.add('input-bd-red');
    return false;
  }

  document.getElementById('form1').addEventListener('input', (e) => {
    switch (e.target.getAttribute('name')) {
      case 'nickname':
        isInputPass(nicknameEle);
        break;
      case 'email':
        isInputPass(emailEle);
        break;
      case 'tel':
        isInputPass(telEle);
        break;
      case 'typegroup': {
        const allEles = typegroupEle.querySelectorAll('input');
        const boolArr = [];
        allEles.forEach((x) => (x.checked ? boolArr.push(true) : boolArr.push(false)));
        // console.log(boolArr.filter((x) => x === true).length);
        if (boolArr.filter((x) => x === true).length > 0) {
          typegroupEleErrorClassList.remove('visible');
          for (let i = 0; i < allEles.length; i += 1) {
            allEles[i].classList.remove('bd-red');
          }
        } else {
          typegroupEleErrorClassList.add('visible');
          for (let i = 0; i < allEles.length; i += 1) {
            allEles[i].classList.add('bd-red');
          }
        }
        break;
      }
      case 'known':
        isInputPass(knownEle);
        break;
      default:
        break;
    }
  });

  document.getElementById('form1').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!(isPass(nicknameEle, 'nickname')
      && isPass(emailEle, 'email')
      && isPass(telEle, 'tel')
      && groupIsPass(typegroupEle, 'typegroup')
      && isPass(knownEle, 'known'))) {
      window.alert('資料有誤，請修正');
    } else {
      window.alert(`成功將資料送出!\n
      暱稱 ${nicknameEle.value}\n
      電子郵件  ${emailEle.value}\n
      手機號碼 ${telEle.value}\n
      報名類型  ${typegroupEle.querySelector('input:checked').parentElement.innerText}\n
      怎麼知道這個活動的？ ${knownEle.value}\n
      其他 ${document.querySelector('input[name="suggest"]').value}`);

      window.location.hash = '';
      document.getElementById('form1').reset();
    }
  });

  function isPass(ele, idString) {
    if (!ele) {
      return false;
    }
    if (!ele.value) {
      ele.nextElementSibling.classList.add('visible');
      ele.classList.add('input-bd-red');
      window.location.hash = '';
      window.location.hash = idString;
      return false;
    }
    ele.nextElementSibling.classList.remove('visible');
    ele.classList.remove('input-bd-red');
    return true;
  }

  function groupIsPass(ele, idString) {
    typegroupEleErrorClassList.remove('bd-red');
    if (!ele) {
      return false;
    }

    const boolArr = [];
    const allEles = typegroupEle.querySelectorAll('input');
    allEles.forEach((x) => (x.checked ? boolArr.push(true) : boolArr.push(false)));
    // console.log(boolArr.filter((x) => x === true).length);
    if (boolArr.filter((x) => x === true).length > 0) {
      typegroupEleErrorClassList.remove('visible');
      for (let i = 0; i < allEles.length; i += 1) {
        allEles[i].classList.remove('bd-red');
        return true;
      }
    } else {
      typegroupEleErrorClassList.add('visible');
      for (let i = 0; i < allEles.length; i += 1) {
        allEles[i].classList.add('bd-red');
      }
    }
    window.location.hash = '';
    window.location.hash = idString;
    return false;
  }
});
