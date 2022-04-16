function str2ascii(str) {
    return new TextEncoder().encode(str);
}

function ascii2str(arr) {
    return new TextDecoder().decode(arr);
}