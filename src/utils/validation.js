import isEmail from 'validator/lib/isEmail';

export const handleChange = (field, setFormValue, setIsValid, formValue) => {
    const {name, value, validationMessage} = field;
    let status = true;
    let message = validationMessage;

    setFormValue({
        ...formValue,
        [name]: value
        });
    
    if (field.type === 'email') {
        status = isEmail(value);
        if (!status) {
            message = "Похоже email указан неверно";
            field.classList.add('auth__input-invalid');
        } else {
            field.classList.remove('auth__input-invalid');
        };
    } else {
        status = field.checkValidity();
    }
    setIsValid(status);
    return message;
}