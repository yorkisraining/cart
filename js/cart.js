new Vue({
	el: '#app',
	data: {
		totalMoney: 0,
		productList: {},
		checkFlag: false,
		delFlag: false,
		curProduct: ''
	},
	filters: {
		formatMoney: function(value) {
			return "￥"+value.toFixed(2);
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.cartView();
		})
	},
	methods: {
		cartView: function() {
			var _this = this;
			this.$http.get('data/cart.json', {}).then(function(res){
				_this.productList = res.body.result.productList;
			})
		},
		changeMoney: function(product, way) {
			if (way > 0) {
				product.productQuentity++;
			} else {
				product.productQuentity--;
				if (product.productQuentity < 2) {
					product.productQuentity = 1;
				}
			}
			this.calcTotalPrice();
		},
		selectProduct: function(item) {
			if (typeof item.checked == 'undefined') {
				Vue.set(item, 'checked', true);
				//this.$set(item, 'checked', true);
			} else {
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		selectAll: function() {
			var _this = this;
			this.checkFlag = !this.checkFlag;
			this.productList.forEach(function(item, index) {
				if (typeof item.checked == 'undefined') {
					Vue.set(item, 'checked', _this.checkFlag);
				} else {
					item.checked = _this.checkFlag;
				}
			})
			this.calcTotalPrice();
		},
		calcTotalPrice: function() {
			var _this = this;
			_this.totalMoney = 0;
			this.productList.forEach(function(item, index) {
				if (item.checked) {
					_this.totalMoney += item.productPrice * item.productQuentity;
				}
			})
		},
		delConfirm: function(item) {
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct: function() {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index, 1);
			this.delFlag = false;
			
		}
	}
});

Vue.filter('money', function(value, type) {
	return value + ' ' + type;
})