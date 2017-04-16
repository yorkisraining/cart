new Vue({
	el:'.container',
	data: {
		limitNum: 3,
		moreFlag: false,
		curIndex: 0,
		addressList: [],
		shippingMethod: 1
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getAddressLisk();
		});
	},
	computed: {
		filterAddress: function() {
			return this.addressList.slice(0, this.limitNum);
		}
	},
	methods: {
		getAddressLisk: function() {
			var _this = this;
			this.$http.get('data/address.json', {}).then(function(res) {
				_this.addressList = res.data.result;
			})
		},
		loadMore: function() {
			this.moreFlag = !this.moreFlag;
			if (this.moreFlag) {
				this.limitNum = this.addressList.length;
			} else {
				this.limitNum = 3;
			}
		},
		setDefault: function(addressID) {
			this.addressList.forEach(function(item, index) {
				if (item.addressId == addressID) {
					item.isDefault = true;
				} else {
					item.isDefault = false;
				}
			})
		},
		delAddress: function() {
			this.addressList.splice(this.curIndex, 1);
		}
	}
})
