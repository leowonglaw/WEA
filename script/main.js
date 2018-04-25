"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [this[j], this[i]], this[i] = _a[0], this[j] = _a[1];
    }
    return this;
    var _a;
};
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
var Curso = /** @class */ (function () {
    function Curso(nomCurso, ciclo, dificultad, prioridad, caracter) {
        if (prioridad === void 0) { prioridad = 3; }
        if (caracter === void 0) { caracter = "O"; }
        this.nomCurso = nomCurso;
        this.ciclo = ciclo;
        this.dificultad = dificultad;
        this.prioridad = prioridad;
        this.caracter = caracter;
    }
    return Curso;
}());
var CursoSeccion = /** @class */ (function () {
    function CursoSeccion(curso, seccion, docente, horario) {
        this.curso = curso;
        this.seccion = seccion;
        this.docente = docente;
        this.horario = horario;
    }
    CursoSeccion.prototype.toString = function () {
        return this.curso.nomCurso + "-Sec" + this.seccion;
    };
    return CursoSeccion;
}());
var Docente = /** @class */ (function () {
    function Docente(nomDocente, rating) {
        if (rating === void 0) { rating = 3; }
        this.nomDocente = nomDocente;
        this.rating = rating;
    }
    return Docente;
}());
// TODO
var SolucionClique = /** @class */ (function () {
    function SolucionClique(solucion, resultado, rating, objetivos) {
        this.solucion = solucion; //# clique
        this.resultado = resultado;
        this.rating = rating;
        this.objetivos = objetivos;
    }
    SolucionClique.prototype.getHorario = function () {
        if (this._horario == undefined)
            this._horario = Array(22 - 7).fill(Array(this.solucion[0].horario).fill([undefined]));
    };
    SolucionClique.prototype.__lt__ = function (self, other) {
        //return self.result < other.result
    };
    SolucionClique.prototype.toString = function () {
        return "Soluci\u00F3n " + this.solucion + ", resultado " + this.resultado + ", rating " + this.rating + ",\n                    o1 " + this.objetivos[0] + ", o2 " + this.objetivos[1] + ", o3 " + this.objetivos[2] + ", o4 " + this.objetivos[3] + ", o5 " + this.objetivos[4];
    };
    return SolucionClique;
}());
var HorarioSolucion = /** @class */ (function () {
    function HorarioSolucion(horario, puntaje, rating, objetivos) {
        if (puntaje === void 0) { puntaje = 0; }
        if (rating === void 0) { rating = 0; }
        if (objetivos === void 0) { objetivos = []; }
        this.horario = horario;
        this.puntaje = puntaje;
        this.rating = rating;
        this.objetivos = objetivos;
    }
    HorarioSolucion.prototype.equals = function (prm_horarioSolucion) {
        var horarioA = this.horario;
        var horarioB = prm_horarioSolucion.horario;
        for (var i = 0; i < horarioA.length; i++) {
            if (horarioA[i] != horarioB[i]) // same instances
                return false;
        }
        return true;
    };
    HorarioSolucion.prototype.getCopy = function () {
        return new HorarioSolucion(this.horario.slice(), // same instances
        this.puntaje, this.rating, this.objetivos.slice());
    };
    HorarioSolucion.prototype.toString = function () {
        var str = "[";
        this.horario.forEach(function (element) {
            str += "*" + element.toString() + "*";
        });
        return str + "]";
    };
    return HorarioSolucion;
}()); // HorarioSolucion
var ArrayBestSolutions = /** @class */ (function (_super) {
    __extends(ArrayBestSolutions, _super);
    function ArrayBestSolutions(prm_cantMaxBestSol, items) {
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, ArrayBestSolutions.prototype);
        _this.CANT_MAX_BEST_SOL = prm_cantMaxBestSol;
        items && _this.addItems(items);
        return _this;
    }
    ArrayBestSolutions.prototype.insertOrdered = function (prm_horarioSolucion) {
        var index = this.getSortedIndex(prm_horarioSolucion);
        for (; index < this.length; index++) {
            if (this[index]["puntaje"] == prm_horarioSolucion.puntaje
                && prm_horarioSolucion.equals(this[index])) {
                return;
            }
            else {
                this.splice(index, 0, prm_horarioSolucion);
                if (this.length > this.CANT_MAX_BEST_SOL)
                    this.length = this.CANT_MAX_BEST_SOL;
                return;
            }
        }
        if (this.length == 0) {
            this[0] = prm_horarioSolucion;
            this.length = 1;
        }
    };
    ArrayBestSolutions.prototype.getSortedIndex = function (value) {
        var low = 0, high = this.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            if (this[mid]["puntaje"] > value.puntaje)
                low = mid + 1; // desc array
            else
                high = mid;
        }
        return low;
    };
    ArrayBestSolutions.prototype.serialize = function (items) {
        this.splice(0, this.length);
        this.addItems(items);
    };
    ArrayBestSolutions.prototype.addItems = function (items) {
        var _this = this;
        items.forEach(function (item) { return _this.insertOrdered(item); });
    };
    return ArrayBestSolutions;
}(Array)); // ArrayBestSolutions
var WongEvolutionaryAlgorithm = /** @class */ (function () {
    function WongEvolutionaryAlgorithm(prm_arrAllCursoSeccion, prm_cantMutacionesXIteracion, prm_cantIteraciones, prm_cantSeccionesMutadas, prm_cantBestSolucions) {
        this.arrAllCursoSeccion = prm_arrAllCursoSeccion;
        this.CANT_ITERACIONES = prm_cantIteraciones;
        this.CANT_MUTACIONES_X_ITERACION = prm_cantMutacionesXIteracion;
        this.arrBestSolutions = new ArrayBestSolutions(prm_cantBestSolucions);
        this.hillClimbing = this.hillClimbing_estocastic;
    }
    WongEvolutionaryAlgorithm.prototype.run = function () {
        // PASO 1: Crear una solución vacia
        var solucion = new HorarioSolucion(Array(this.arrAllCursoSeccion.length).fill(null));
        // PASO 2: Para cada cantidad de iteración mutarlo
        for (var i = 0; i < this.CANT_ITERACIONES; i++) {
            // PASO 2.1: Generar mutaciones y aplicar hill climbing
            var arrMutaciones = [];
            var mejorMutacion = solucion;
            for (var j = 0; j < this.CANT_MUTACIONES_X_ITERACION; j++) {
                var mutacion = solucion.getCopy();
                this.mutar(mutacion, this.CANT_SECCIONES_MUTADAS);
                this.hillClimbing(mutacion);
                this.arrBestSolutions.insertOrdered(mutacion);
                arrMutaciones.push(mutacion);
                if (mutacion.puntaje > mejorMutacion.puntaje)
                    mejorMutacion = mutacion;
            }
            solucion = mejorMutacion;
        }
    };
    WongEvolutionaryAlgorithm.prototype.getCross = function (cursoSeccionA, cursoSeccionB) {
        // no verifica si están en el mismo curso
        for (var i = 0; i < cursoSeccionA.horario.length; i++) {
            // (StartA <= EndB) and (EndA >= StartB)
            if ((cursoSeccionA.horario[i][0] != 0 && cursoSeccionB.horario[i][0] != 0) &&
                (cursoSeccionA.horario[i][0] < cursoSeccionB.horario[i][1]) && (cursoSeccionA.horario[i][1] > cursoSeccionB.horario[i][0])) {
                return true;
            }
        }
        return false;
    };
    WongEvolutionaryAlgorithm.prototype.evaluarSolucion = function (prm_horario) {
        var _this = this;
        var horario_size = 6; //prm_horario. .length;
        var cantHuecoAcum = 0;
        var ratingAcum = 0;
        var dificultadAcum = 0;
        var horasNoDesadasAcum = 0;
        var prioridadAcum = 0;
        var cant_curso = 0;
        var horasClase = new Array(horario_size).fill(null).map(function (u) { return ([0]); });
        var limit = new Array(horario_size).fill(null).map(function (u) { return ([0, 0]); });
        var dificultad = new Array(horario_size).fill(null).map(function (u) { return ([0]); });
        prm_horario.forEach(function (element, ind) {
            if (element != null) {
                ratingAcum += element.docente.rating;
                prioridadAcum += element.curso.prioridad;
                cant_curso += 1;
                for (var index = 0; index < element.horario.length; index++) {
                    // cantidad de horas de hueco y horario
                    var dmin = element.horario[index][0], dmax = element.horario[index][1];
                    if (limit[index][0] == 0 || (dmin != 0 && dmin < limit[index][0]))
                        limit[index][0] = dmin;
                    if (limit[index][1] == 0 || (dmax > limit[index][1]))
                        limit[index][1] = dmax;
                    horasClase[index] += (dmax - dmin);
                    dificultad[index] += element.curso.dificultad * (dmax - dmin); // dificultad_maxima
                    if (dmin != 0) {
                        var ind_1 = dmin - 7, finish = dmax - 7;
                        for (; ind_1 < finish; ind_1++) {
                            horasNoDesadasAcum += _this.arrayHorarioHorasNoDeseadas[ind_1][index];
                        }
                    }
                } // for
            } // if
        }); // forEach
        for (var i = 0; i < horario_size; i++) {
            if (limit[i][0] != 0)
                cantHuecoAcum += limit[i][1] - limit[i][0] - horasClase[i];
            dificultadAcum += dificultad[i] - ((dificultad[i] > this.dificultad_maxima) ? this.dificultad_maxima : 0);
        }
        var rating = ratingAcum * this.peso_rating;
        var o1 = -cantHuecoAcum * this.pesos_objetivo[1];
        var o2 = -dificultadAcum * this.pesos_objetivo[2];
        var o3 = -horasNoDesadasAcum * this.pesos_objetivo[3];
        var o4 = -Math.abs(cant_curso - this.numero_desado_cursos) * this.pesos_objetivo[4];
        var o5 = prioridadAcum * this.pesos_objetivo[5];
        return {
            "result": rating + o1 + o2 + o3 + o4 + o5,
            "rating": rating,
            "objetivos": [rating, o1, o2, o3, o4, o5]
        };
    }; // evaluarSolucion
    WongEvolutionaryAlgorithm.prototype.ruleta = function (prm_arrValues) {
        // PASO 1: Hallar la suma del arreglo de valores
        var sum = prm_arrValues.reduce(function (a, b) {
            return a + b;
        }, 0);
        // EXCEPCION: No hay mejores soluciones
        if (sum == 0)
            return -1;
        // PASO 2: Girar la ruleta y ver a que indice le tocó
        var ruleta = Math.random() * sum;
        var acum = 0;
        for (var i = 0; i < prm_arrValues.length; i++) {
            var element = prm_arrValues[i];
            if (element >= acum && element <= (acum += element))
                return i;
        }
    }; // ruleta
    WongEvolutionaryAlgorithm.prototype.hillClimbing_old = function (prm_horario) {
        var _this = this;
        var horario = prm_horario.horario;
        // PASO 1: Generar arreglo con los indices de los cusos vacios del horario
        var arrIndexesUnd = [];
        horario.forEach(function (val, ind) {
            if (val == null)
                arrIndexesUnd.push(ind);
        });
        arrIndexesUnd.shuffle();
        // PASO 2: Por cada indice agregar un curso seccion
        arrIndexesUnd.forEach(function (indiceCambio) {
            // PASO 2.1: Obtener los cursos secciones que no se solapen
            var arrSolFiltradas = _this.arrAllCursoSeccion[indiceCambio].filter(function (val, indCurso) {
                for (var i = 0; i < horario.length; i++) {
                    if (horario[i] != null && _this.getCross(horario[i], val))
                        return false;
                }
                return true;
            });
            if (arrSolFiltradas.length > 0) {
                // PASO 2.2: Evaluar los cursos secciones y escoger uno nuevo mediante la ruleta
                var arrSolFiltradas_valor = [];
                var arrSolFiltradas_valor_result = [];
                for (var j = 0; j < arrSolFiltradas.length; j++) { // recorre soluciones filtradas
                    var nuevoCursoSeccion = arrSolFiltradas[j];
                    var posibleHorario = horario.slice();
                    posibleHorario[indiceCambio] = nuevoCursoSeccion;
                    arrSolFiltradas_valor[j] = _this.evaluarSolucion(posibleHorario);
                    //console.log(arrSolFiltradas_valor[j])
                    arrSolFiltradas_valor_result[j] = (arrSolFiltradas_valor[j].result > 0) ? Math.pow(arrSolFiltradas_valor[j].result, 2) : 0;
                }
                var new_index_element = _this.ruleta(arrSolFiltradas_valor_result);
                // PASO 3.3: Agregar el nuevo curso seccion
                if (new_index_element >= 0) { // si no hay buena solución no inserta
                    horario[indiceCambio] = arrSolFiltradas[new_index_element];
                    prm_horario.puntaje = arrSolFiltradas_valor[new_index_element].result;
                    prm_horario.rating = arrSolFiltradas_valor[new_index_element].rating;
                    prm_horario.objetivos = arrSolFiltradas_valor[new_index_element].objetivos;
                }
            }
        });
    }; // hillClimbing
    WongEvolutionaryAlgorithm.prototype.hillClimbing_estocastic = function (prm_horario) {
        var _this = this;
        var horario = prm_horario.horario;
        var mapeo = [];
        var evalua = [];
        var thisClass = this;
        horario.forEach(function (cursoSecc, indCurso) {
            if (cursoSecc == null) {
                var arrSolFiltradas = _this.arrAllCursoSeccion[indCurso].filter(function (val, indCurso) {
                    for (var i = 0; i < horario.length; i++) {
                        if (horario[i] != null && _this.getCross(horario[i], val))
                            return false;
                    }
                    return true;
                });
                if (arrSolFiltradas.length != 0) {
                    mapeo[indCurso] = arrSolFiltradas;
                    evalua[indCurso] = [];
                    arrSolFiltradas.forEach(function (solFilt, indSecc) {
                        f_evaluacion(indCurso, indSecc, solFilt);
                    });
                }
            }
        });
        function ruleta() {
            var sum = 0;
            evalua.forEach(function (arrCurSecc, indCurs) {
                if (arrCurSecc != null) {
                    arrCurSecc.forEach(function (evaluacion, indCurSec) {
                        sum += evaluacion.result;
                    });
                }
            });
            if (sum <= 0)
                return -1;
            var rSum = Math.floor(Math.random() * sum);
            for (var i = 0; i < evalua.length; i++) {
                var arrCurSecc = evalua[i];
                if (arrCurSecc != null) {
                    for (var j = 0; j < arrCurSecc.length; j++) {
                        var evaluacion = arrCurSecc[j];
                        if (rSum <= 0) {
                            return {
                                "indCurs": i,
                                "indSecc": j
                            };
                        }
                        rSum -= evaluacion.result;
                    }
                }
            }
            return -1;
        }
        function f_evaluacion(indCurs, indCurSec, cursoSecc) {
            horario[indCurs] = cursoSecc;
            var ev = thisClass.evaluarSolucion(horario);
            horario[indCurs] = null;
            evalua[indCurs][indCurSec] = ev;
        }
        var _loop_1 = function () {
            var leRulete = ruleta();
            if (leRulete == -1)
                return "break";
            leRulete = leRulete;
            var indCursIns = leRulete.indCurs, indSeccIns = leRulete.indSecc;
            var nuevaSecc = mapeo[indCursIns][indSeccIns];
            horario[indCursIns] = nuevaSecc;
            var ev = evalua[indCursIns][indSeccIns];
            prm_horario.puntaje = ev.result;
            prm_horario.rating = ev.rating;
            prm_horario.objetivos = ev.objetivos;
            mapeo[indCursIns] = null;
            evalua[indCursIns] = null;
            mapeo.forEach(function (arrCurSecc, indCurs) {
                if (arrCurSecc != null) {
                    for (var indCurSec = arrCurSecc.length; indCurSec--;) {
                        var cursoSeccion = arrCurSecc[indCurSec];
                        if (_this.getCross(cursoSeccion, nuevaSecc)) {
                            arrCurSecc.splice(indCurSec, 1);
                            evalua[indCurs].splice(indCurSec, 1);
                        }
                        else {
                            f_evaluacion(indCurs, indCurSec, cursoSeccion);
                        }
                    }
                }
            });
        };
        while (true) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
    }; // hillClimbing
    WongEvolutionaryAlgorithm.prototype.mutar = function (prm_horario, cantIndicesMutacion) {
        var _this = this;
        var horario = prm_horario.horario;
        // PASO 1: Seleccionar un curso y curso seccion aleatorio
        var indMutacion = Math.floor(Math.random() * horario.length);
        var cursoSeccion = this.arrAllCursoSeccion[indMutacion][Math.floor(Math.random() * this.arrAllCursoSeccion[indMutacion].length)];
        // PASO 2: Borrar todos los cursos secciones que se solapan con nuevo curso seccion
        horario.forEach(function (element, ind) {
            if (element != null && (indMutacion == ind || _this.getCross(cursoSeccion, element)))
                horario[ind] = null;
        });
        // PASO 3: Guardar el nuevo curso seccion
        horario[indMutacion] = cursoSeccion;
    }; // mutar
    return WongEvolutionaryAlgorithm;
}());
// TODO
var CliqueAlgorithm = /** @class */ (function () {
    function CliqueAlgorithm(arrAllCursoSeccion) {
        throw new Error("Method not implemented.");
    }
    CliqueAlgorithm.prototype.getCross = function (cursoSeccionA, cursoSeccionB) {
        if (cursoSeccionA.curso == cursoSeccionB.curso)
            return true;
        for (var i = 0; i < cursoSeccionA.horario.length; i++) {
            // (StartA <= EndB) and (EndA >= StartB)
            if ((cursoSeccionA.horario[i][0] != 0 && cursoSeccionB.horario[i][0] != 0) &&
                (cursoSeccionA.horario[i][0] < cursoSeccionB.horario[i][1]) && (cursoSeccionA.horario[i][1] > cursoSeccionB.horario[i][0])) {
                return true;
            }
        }
        return false;
    };
    CliqueAlgorithm.prototype.evaluarSolucion = function (clique) {
        var _this = this;
        var horario_size = clique[0].horario.length;
        var cantHuecoAcum = 0;
        var ratingAcum = 0;
        var dificultadAcum = 0;
        var horasNoDesadasAcum = 0;
        var prioridadAcum = 0;
        var horasClase = Array(horario_size).fill([0]);
        var limit = Array(horario_size).fill([[0, 0]]);
        var dificultad = Array(horario_size).fill([0]);
        clique.forEach(function (element) {
            ratingAcum += element.docente.rating;
            prioridadAcum += element.curso.prioridad;
            var _loop_2 = function (index) {
                var dmin = element.horario[index][0];
                var dmax = element.horario[index][1];
                limit[index] = [
                    (limit[index][0] == 0 || (dmin != 0 && dmin < limit[index][0])) ? dmin : limit[index][0],
                    (limit[index][1] == 0 || (dmax > limit[index][1])) ? dmax : limit[index][1]
                ];
                horasClase[index] += element.horario[index][1] - element.horario[index][0];
                dificultad[index] += element.curso.dificultad * (dmax - dmin); // dificultad_maxima
                horasNoDesadasAcum += (dmin != 0) ? _this.arrayHorarioHorasNoDeseadas.filter(function (val, ind) {
                    return ind >= dmin - 7 && ind <= dmax - 7;
                }).reduce(function (valA, valB) {
                    return valA + valB;
                }) : 0; // horasNoDesadasAcum
            };
            for (var index = 0; index < horario_size; index++) {
                _loop_2(index);
            }
        }); // clique.forEach
        for (var i = 0; i < horario_size; i++) {
            if (limit[i][0] != 0)
                cantHuecoAcum += limit[i][1] - limit[i][0] - horasClase[i];
            dificultadAcum += dificultad[i] - ((dificultad[i] > this.dificultad_maxima) ? this.dificultad_maxima : 0);
        }
        var rating = ratingAcum * this.peso_rating;
        var o1 = -cantHuecoAcum * this.pesos_objetivo[1];
        var o2 = -dificultadAcum * this.pesos_objetivo[2];
        var o3 = -horasNoDesadasAcum * this.pesos_objetivo[3];
        var o4 = -Math.abs(clique.length - this.numero_desado_cursos) * this.pesos_objetivo[4];
        var o5 = prioridadAcum * this.pesos_objetivo[5];
        return {
            "result": rating + o1 + o2 + o3 + o4 + o5,
            "rating": rating,
            "objetivos": [rating, o1, o2, o3, o4, o5]
        };
    }; // evaluar
    CliqueAlgorithm.prototype.run = function () {
        throw new Error("Method not implemented.");
    };
    return CliqueAlgorithm;
}());
var HorarioManager = /** @class */ (function () {
    function HorarioManager(dificultad_maxima, numero_desado_cursos, peso_rating, po1, po2, po3, po4, po5) {
        if (dificultad_maxima === void 0) { dificultad_maxima = 100; }
        if (numero_desado_cursos === void 0) { numero_desado_cursos = 6; }
        if (peso_rating === void 0) { peso_rating = 100; }
        if (po1 === void 0) { po1 = 3; }
        if (po2 === void 0) { po2 = 3; }
        if (po3 === void 0) { po3 = 3; }
        if (po4 === void 0) { po4 = 3; }
        if (po5 === void 0) { po5 = 0; }
        this.cliques = [];
        this.dificultad_maxima = dificultad_maxima;
        this.numero_desado_cursos = numero_desado_cursos;
        this.peso_rating = peso_rating;
        this.pesos_objetivo = [0, po1, po2, po3, po4, po5];
        this.soluciones = [];
        this.load_data();
    }
    HorarioManager.prototype.load_data = function () {
        var curso_1 = new Curso('Curso 1', 8, 4);
        var curso_2 = new Curso('Curso 2', 8, 3);
        var curso_3 = new Curso('Curso 3', 8, 3);
        var curso_4 = new Curso('Curso 4', 8, 2);
        var curso_5 = new Curso('Curso 5', 8, 5);
        var curso_6 = new Curso('Curso 6', 8, 2);
        var curso_7 = new Curso('Curso 7', 8, 4);
        var curso_8 = new Curso('Curso 8', 8, 4);
        var curso_9 = new Curso('Curso 9', 8, 2);
        var docente_curso_1_Seccion_1 = new Docente('Pepe', 4);
        var docente_curso_2_Seccion_1 = new Docente('Pepe', 5);
        var docente_curso_3_Seccion_1 = new Docente('Pepe', 3);
        var docente_curso_4_Seccion_1 = new Docente('Pepe', 3);
        var docente_curso_4_Seccion_2 = new Docente('Pepe', 3);
        var docente_curso_5_Seccion_1 = new Docente('Pepe', 5);
        var docente_curso_6_Seccion_1 = new Docente('Pepe', 5);
        var docente_curso_6_Seccion_2 = new Docente('Pepe', 4);
        var docente_curso_7_Seccion_1 = new Docente('Pepe', 3);
        var docente_curso_8_Seccion_1 = new Docente('Pepe', 4);
        var docente_curso_9_Seccion_1 = new Docente('Pepe', 2);
        var docente_curso_9_Seccion_2 = new Docente('Pepe', 3);
        var arr_docentes = [];
        arr_docentes.push(docente_curso_1_Seccion_1);
        arr_docentes.push(docente_curso_2_Seccion_1);
        arr_docentes.push(docente_curso_3_Seccion_1);
        arr_docentes.push(docente_curso_4_Seccion_1);
        arr_docentes.push(docente_curso_4_Seccion_2);
        arr_docentes.push(docente_curso_5_Seccion_1);
        arr_docentes.push(docente_curso_6_Seccion_1);
        arr_docentes.push(docente_curso_6_Seccion_2);
        arr_docentes.push(docente_curso_7_Seccion_1);
        arr_docentes.push(docente_curso_8_Seccion_1);
        arr_docentes.push(docente_curso_9_Seccion_1);
        arr_docentes.push(docente_curso_9_Seccion_2);
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        function creacion_random(cantidad_cursos, cantidad_secciones) {
            var i, cursillo, j, ticha, chedule, cant_oras, ora_inisio, cursillo_seccion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < cantidad_cursos)) return [3 /*break*/, 6];
                        cursillo = new Curso("Curso " + (i + 10), 8, getRndInteger(2, 5));
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < cantidad_secciones)) return [3 /*break*/, 5];
                        ticha = arr_docentes[getRndInteger(0, arr_docentes.length)];
                        chedule = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
                        cant_oras = getRndInteger(2, 3);
                        ora_inisio = getRndInteger(7, 22 - cant_oras);
                        chedule[getRndInteger(0, chedule)] = [ora_inisio, ora_inisio + cant_oras];
                        cursillo_seccion = new CursoSeccion(cursillo, j + 1, ticha, chedule);
                        console.log("generador random " + cursillo_seccion);
                        return [4 /*yield*/, cursillo_seccion];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        j++;
                        return [3 /*break*/, 2];
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        }
        //																		    L	    M	    MI		 J	  	V		S
        var curso_1_Seccion_1 = new CursoSeccion(curso_1, 1, docente_curso_1_Seccion_1, [[0, 0], [0, 0], [18, 20], [0, 0], [18, 20], [0, 0]]);
        var curso_2_Seccion_1 = new CursoSeccion(curso_2, 1, docente_curso_2_Seccion_1, [[0, 0], [0, 0], [13, 16], [0, 0], [14, 16], [0, 0]]);
        var curso_3_Seccion_1 = new CursoSeccion(curso_3, 1, docente_curso_3_Seccion_1, [[0, 0], [0, 0], [0, 0], [0, 0], [20, 22], [9, 11]]);
        var curso_4_Seccion_1 = new CursoSeccion(curso_4, 1, docente_curso_4_Seccion_1, [[0, 0], [18, 20], [0, 0], [0, 0], [0, 0], [14, 16]]);
        var curso_4_Seccion_2 = new CursoSeccion(curso_4, 2, docente_curso_4_Seccion_2, [[0, 0], [0, 0], [0, 0], [20, 22], [20, 22], [0, 0]]);
        var curso_5_Seccion_1 = new CursoSeccion(curso_5, 1, docente_curso_5_Seccion_1, [[7, 10], [0, 0], [7, 10], [0, 0], [0, 0], [0, 0]]);
        var curso_6_Seccion_1 = new CursoSeccion(curso_6, 1, docente_curso_6_Seccion_1, [[7, 10], [0, 0], [0, 0], [0, 0], [18, 22], [0, 0]]);
        var curso_6_Seccion_2 = new CursoSeccion(curso_6, 2, docente_curso_6_Seccion_2, [[0, 0], [7, 11], [0, 0], [7, 10], [0, 0], [0, 0]]);
        var curso_7_Seccion_1 = new CursoSeccion(curso_7, 1, docente_curso_7_Seccion_1, [[0, 0], [7, 9], [0, 0], [7, 9], [0, 0], [0, 0]]);
        var curso_8_Seccion_1 = new CursoSeccion(curso_8, 1, docente_curso_8_Seccion_1, [[0, 0], [0, 0], [13, 16], [0, 0], [14, 16], [0, 0]]);
        var curso_9_Seccion_1 = new CursoSeccion(curso_9, 1, docente_curso_9_Seccion_1, [[7, 10], [0, 0], [0, 0], [7, 9], [0, 0], [0, 0]]);
        var curso_9_Seccion_2 = new CursoSeccion(curso_9, 2, docente_curso_9_Seccion_2, [[0, 0], [0, 0], [18, 22], [0, 0], [14, 16], [0, 0]]);
        // curso_X_Seccion_X = CursoSeccion(curso_X, 2, 'profe X', [( 0, 0),( 0, 0),( 0, 0),( 0, 0),( 0, 0),( 0, 0)])
        var arrayCursosSeccion = [];
        arrayCursosSeccion.push(curso_1_Seccion_1);
        arrayCursosSeccion.push(curso_2_Seccion_1);
        arrayCursosSeccion.push(curso_3_Seccion_1);
        arrayCursosSeccion.push(curso_4_Seccion_1);
        arrayCursosSeccion.push(curso_4_Seccion_2);
        arrayCursosSeccion.push(curso_5_Seccion_1);
        arrayCursosSeccion.push(curso_6_Seccion_1);
        arrayCursosSeccion.push(curso_6_Seccion_2);
        arrayCursosSeccion.push(curso_7_Seccion_1);
        arrayCursosSeccion.push(curso_8_Seccion_1);
        arrayCursosSeccion.push(curso_9_Seccion_1);
        arrayCursosSeccion.push(curso_9_Seccion_2);
        this.arrAllCursoSeccion = [];
        var arrAux = [];
        arrAux.push(curso_1_Seccion_1);
        this.arrAllCursoSeccion[0] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_2_Seccion_1);
        this.arrAllCursoSeccion[1] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_3_Seccion_1);
        this.arrAllCursoSeccion[2] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_4_Seccion_1);
        arrAux.push(curso_4_Seccion_2);
        this.arrAllCursoSeccion[3] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_5_Seccion_1);
        this.arrAllCursoSeccion[4] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_6_Seccion_1);
        arrAux.push(curso_6_Seccion_2);
        this.arrAllCursoSeccion[5] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_7_Seccion_1);
        this.arrAllCursoSeccion[6] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_8_Seccion_1);
        this.arrAllCursoSeccion[7] = arrAux.slice();
        arrAux = [];
        arrAux.push(curso_9_Seccion_1);
        arrAux.push(curso_9_Seccion_2);
        this.arrAllCursoSeccion[8] = arrAux.slice();
        this.arrayHorarioHorasNoDeseadas =
            [
                [3, 3, 3, 3, 3, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 0, 10],
                [0, 0, 0, 0, 5, 10],
                [2, 2, 2, 2, 5, 10]
            ];
        return arrayCursosSeccion;
    }; // load_data
    HorarioManager.prototype.runWEA = function (prm_cantIteraciones, prm_cantMutacionesXIteracion, prm_cantSeccionesMutadas, prm_cantBestSolucions) {
        if (prm_cantIteraciones === void 0) { prm_cantIteraciones = 100; }
        if (prm_cantMutacionesXIteracion === void 0) { prm_cantMutacionesXIteracion = 50; }
        if (prm_cantSeccionesMutadas === void 0) { prm_cantSeccionesMutadas = 1; }
        if (prm_cantBestSolucions === void 0) { prm_cantBestSolucions = 50; }
        var start_time = new Date();
        var wea = new WongEvolutionaryAlgorithm(this.arrAllCursoSeccion, prm_cantMutacionesXIteracion, prm_cantIteraciones, prm_cantSeccionesMutadas, prm_cantBestSolucions);
        wea.dificultad_maxima = this.dificultad_maxima;
        wea.numero_desado_cursos = this.numero_desado_cursos;
        wea.peso_rating = this.peso_rating;
        wea.pesos_objetivo = this.pesos_objetivo;
        wea.arrayHorarioHorasNoDeseadas = this.arrayHorarioHorasNoDeseadas;
        wea.run();
        console.log("--- Tiempo de calculo del puntaje:  " + (new Date().getTime() - start_time.getTime()) * 0.001 + " segundos ---");
        var arr = wea.arrBestSolutions;
        for (var i = 0; i < 10 && i < arr.length; i++) {
            var element = arr[i];
            console.log(element);
        }
    };
    return HorarioManager;
}()); // HorarioManager
var horarioManager = new HorarioManager();
horarioManager.runWEA();
