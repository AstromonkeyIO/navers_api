var commonUtilities = {

    /**
     * Checks if input parameters are undefined or not
     *
     * @param {array} params input parameters
     * @return {Boolean}
     */
    checkParams: function(params) {

        if (typeof(params) === 'undefined' || params.constructor !== Array) {
            return false;
        }

        params.forEach(function(param) {
            if (typeof(param) === 'undefined') {
                return false;
            }
        });

        return true;
    }
};

module.exports = commonUtilities;
