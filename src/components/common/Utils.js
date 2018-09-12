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

class Utils {

    /**
     * Returns the asset for a variant and if not present fallsback on product or master variant.
     * 
     * @param {Object} variant JSON with CIF variant
     * * @param {Object} product JSON with CIF product
     */
    static getAsset(variant, product) {

        if (variant.assets && variant.assets.length > 0) {
            return variant.assets[0];
        }
        if (product.assets && product.assets.length > 0) {
            // Get asset of root product
            return product.assets[0];

        } else if (product.variants.length > 0 && product.masterVariantId !== "") {
            // Get asset from master variant
            let masterVariantId = product.masterVariantId;
            let masterVariant = product.variants.find((variant) => {
                return variant.id === masterVariantId;
            });
            if (masterVariant && masterVariant.assets.length > 0) {
                return masterVariant.assets[0];
            }
        }

        return '';
    }

    /**
     * Returns the selected cif product variant.
     * 
     * @param {Object} product   JSON with CIF product.
     * @param {String} variantId The selected variant id.
     */
    static getVariantById(product, variantId) {
        if (!variantId) {
            variantId = product.masterVariantId;
        }
        return product.variants.find((variant) => {
            return variant.id === variantId;
        });
    }

    /**
     * Returns the selected cif product variant.
     * 
     * @param {Object} product   JSON with CIF product.
     * @param {String} color     The selected variant id.
     * @param {String} color     The selected variant id.
     */
    static getVariantByAxis(product, color, size) {
        return product.variants.find((variant) => {
            return Utils.getAttributeById(variant, 'color') === color && Utils.getAttributeById(variant, 'size') === size; 
        });
    }
    
    /**
     * Returns the attributes value for a given variant or empty when no attribute is found.
     * @param {Object} variant JSON representation for a product variant.
     * @param {String} id      Attribute id like color or size. 
     */
    static getAttributeById(variant, id) {
        let attribute = variant.attributes.find( (attribute) => {
            return attribute.id === id;
        });
        if(attribute) {
            return attribute.value;
        }
        return '';
    }
}

export default Utils;