const bikeValidate = (req, res, next) => {
    let {name, type, color, wheelSize, price, description, id} = req.body;

    if (!name || !type || !color || !description || !id || (!wheelSize && wheelSize !== '0') || (!price && price !== '0')) {
        throw Error('All fields are required');
    }
    if (name.length < 5 || type.length < 5 || color.length < 5 || description.length < 5) {
        throw Error('All text fields minimum length should be 5 characters');
    }
    if (isNaN(+price) || isNaN(+wheelSize)) {
        throw Error('All number fields should accept only the number');
    }

    next();
}

export default bikeValidate;
