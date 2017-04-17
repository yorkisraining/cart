var vm = new Vue({
	el: '.wrap',
	data: {
		addressList: [],
		productList: []
		
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getAddressList();
			this.getProductList();
		});
		
	},
	methods: {
		getAddressList: function() {
			this.$http.get('data/address.json', {}).then(res => {
				this.addressList = res.data.result;
			});
		},
		getProductList: function() {
			this.$http.get('data/cart.json', {}).then(res => {
				this.productList = res.data.result.productList;
			});
		},
		sendMessage: function() {
			this.addressList.forEach(function(item, index) {
				if (item.isDefault) {
					return item.streetName + item.userName + item.postCode;
				}
			});	
		}
	}
});
