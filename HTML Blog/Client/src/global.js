let isLoggedIn = false;

export function setIsLoggedIn(newValue) {
    isLoggedIn = newValue;
}

export function getIsLoggedIn() {
    console.log(isLoggedIn);
    return isLoggedIn;
}
