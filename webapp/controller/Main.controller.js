sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/halilural/qrcodewithsapui5QrCodeApplication/qrcode/qrcode"
], function(Controller, QRCode) {
	"use strict";

	return Controller.extend("com.halilural.qrcodewithsapui5QrCodeApplication.controller.Main", {

		onInit: function() {
			this._oView = this.getView();
			var oViewModel = new sap.ui.model.json.JSONModel({
				SupplierName: "",
				Street: "",
				HouseNumber: "",
				ZIPCode: "",
				City: "",
				Countries: [{
					country: "TR",
					text: "Turkey"
				}, {
					country: "DEU",
					text: "Germany"
				}, {
					country: "USA",
					text: "United States of America"
				}, {
					country: "UK",
					text: "England"
				}],
				SelectedCountry: ""
			});
			oViewModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
			this._oView.setModel(oViewModel);

		},

		_getViewModel: function() {
			return this._oView.getModel("oViewModel");
		},

		_getViewModelPropertyVal: function(sProperty) {
			return this._getViewModel().getProperty("/" + sProperty);
		},
		_setViewModelPropertyVal: function(sProperty, sValue) {
			this._getViewModel().setProperty(sValue, sProperty);
		},
		onGenerateQrCode: function() {

			debugger;

			var aQueryString = [],
				baseUrl = "http://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=",
				queryString = "";

			aQueryString.push({
				key: "name",
				value: this._oView.getModel().getData().SupplierName
			});
			aQueryString.push({
				key: "street",
				value: this._oView.getModel().getData().Street
			});
			aQueryString.push({
				key: "no",
				value: this._oView.getModel().getData().HouseNumber
			});
			aQueryString.push({
				key: "zipcode",
				value: this._oView.getModel().getData().ZIPCode
			});
			aQueryString.push({
				key: "city",
				value: this._oView.getModel().getData().City
			});
			aQueryString.push({
				key: "country",
				value: this._oView.getModel().getData().SelectedCountry
			});

			queryString += escape(JSON.stringify(aQueryString));

			var url = baseUrl + queryString;

			var oImage = new sap.ui.commons.Image("i1");
			oImage.setSrc(url);
			oImage.setTooltip(url);
			oImage.setDecorative(false);

			var oLayout = new sap.ui.commons.layout.HorizontalLayout("Layout1", {
				content: [oImage]
			});

			// attach it to an element in the page
			// this._oView.set
			this._oView.byId("page").addContent(oLayout);

		}

	});
});