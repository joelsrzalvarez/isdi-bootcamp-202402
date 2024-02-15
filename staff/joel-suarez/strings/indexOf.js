function indexOf(searchElement, fromIndex) {
    if (fromIndex < 0) {
        fromIndex = this.length + fromIndex;
        if (fromIndex < 0) {
            fromIndex = 0;
        }
    }

    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return i;
        }
    }

    return -1;
}
