export const encrypt = (o, salt) => {
    o = JSON.stringify(o).split('');
    for (var i = 0, l = o.length; i < l; i++)
        if (o[i] == '{') o[i] = '}';
        else if (o[i] == '}') o[i] = '{';
    return encodeURI(salt + o.join(''));
};

export const decrypt = (o, salt) => {
    o = decodeURI(o);
    if (salt && o.indexOf(salt) != 0) throw new Error('object cannot be decrypted');
    o = o.substring(salt.length).split('');
    for (var i = 0, l = o.length; i < l; i++)
        if (o[i] == '{') o[i] = '}';
        else if (o[i] == '}') o[i] = '{';
    return JSON.parse(o.join(''));
};
