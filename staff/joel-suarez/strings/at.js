function at(searchString, index) {
    //
    var character;
    if (index >= 0) {
        character = searchString[index];
    }
    else {
        var newIndex = searchString.length + index;
        character = searchString[newIndex];
    }
    return character;
}

