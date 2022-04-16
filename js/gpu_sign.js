async function sign(redirect = '/') {
    if (!!!XHR || !!!Miku) {
        alert("ERROR: module not ready");
        return false;
    }

    let miku = new Miku();

    if (!!!await miku.key_gen()) {
        alert("ERROR: key_gen error");
        return false;
    }

    let id = document.querySelector("#id").value;
    let pw = document.querySelector("#pw").value;
    let pw_encoded = miku.encrypt(pw);

    try {
        let data = (await new XHR().connect("/sign/api/signin").datas({id: id, pw: pw_encoded}).post()).json;

        if (data.code != 200) {
            alert("ERROR: " + data.msg);
            if (data.href != undefined)
                location.href = data.href;
            return false;
        }

        alert("SUCCESS: " + data.msg);
        location.href = redirect;
        return true;
    }catch(e) {
        alert("ERROR...");
        return false;
    }
}

async function signup(redirect='/sign/signin') {
    if (!!!XHR || !!!Miku) {
        alert("ERROR: module not ready");
        return false;
    }

    let miku = new Miku();

    if (!!!await miku.key_gen()) {
        alert("ERROR: key_gen error");
        return false;
    }

    let id = document.querySelector(".id").value;
    let pw = document.querySelector(".pw").value;
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    /*let pw_check = document.querySelector(".pw_check").value;

    if (pw != pw_check) {
        alert("ERROR: password not match");
        return false;
    }*/

    let pw_encoded = miku.encrypt(pw);

    try {
        let data = (await new XHR().connect("/sign/api/signup").datas({id: id, pw: pw_encoded, name: name, email: email}).post()).json;
        
        if (data.code != 200) {
            alert("ERROR: " + data.message);
            return false;
        }

        alert("SUCCESS: " + data.message);
        location.href = redirect;
        return true;
    }catch(e) {
        alert("ERROR...");
        return false;
    }
}