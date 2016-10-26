import ViewModel from 'viewmodel-react';

const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
ViewModel.mixin({
  email: {
    validEmail: function(email){
      return !!email && emailRegex.test(email);
    }
  }
})
