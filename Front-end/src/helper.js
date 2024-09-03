const handleForm = (e, object) => {
    return {
        ...object,
        [e.target.name]: e.target.value
    }
}

export default handleForm;
