delete Array.prototype.pop;

function pop(param) {
    return param.length === 0 ? [] : param.length = param.length - 1;
}