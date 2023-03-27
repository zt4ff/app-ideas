// checks for there strings and ensure they match three set of regex
const allMatchRegex = (values) => {
    // matches 5 cap, 6 sym and 2 hyphen
    const regex1 = /^(?=(?:[^A-Z]*[A-Z]){5})(?=(?:[^!@#$%^&*()-_]*[!@#$%^&*()-_]){6})(?:[^-]*-){2}[A-Z!@#$%^&*()-_\-]{13}$/;
;
    // matches letter without spaces
    const regex2 = /d/;
    // matches only email address
    const regex3 = /e/


    values.filter(value => {

    })
}