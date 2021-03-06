odoo.define('pos_extended.chrome', function (require) {
"use strict";

	var chrome = require('point_of_sale.chrome');
	
	var gui = require('point_of_sale.gui');
	var models = require('point_of_sale.models');
	var screens = require('point_of_sale.screens');
	var PopupWidget = require('point_of_sale.popups');


	chrome.OrderSelectorWidget.include({
		neworder_click_handler: function(event, $el) {
			this.total_order += 1;
			if (this.total_order <= 5){
				this.pos.add_new_order();
			}
	    },
	    renderElement: function(){
	    	this._super();
	    	this.total_order = this.pos.get_order_list().length;
	    },
	})
	
	
	


	var OrderStatusButton = screens.ActionButtonWidget.extend({
	    template: 'OrderStatusButton',
        init: function (parent, options) {
            this._super(parent, options);

            this.pos.get('orders').bind('add remove change', function () {
                this.renderElement();
            }, this);

            this.pos.bind('change:selectedOrder', function () {
                this.renderElement();
            }, this);
        },
	    button_click: function(){
	    	var self = this;
	    	if (this.pos.user.is_cook){
	    		this.gui.show_popup('selection',{
	                title:   'Select Status',
	                value:   self.pos.get_order().get_order_status,
	                list:    [{label: 'Started Preparing', item: 'Started Preparing'}, {label: 'Cooking', item: 'Cooking'}, {label: 'Ready', item: 'Ready'}],
	                is_selected: function (status) {
	                    return status === this.pos.get_order().get_order_status();
	                },
	                confirm: function (item) {
	                	self.pos.get_order().set_order_status(item);
	                	self.renderElement();
	                },
	            });
	    	}
	    },
	    render_label: function(){
	    	if (this.pos.get_order()) {
	            return this.pos.get_order().get_order_status();
	        } else {
	            return 'Set Order Status';
	        }
	    }
	});

	screens.define_action_button({
	    'name': 'OrderStatus',
	    'widget': OrderStatusButton,
	    'condition': function(){
	    	return true
	    },
	});
	
	var _super_order = models.Order.prototype;
	models.Order = models.Order.extend({
	    initialize: function() {
	        _super_order.initialize.apply(this,arguments);
	        this.order_status = this.order_status || 'Set Order Status';
	        this.save_to_db();
	    },
	    export_as_JSON: function() {
	        var json = _super_order.export_as_JSON.apply(this,arguments);
	        json.order_status = this.order_status;
	        return json;
	    },
	    init_from_JSON: function(json) {
	        _super_order.init_from_JSON.apply(this,arguments);
	        this.order_status = json.order_status;
	    },
	    get_order_status: function(){
	        return this.order_status;
	    },
	    set_order_status: function(item) {
	        this.order_status = item;
	        this.trigger('change');
	    },
	});

});
