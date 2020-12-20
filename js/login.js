let username = document.querySelector("#username");
let password = document.querySelector("#password");
let form = document.querySelector("#a");
let btn = document.querySelector('.btn-login')
btn.onclick = function() {
    pAjax({
        type: 'post',
        url: '../server/login.php',
        data: {
            username: username.value,
            password: password.value
        }
    }).then(res => {
        let res1 = JSON.parse(res);

        if (res1.code == 1) {
            localStorage.setItem("login", username.value);
            let url = localStorage.getItem("url");
            if (url) {
                location.href = url;
                localStorage.removeItem("url");
            } else {
                location.href = '../HTML/index.html';
            }


        } else {
            alert(res1.message);
        }


    })
}