export const validateInputs = (userData, setError) => {
    const { username, password, role } = userData;
    let errorMsg = {
        usernameError: '',
        passwordError: '',
        roleError: ''
    };
    let formValid = true;

    if (!username) {
        formValid = false;
        errorMsg.usernameError = 'Please enter a username';
    }

    if (typeof username !== undefined) {
        if (username.length <= 3 || username.length > 20) {
            formValid = false;
            errorMsg.usernameError =
                'Username must be between 4 and 20 characters.';
        }
    }

    if (!password) {
        formValid = false;
        errorMsg.passwordError = 'Please enter a password';
    }

    if (typeof password !== undefined) {
        // /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[a-a])(?=.*[@#$%&]).*$/
        if (!password.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[a-z]).*$/)) {
            formValid = false;
            errorMsg.passwordError = 'Password requires at least 6 characters';
        }
    }

    if (role === '') {
        formValid = false;
        errorMsg.roleError = 'Please select a role';
    }

    setError(errorMsg);

    return formValid;
};

export const facilitiesArray = () => {
    const result = [
        {
            id: 0,
            title: 'Glendale Location',
            key: 'facilities'
        },
        {
            id: 1,
            title: 'Burbank Location',
            key: 'facilities'
        },
        {
            id: 2,
            title: 'North Hollywood Location',
            key: 'facilities'
        },
        {
            id: 3,
            title: 'Northridge Location',
            key: 'facilities'
        }
    ];

    return result;
};

export const prioritiesArray = () => {
    const result = [
        {
            id: 0,
            title: 'Low',
            key: 'priorities'
        },
        {
            id: 1,
            title: 'Medium',
            key: 'priorities'
        },
        {
            id: 2,
            title: 'High',
            key: 'priorities'
        },
        {
            id: 3,
            title: 'Emergency',
            key: 'priorities'
        }
    ];

    return result;
};
