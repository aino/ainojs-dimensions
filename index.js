var comp = window.getComputedStyle

var getValue = function(elem, what) {
  var low = what.toLowerCase()
  var val = Math.ceil( ("getBoundingClientRect" in elem) ?
    elem.getBoundingClientRect()[ low ] :
    elem[ 'offset'+what ]
  )

  if ( (typeof val == 'undefined' || isNaN(val)) && comp )
    val = comp(elem, null)[ low ].replace('px','')

  return parseInt(val, 10)
}

module.exports = function(elem) {
  return {
    width: getValue(elem, 'Width'),
    height: getValue(elem, 'Height')
  }
}