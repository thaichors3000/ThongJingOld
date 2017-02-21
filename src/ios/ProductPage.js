import React, { Component } from 'react';
import {
  ScrollView,
  Alert,
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import base from './../../styles/base';
import style from './../../styles/productpage';

import Product from './../Product';
import Loader from './../Loader';

import ProductCode from './../ProductCode';
import ProductName from './../ProductName';
import ProductDetail from './../ProductDetail';
import ProductPrice from './../ProductPrice';
import CallButton from './../CallButton';

export default class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: props.code,
      data: [],
      isLoaded: false,
      isFound: false,
      isError: false,
    };

    this.loadProduct = this.loadProduct.bind(this);
    this.successCallback = this.successCallback.bind(this);
    this.errorCallback = this.errorCallback.bind(this);
    this.retry = this.retry.bind(this);
  }

  componentWillMount() {
    this.loadProduct();
  }

  isAdmin() {
    return this.props.role === 'Admin';
  }

  isSeller() {
    return this.props.role === 'Seller';
  }

  isClient() {
    return this.props.role === 'Client';
  }

  loadProduct() {
    Product.findByCode(this.props.code, this.successCallback, this.errorCallback);
  }

  retry() {
    this.setState({ isLoaded: false, isFound: false, isError: false });
    this.loadProduct();
  }

  successCallback(product, data) {
    if (product) {
      this.setState({
        code: product.code,
        name: product.name,
        price: product.price,
        phone: product.phone,
        wholesale_price: product.wholesale_price,
        data: data,
        isFound: true,
      });
    }

    this.setState({ isLoaded: true });
  }

  errorCallback(error) {
    this.setState({ isLoaded: true, isError: true });
  }

  render() {
    let footer = (
      <View style={style.footer}>
        <Button
          style={[base.button, base.secondaryButton, style.button]}
          textStyle={[base.buttonText, base.secondaryButtonText]}
          onPress={() => Actions.barcodePage({ role: this.props.role })}>
          ស្គែនលេខកូដ
        </Button>
        <View style={style.divider}></View>
        <Button
          style={[base.button, base.secondaryButton, style.button]}
          textStyle={[base.buttonText, base.secondaryButtonText]}
          onPress={() => Actions.inputCodePage({ role: this.props.role })}>
          បញ្ចូលលេខកូដ
        </Button>
      </View>
    );

    if (!this.state.isLoaded) {
      return (
        <Loader />
      );
    }

    if (this.state.isError) {
      return (
        <View style={[base.container, base.centering, style.container]}>
          <Text style={base.label}>ការទាញទិន្នន័យមានបញ្ហា</Text>
          <Text style={{ fontSize: 16 }}>សូមសាកសួរក្រុមហ៊ុន ថុង ជីង</Text>
          <Text style={{ fontSize: 15, marginBottom: 50 }}>លេខកូដផលិតផល: {this.state.code}</Text>

          <Button
            style={[base.button, base.primaryButton]}
            textStyle={[base.buttonText, base.primaryButtonText]}
            onPress={() => this.retry()}>
            សាកល្បងម្ដងទៀត
          </Button>

          {footer}
        </View>
      );
    }

    if (!this.state.isFound) {
      return (
        <View style={[base.container, base.centering, style.container]}>
          <Text style={base.label}>រកមិនឃើញលេខកូដ</Text>
          <Text style={{ fontSize: 15, marginBottom: 50 }}>លេខកូដផលិតផល: {this.state.code} មិនត្រូវបានរកឃេីញ</Text>

          <Button
            style={[base.button, base.primaryButton]}
            textStyle={[base.buttonText, base.primaryButtonText]}
            onPress={() => this.retry()}>
            សាកល្បងម្ដងទៀត
          </Button>

          {footer}
        </View>
      );
    }

    let phoneCall = null;
    let wholesalePrice = null;
    let content = this.state.data.map(obj => <ProductDetail key={obj.name} name={obj.name} value={obj.value} />);

    if (this.isAdmin() || this.isSeller()) {
      phoneCall = <CallButton phone={this.state.phone} />;
    }

    if (this.isAdmin()) {
      wholesalePrice = <ProductDetail name="តំលៃដើម" value={this.state.wholesale_price} />;
    }

    return (
      <View style={{ flex: 1, marginTop: 72 }}>
        <ScrollView style={{ marginBottom: 72 }}>
          <View style={{ backgroundColor: '#F9F9F9', marginBottom: 10, paddingTop: 10 }}>
            <ProductCode name="លេខកូដ" value={this.state.code} />
            <ProductName name="ឈ្មោះទំនិញ" value={this.state.name} />
            <ProductPrice name="តំលៃ" value={this.state.price} />
          </View>
          {wholesalePrice}
          {content}
        </ScrollView>

        {phoneCall}
        {footer}
      </View>
    );
  }
}
