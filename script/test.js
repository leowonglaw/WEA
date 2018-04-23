if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value) {
            if (this == null) {
                throw new TypeError('this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            var start = arguments[1];
            var relativeStart = start >> 0;
            var k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);
            var end = arguments[2];
            var relativeEnd = end === undefined ?
                len : end >> 0;
            var final = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);
            while (k < final) {
                O[k] = value;
                k++;
            }
            return O;
        }
    });
}
var horario = [[0, 0], [0, 0], [18, 20], [0, 0], [18, 20], [0, 0]];
var limit = new Array(horario.length).fill(null).map(function (u) { return ([0, 0]); });
for (var index = 0; index < horario.length; index++) { // cantidad de horas de hueco y horario
    var dmin = horario[index][0], dmax = horario[index][1];
    console.log(limit);
    if (limit[index][0] == 0 || (dmin != 0 && dmin < limit[index][0]))
        limit[index][0] = dmin;
    if (limit[index][1] == 0 || (dmax > limit[index][1]))
        limit[index][1] = dmax;
}
console.log(limit);
