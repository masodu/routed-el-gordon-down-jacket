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

import React from 'react';
import renderHTML from 'react-render-html';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Utils from '../common/Utils';
import './ProductDetails.css';
import showPDPAction from '../../actions/showPDPAction';
import { withRouter } from 'react-router'

/**
 * Renders the product details.
 */
class ProductDetails extends React.Component {
    
    render() {
        if (this.props.type !== "SHOW_PDP") {
            return '';
        }
        let asset = Utils.getAsset(this.props.variant, this.props.product);

        return (
            <div className="row" style={{width:"50%", position:"relative", left :"15%"}}>
                <div className="row">
                    <div className="col">
                        <img className="card-img-top" src={asset.url} alt={this.props.product.name} />
                    </div>
                    <div className="col">
                        <p className="text-right text-uppercase text-secondary small">SKU: {this.props.variant.sku}</p>
                        <p className="h2 font-weight-bold">{this.props.variant.name}</p>
                        <p className="h2 text-uppercase">{this.getProductDetailsPrice()}</p>
                        <p></p>
                        {renderHTML(Utils.getAttributeById(this.props.variant, 'summary'))}
                        {renderHTML(Utils.getAttributeById(this.props.variant, 'features'))}
                        <p></p>
                    </div>
                </div>
                <div className="col" style={{position:"fixed", left :"65%"}}>
                    <div className="row">
                        {this.renderColors()}
                    </div>
                    <div className="row">
                        {this.renderSizes()}
                    </div>
                </div>
            </div>
        );
    }

    renderColors() {
        let selectColor = Utils.getAttributeById(this.props.variant, 'color');
        return this.getColors().map(color => {
            let text = '';
            if(color === selectColor) {
                text = 'X';
            }
            return <div key={color} onClick={() => this.setColor(color)} className="axis text-center" style={{backgroundColor: color}}>{text}</div>    
        });
    }

    renderSizes() {
        let selectedSize = Utils.getAttributeById(this.props.variant, 'size');
        return this.getSizes().map(size => {
            let classNameValue = "axis axisSize text-center text-uppercase";
            if(size === selectedSize) {
                classNameValue = "axis axisSizeSelected text-center text-uppercase"
            }
            return <div key={size} onClick={() => this.setSize(size)} className={classNameValue}>{size}</div>    
        });
    }

    setColor(color) {
        let size = Utils.getAttributeById(this.props.variant, 'size');
        this.dispatchVariant(color, size);
        
    }

    setSize(size) {
        let color = Utils.getAttributeById(this.props.variant, 'color');
        this.dispatchVariant(color, size);
    } 

    dispatchVariant(color, size) {
        let variant = Utils.getVariantByAxis(this.props.product, color, size);
        this.props.history.push('/' + variant.sku, showPDPAction(this.props.product, variant));
        //this.props.dispatch(showPDPAction(this.props.product, variant));
    }

    getProductDetailsPrice() {
        if (!this.props.variant.prices || this.props.variant.prices.length === 0) {
            return '';
        }

        let price = this.props.variant.prices[0];
        let value = (price.amount/100).toFixed(2);
        return `${price.currency}${value}`
    }

    getColors() {
        return [...new Set(this.props.product.variants.map(variant => {
            return Utils.getAttributeById(variant, 'color');
        }))];
    }
    getSizes() {
        return [...new Set(this.props.product.variants.map(variant => {
            return Utils.getAttributeById(variant, 'size');
        }))];
    }
}

ProductDetails.propTypes = {
    type: PropTypes.string.isRequired,
    product: PropTypes.object,
    variant: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    if (ownProps.location.state) {
        state.productDetail = ownProps.location.state;
    }
    let internalState = {
        type: state.productDetail.type,
        product: state.productDetail.product,
        variant: state.productDetail.variant
    };
    return internalState;
}

export default withRouter(connect(mapStateToProps)(ProductDetails));