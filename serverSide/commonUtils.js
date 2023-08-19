const moment = require('moment');

const getFormatedDate = () =>{
    const [month, day, year] = moment()?.format('L')?.split('/')
    return {
        month, day, year
    }
};

module.exports = getFormatedDate;
