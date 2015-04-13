var isNode = typeof window == 'undefined'

var Dimensions = function(elem) {
  this.elem = elem
  this.rect = "getBoundingClientRect" in elem ? elem.getBoundingClientRect() : false
  this.comp = !isNode && 'getComputedStyle' in window ? window.getComputedStyle : false
}

Dimensions.prototype.getValue = function(type) {
  if (isNode)
    return 0

  var low = type.toLowerCase()
  var val = this.rect ? this.rect[low] : this.elem['offset'+type]

  if ( (typeof val == 'undefined' || isNaN(val)) && this.comp )
    val = this.comp(this.elem, null)[ low ].replace('px','')

  return parseInt(val, 10)
}

module.exports = function(elem) {
  var dim = new Dimensions(elem)
  return {
    width: dim.getValue('Width'),
    height: dim.getValue('Height'),
    top: dim.getValue('Top'),
    left: dim.getValue('Left')
  }
}