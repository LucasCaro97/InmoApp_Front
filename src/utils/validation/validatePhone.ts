const validatePhone = (phoneNumber: string): boolean => {
    const regex = /^[+\-]?\d{1,4}?[-\s.]?\d{1,4}?[-\s.]?\d{4,}$/;
    return regex.test(phoneNumber);
}
export {validatePhone}
