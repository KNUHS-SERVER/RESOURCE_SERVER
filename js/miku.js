class Miku {
    #n = null;
    #pv_key = null;
    #pb_key = null;

    constructor() {
    }

    async key_gen(deep = 0) {
        if (deep > 3) return false;
        if (!!!XHR) {
            alert("ERROR: XHR not found");
            return false;
        }

        try {
            let data = (await new XHR().connect("/sign/api/key_gen").post()).json;

            if (!!!data) return this.key_gen(deep + 1);
            if (data.code != 200) return this.key_gen(deep + 1);

            this.#n = data.data.n;
            this.#pb_key = data.data.pb_key;
            return true;
        }catch(e) {
            return this.key_gen(deep + 1);
        }
    }

    encrypt(str, k = this.#pb_key) {
        str = str2ascii(str);
    
        let buffer = [];
        let len = str.length;
    
        for (let i = 0; i < len; i++) {
            let sum = 1;
            let v = str[i];
            for (let j = 0; j < k; j++) {
                sum *= v;
                sum %= this.#n;
            }
            buffer.push(sum);
        }
    
        return buffer;
    }
    
    decrypt(arr, k = this.#pb_key) {
        let buffer = [];
        let len = arr.length;
    
        for (let i = 0; i < len; i++) {
            let sum = 1;
            let v = arr[i];
            for (let j = 0; j < k; j++) {
                sum *= v;
                sum %= this.#n;
            }
            buffer.push(sum);
        }
    
        return ascii2str(Uint8Array.from(buffer));
    }
}