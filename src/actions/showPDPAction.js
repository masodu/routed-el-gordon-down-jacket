/**************************************************************************
 *
 *    ADOBE CONFIDENTIAL
 *    ___________________
 *
 *    Copyright 2018 Adobe
 *    All Rights Reserved.
 *
 *    NOTICE:  All information contained herein is, and remains
 *    the property of Adobe and its suppliers, if any. The intellectual
 *    and technical concepts contained herein are proprietary to Adobe
 *    and its suppliers and are protected by all applicable intellectual
 *    property laws, including trade secret and copyright laws.
 *    Dissemination of this information or reproduction of this material
 *    is strictly forbidden unless prior written permission is obtained
 *    from Adobe.
 *
 **************************************************************************/

/**
 * Redux action to dispatch after a product is clicked.
 * 
 * @param {Object} product a JSON representing the product details. 
 */
function showPDPAction(product, variant) {    
    return {
        type: 'SHOW_PDP',
        product: product,
        variant: variant
    };
}

export default showPDPAction;
