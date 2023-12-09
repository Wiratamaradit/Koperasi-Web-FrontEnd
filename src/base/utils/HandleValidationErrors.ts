const HandleValidationErrors = (data: any) => {
    switch (data.Status) {
        case 400:
            const validationErrors = data.Errors && data.Errors.Validation;
            if (validationErrors) {
                const errorMessages: any = {};
                errorMessages.Status = data.Status;
                errorMessages.Message = data.Message;
                errorMessages.Validation = validationErrors;
                return errorMessages;
            } else {
                return {Status: data.Status, Message: data.Message};
            }
        case 401:
            localStorage.removeItem('authOidc');
            localStorage.removeItem('detailUser');
            return data.Message
        default:
            return data; // pindah halaman
    }
}

export default HandleValidationErrors