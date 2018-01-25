const checkout = require('ck');

(function(c){
    $('.payment-launcher').on('click',function(e){
        e.preventDefault()
        try {
            localStorage.setItem('checkout',$(this).attr('data-bind'))
        } catch (e) {
            document.cookie = 'checkout='+$(this).attr('data-bind')
        } finally {
            return window.location = $(this).attr('href')
        }
    });
}(checkout));