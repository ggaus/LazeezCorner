# -*- coding: utf-8 -*-

from odoo import api, fields, models


class ResUsers(models.Model):
    
    _inherit = 'res.users'
    
    is_cook = fields.Boolean(string='Is Cook?')
    is_waiter = fields.Boolean(string='Is Waiter?')