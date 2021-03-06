# -*- coding: utf-8 -*-

{
  "name"                 :  "POS Extended",
  "summary"              :  "Hide Buttons",
  "category"             :  "point_of_sale",
  "version"              :  "1.0.0.0.1",
  "sequence"             :  10,
  "author"               :  "Techultra Solutions Pvt. Ltd.",
  "description"          :  """Pos Extended""",
  "depends"              :  ['point_of_sale', 'pos_restaurant'],
  "data"                 :  [
                            'views/res_users.xml',
                            'views/template.xml',
                            ],
#   "qweb"                 :  ['static/src/xml/pos_orders.xml'],
  "installable"          :  True,
  "auto_install"         :  False,
}