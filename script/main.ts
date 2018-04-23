import * as nx from './jsnetworkx';

declare global {
	interface Array<T> {
		shuffle(): Array<T>,
		fill(prm);
	}
}

Array.prototype.shuffle = function () {
	for (let i = this.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}
	return this;
}

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




class Curso {
	nomCurso: string;
	ciclo: number;
	dificultad: number;
	prioridad: number;
	caracter: string;

	constructor(nomCurso: string, ciclo: number, dificultad: number, prioridad: number = 3, caracter: string = "O") {
		this.nomCurso = nomCurso;
		this.ciclo = ciclo;
		this.dificultad = dificultad;
		this.prioridad = prioridad;
		this.caracter = caracter;
	}

}


class CursoSeccion {
	curso: Curso;
	seccion: number
	docente: Docente
	horario: Array<number[]>
	vecinos: Array<CursoSeccion>

	constructor(curso: Curso, seccion: number, docente: Docente, horario: Array<number[]>) {
		this.curso = curso;
		this.seccion = seccion;
		this.docente = docente;
		this.horario = horario;
	}

	toString() {
		return this.curso.nomCurso + "-Sec" + this.seccion;
	}

}

class Docente {
	nomDocente: string;
	rating: number;

	constructor(nomDocente: string, rating: number = 3) {
		this.nomDocente = nomDocente
		this.rating = rating
	}

}
// TODO
class SolucionClique { // representa un clique
	solucion
	resultado
	rating
	objetivos
	_horario

	constructor(solucion, resultado, rating, objetivos) {
		this.solucion = solucion //# clique
		this.resultado = resultado
		this.rating = rating
		this.objetivos = objetivos
	}

	getHorario() {
		if (this._horario == undefined)
			this._horario = Array(22 - 7).fill(
				Array(this.solucion[0].horario).fill([undefined])
			)
	}

	__lt__(self, other) { // TODO
		//return self.result < other.result
	}

	toString() {
		return `Solución ${this.solucion}, resultado ${this.resultado}, rating ${this.rating},
                    o1 ${this.objetivos[0]}, o2 ${this.objetivos[1]}, o3 ${this.objetivos[2]}, o4 ${this.objetivos[3]}, o5 ${this.objetivos[4]}`;
	}
}


class HorarioSolucion {
	horario: Array<CursoSeccion>;
	puntaje: number;
	rating: number;
	objetivos: Array<number>

	constructor(horario: Array<CursoSeccion>, puntaje: number = 0, rating: number = 0, objetivos: Array<number> = []) {
		this.horario = horario;
		this.puntaje = puntaje;
		this.rating = rating;
		this.objetivos = objetivos;
	}
	
	equals(prm_horarioSolucion: HorarioSolucion) {
		const horarioA = this.horario;
		const horarioB = prm_horarioSolucion.horario;
		for (let i = 0; i < horarioA.length; i++) {
			if (horarioA[i] != horarioB[i]) // same instances
				return false;
		}
		return true;
	}
	getCopy(): HorarioSolucion {
		return new HorarioSolucion(
			this.horario.slice(), // same instances
			this.puntaje,
			this.rating,
			this.objetivos.slice()
		);
	}

	toString() {
		var str = "[";
		this.horario.forEach(element => {
			str += "*" + element.toString() + "*"
		});
		return str + "]";
	}
} // HorarioSolucion


class ArrayBestSolutions<HorarioSolucion> extends Array<HorarioSolucion> {

	private CANT_MAX_BEST_SOL: number;
	constructor(prm_cantMaxBestSol: number, items?: HorarioSolucion[]){
		//super();
		super(...items);
		(<any>Object).setPrototypeOf(this, ArrayBestSolutions.prototype);
		this.CANT_MAX_BEST_SOL = prm_cantMaxBestSol;
        items && this.addItems(items);
	}
	insertOrdered(prm_horarioSolucion) {
		let index = this.getSortedIndex(prm_horarioSolucion);
		for (; index < this.length; index++) {
			if (this[index]["puntaje"] == prm_horarioSolucion.puntaje
				&& prm_horarioSolucion.equals(this[index])) {
					return;
			} else {
				this.splice(index, 0, prm_horarioSolucion);
				if (this.length > this.CANT_MAX_BEST_SOL)
					this.length = this.CANT_MAX_BEST_SOL;
				return;
			}
		}
		if (this.length==0) {
			this[0] = prm_horarioSolucion
			this.length = 1
		}

	}

	private getSortedIndex(value) {
		var low = 0,
			high = this.length;
	
		while (low < high) {
			var mid = (low + high) >>> 1;
			if (this[mid]["puntaje"] > value.puntaje) low = mid + 1; // desc array
			else high = mid;
		}
		return low;
	}

	public serialize(items: HorarioSolucion[]): void {
        this.splice(0, this.length);
        this.addItems(items);
    }

	private addItems(items: HorarioSolucion[]) {
        items.forEach(item => this.insertOrdered(item));
    }


} // ArrayBestSolutions




interface AlgorithmRunner {
	dificultad_maxima: number;
	numero_desado_cursos: number;
	peso_rating
	pesos_objetivo
	soluciones
	arrayHorarioHorasNoDeseadas
	arrAllCursoSeccion: Array<Array<CursoSeccion>>;

	getCross(cursoSeccionA: CursoSeccion, cursoSeccionB: CursoSeccion) : boolean;
	evaluarSolucion(prm);
	run();
}  

class WEA implements AlgorithmRunner {

	dificultad_maxima: number;
	numero_desado_cursos: number;
	peso_rating: any;
	pesos_objetivo: any;
	soluciones: any;
	arrayHorarioHorasNoDeseadas: any;
	arrAllCursoSeccion: CursoSeccion[][];


	CANT_ITERACIONES : number;
	CANT_MUTACIONES_X_ITERACION: number;
	CANT_SECCIONES_MUTADAS: number;
	arrBestSolutions : ArrayBestSolutions<HorarioSolucion>;

	constructor(prm_arrAllCursoSeccion: CursoSeccion[][], prm_arrayHorarioHorasNoDeseadas, prm_cantIteraciones: number, prm_cantSeccionesMutadas: number, prm_cantBestSolucions: number) {
		this.arrAllCursoSeccion = prm_arrAllCursoSeccion;
		this.CANT_ITERACIONES = prm_cantIteraciones;
		this.CANT_MUTACIONES_X_ITERACION = 1;
		this.arrayHorarioHorasNoDeseadas = prm_arrayHorarioHorasNoDeseadas;
		this.arrBestSolutions = new ArrayBestSolutions(prm_cantBestSolucions);
	}

	run() {
		// PASO 1: Crear una solución vacia
		var solucion = new HorarioSolucion( Array(this.arrAllCursoSeccion.length).fill(null));

		// PASO 2: Para cada cantidad de iteración mutarlo
		for (let i = 0; i < this.CANT_ITERACIONES; i++) {
			// PASO 2.1: Generar mutaciones y aplicar hill climbing
			let arrMutaciones = [];
			var mejorMutacion = solucion;
			for (let j = 0; j < this.CANT_MUTACIONES_X_ITERACION; j++) {
				let mutacion = solucion.getCopy();
				this.mutar(mutacion, this.CANT_SECCIONES_MUTADAS);
				this.hillClimbing(mutacion);
				this.arrBestSolutions.insertOrdered(mutacion);
				arrMutaciones.push(mutacion);
				if (mutacion.puntaje > mejorMutacion.puntaje)
					mejorMutacion = mutacion
			}
			solucion = mejorMutacion
		}
	}

	getCross(cursoSeccionA: CursoSeccion, cursoSeccionB: CursoSeccion) { 
		// no verifica si están en el mismo curso
		for (let i = 0; i < cursoSeccionA.horario.length; i++) {
			// (StartA <= EndB) and (EndA >= StartB)
			if ((cursoSeccionA.horario[i][0] != 0 && cursoSeccionB.horario[i][0] != 0) &&
				(cursoSeccionA.horario[i][0] < cursoSeccionB.horario[i][1]) && (cursoSeccionA.horario[i][1] > cursoSeccionB.horario[i][0])) {
				return true;
			}
		}
		return false;
	}
	
	evaluarSolucion(prm_horario: Array<CursoSeccion>) {
		let horario_size: number = 6//prm_horario. .length;
		let cantHuecoAcum = 0
		let ratingAcum = 0
		let dificultadAcum = 0
		let horasNoDesadasAcum = 0
		let prioridadAcum = 0
		let cant_curso = 0

		let horasClase = new Array(horario_size).fill(null).map(u => ([0]));
		let limit: Array<Array<number>> = new Array(horario_size).fill(null).map(u => ([0, 0]));
		let dificultad: Array<number> = new Array(horario_size).fill(null).map(u => ([0]));

		prm_horario.forEach((element, ind) => {
			if (element != null) {
				ratingAcum += element.docente.rating
				prioridadAcum += element.curso.prioridad
				cant_curso += 1
				for (let index = 0; index < element.horario.length; index++) {
					// cantidad de horas de hueco y horario
					var dmin = element.horario[index][0],
						dmax =  element.horario[index][1];

					if ( limit[index][0] == 0 || (dmin != 0 && dmin < limit[index][0]) ) limit[index][0] = dmin
					if ( limit[index][1] == 0 || (dmax > limit[index][1]) ) limit[index][1] = dmax

					horasClase[index] += (dmax - dmin)
					dificultad[index] += element.curso.dificultad * (dmax - dmin) // dificultad_maxima
					if (dmin != 0)
						horasNoDesadasAcum += this.arrayHorarioHorasNoDeseadas.filter((val, ind) => {
							return ind >= dmin - 7 && ind <= dmax - 7
						}).reduce(function (valA, valB) {
							//console.log(valA)
							return valA[index] + valB[index];
						}); // horasNoDesadasAcum
				} // for
			} // if
		}); // forEach

		for (let i = 0; i < horario_size; i++) {
			if (limit[i][0] != 0)
				cantHuecoAcum += limit[i][1] - limit[i][0] - horasClase[i]
			dificultadAcum += dificultad[i] - ((dificultad[i] > this.dificultad_maxima) ? this.dificultad_maxima : 0);
		}

		let rating = ratingAcum * this.peso_rating
		let o1 = - cantHuecoAcum * this.pesos_objetivo[1]
		let o2 = - dificultadAcum * this.pesos_objetivo[2]
		let o3 = - horasNoDesadasAcum * this.pesos_objetivo[3]
		let o4 = - Math.abs(cant_curso - this.numero_desado_cursos) * this.pesos_objetivo[4]
		let o5 = prioridadAcum * this.pesos_objetivo[5]
		return {
			"result": rating + o1 + o2 + o3 + o4 + o5,
			"rating": rating,
			"objetivos": [rating, o1, o2, o3, o4, o5]
		}
	} // evaluarSolucion

	ruleta(prm_arrValues: Array<number>) {
		
		// PASO 1: Hallar la suma del arreglo de valores
		var sum = prm_arrValues.reduce((a, b) => {
			return a + b; 
		}, 0);

		// EXCEPCION: No hay mejores soluciones
		if (sum == 0) return -1;

		// PASO 2: Girar la ruleta y ver a que indice le tocó
		var ruleta = Math.random() * sum;
		var acum = 0;
		for (let i = 0; i < prm_arrValues.length; i++) {
			const element = prm_arrValues[i];
			if (element >= acum && element <= (acum += element))
				return i;
		}
	} // ruleta

	hillClimbing(prm_horario: HorarioSolucion) : void {
		const horario = prm_horario.horario;

		// PASO 1: Generar arreglo con los indices de los cusos vacios del horario
		var arrIndexesUnd: Array<number> = [];
		horario.forEach((val, ind) => {
			if (val == null)
				arrIndexesUnd.push(ind);
		});
		arrIndexesUnd.shuffle();

		// PASO 2: Por cada indice agregar un curso seccion
		arrIndexesUnd.forEach( indiceCambio => {
			// PASO 2.1: Obtener los cursos secciones que no se solapen
			let arrSolFiltradas = this.arrAllCursoSeccion[indiceCambio].filter((val: CursoSeccion, indCurso) => {
				for (let i = 0; i < horario.length; i++) {
					if (horario[i] != null && this.getCross(horario[i], val))
						return false;
				}
				return true;
			});
			if (arrSolFiltradas.length > 0) {
			// PASO 2.2: Evaluar los cursos secciones y escoger uno nuevo mediante la ruleta
				let arrSolFiltradas_valor = []
				let arrSolFiltradas_valor_result = []
				for (let j = 0; j < arrSolFiltradas.length; j++) { // recorre soluciones filtradas
					const nuevoCursoSeccion = arrSolFiltradas[j];
					let posibleHorario = horario.slice()
					posibleHorario[indiceCambio] = nuevoCursoSeccion;
					arrSolFiltradas_valor[j] = this.evaluarSolucion(posibleHorario);
					//console.log(arrSolFiltradas_valor[j])
					arrSolFiltradas_valor_result[j] = (arrSolFiltradas_valor[j].result > 0) ? Math.pow(arrSolFiltradas_valor[j].result, 2) : 0;
				}
				const new_index_element = this.ruleta(arrSolFiltradas_valor_result);
			// PASO 3.3: Agregar el nuevo curso seccion
				if (new_index_element >= 0) { // si no hay buena solución no inserta
					horario[indiceCambio] = arrSolFiltradas[new_index_element]
					prm_horario.puntaje = arrSolFiltradas_valor[new_index_element].result
					prm_horario.rating = arrSolFiltradas_valor[new_index_element].rating
					prm_horario.objetivos = arrSolFiltradas_valor[new_index_element].objetivos
				}
			}
		});
	} // hillClimbing

	mutar(prm_horario: HorarioSolucion, cantIndicesMutacion: number): void {
		const horario = prm_horario.horario;
		// PASO 1: Seleccionar un curso y curso seccion aleatorio
		let indMutacion = Math.floor(Math.random() * horario.length);
		let cursoSeccion: CursoSeccion = this.arrAllCursoSeccion[indMutacion][Math.floor(Math.random() * this.arrAllCursoSeccion[indMutacion].length)];
		// PASO 2: Borrar todos los cursos secciones que se solapan con nuevo curso seccion
		horario.forEach((element, ind) => {
			if (element != null && (indMutacion == ind || this.getCross(cursoSeccion, element) ))
				horario[ind] = null;
		});
		// PASO 3: Guardar el nuevo curso seccion
		horario[indMutacion] = cursoSeccion;
	} // mutar
}

// TODO
class CliqueAlgorithm implements AlgorithmRunner {
	constructor(arrAllCursoSeccion: CursoSeccion[][]) {
		throw new Error("Method not implemented.");
	}
	dificultad_maxima: number;
	numero_desado_cursos: number;
	peso_rating: any;
	pesos_objetivo: any;
	soluciones: any;
	arrayHorarioHorasNoDeseadas: any;
	arrAllCursoSeccion: CursoSeccion[][];

	getCross(cursoSeccionA: CursoSeccion, cursoSeccionB: CursoSeccion): boolean {
		if (cursoSeccionA.curso == cursoSeccionB.curso)
			return true;
		for (let i = 0; i < cursoSeccionA.horario.length; i++) {
			// (StartA <= EndB) and (EndA >= StartB)
			if ((cursoSeccionA.horario[i][0] != 0 && cursoSeccionB.horario[i][0] != 0) &&
				(cursoSeccionA.horario[i][0] < cursoSeccionB.horario[i][1]) && (cursoSeccionA.horario[i][1] > cursoSeccionB.horario[i][0])) {
				return true;
			}
		}
		return false;
	}

	evaluarSolucion(clique) {
		let horario_size: number = clique[0].horario.length;
		let cantHuecoAcum = 0
		let ratingAcum = 0
		let dificultadAcum = 0
		let horasNoDesadasAcum = 0
		let prioridadAcum = 0

		let horasClase = Array(horario_size).fill([0])
		let limit = Array(horario_size).fill([[0, 0]])
		let dificultad: Array<number> = Array(horario_size).fill([0])

		clique.forEach(element => {
			ratingAcum += element.docente.rating
			prioridadAcum += element.curso.prioridad
			for (let index = 0; index < horario_size; index++) {  // cantidad de horas de hueco y horaio
				let dmin = element.horario[index][0]
				let dmax = element.horario[index][1]
				limit[index] = [
					(limit[index][0] == 0 || (dmin != 0 && dmin < limit[index][0])) ? dmin : limit[index][0],
					(limit[index][1] == 0 || (dmax > limit[index][1])) ? dmax : limit[index][1]
				];
				horasClase[index] += element.horario[index][1] - element.horario[index][0]
				dificultad[index] += element.curso.dificultad * (dmax - dmin) // dificultad_maxima
				horasNoDesadasAcum += (dmin != 0) ? this.arrayHorarioHorasNoDeseadas.filter((val, ind) => {
					return ind >= dmin - 7 && ind <= dmax - 7
				}).reduce(function (valA, valB) {
					return valA + valB;
				}) : 0; // horasNoDesadasAcum
			}
		}); // clique.forEach

		for (let i = 0; i < horario_size; i++) {
			if (limit[i][0] != 0)
				cantHuecoAcum += limit[i][1] - limit[i][0] - horasClase[i]
			dificultadAcum += dificultad[i] - ((dificultad[i] > this.dificultad_maxima) ? this.dificultad_maxima : 0);
		}

		let rating = ratingAcum * this.peso_rating
		let o1 = - cantHuecoAcum * this.pesos_objetivo[1]
		let o2 = - dificultadAcum * this.pesos_objetivo[2]
		let o3 = - horasNoDesadasAcum * this.pesos_objetivo[3]
		let o4 = - Math.abs(clique.length - this.numero_desado_cursos) * this.pesos_objetivo[4]
		let o5 = prioridadAcum * this.pesos_objetivo[5]

		return {
			"result": rating + o1 + o2 + o3 + o4 + o5,
			"rating": rating,
			"objetivos": [rating, o1, o2, o3, o4, o5]
		}
	} // evaluar

	run() {
		throw new Error("Method not implemented.");
	}
}



class HorarioManager {

	cliques
	dificultad_maxima: number;
	numero_desado_cursos: number;
	peso_rating
	pesos_objetivo
	soluciones
	arrayHorarioHorasNoDeseadas
	arrAllCursoSeccion: Array<Array<CursoSeccion>>;

	constructor(dificultad_maxima = 100, numero_desado_cursos = 6, peso_rating = 100, po1 = 3, po2 = 3, po3 = 3, po4 = 3, po5 = 0) {
		this.cliques = []
		this.dificultad_maxima = dificultad_maxima
		this.numero_desado_cursos = numero_desado_cursos
		this.peso_rating = peso_rating
		this.pesos_objetivo = [0, po1, po2, po3, po4, po5]

		this.soluciones = []
		this.load_data();
	}

	load_data(): Array<CursoSeccion> {
		let curso_1 = new Curso('Curso 1', 8, 4)
		let curso_2 = new Curso('Curso 2', 8, 3)
		let curso_3 = new Curso('Curso 3', 8, 3)
		let curso_4 = new Curso('Curso 4', 8, 2)
		let curso_5 = new Curso('Curso 5', 8, 5)
		let curso_6 = new Curso('Curso 6', 8, 2)
		let curso_7 = new Curso('Curso 7', 8, 4)
		let curso_8 = new Curso('Curso 8', 8, 4)
		let curso_9 = new Curso('Curso 9', 8, 2)

		let docente_curso_1_Seccion_1 = new Docente('Pepe', 4)
		let docente_curso_2_Seccion_1 = new Docente('Pepe', 5)
		let docente_curso_3_Seccion_1 = new Docente('Pepe', 3)
		let docente_curso_4_Seccion_1 = new Docente('Pepe', 3)
		let docente_curso_4_Seccion_2 = new Docente('Pepe', 3)
		let docente_curso_5_Seccion_1 = new Docente('Pepe', 5)
		let docente_curso_6_Seccion_1 = new Docente('Pepe', 5)
		let docente_curso_6_Seccion_2 = new Docente('Pepe', 4)
		let docente_curso_7_Seccion_1 = new Docente('Pepe', 3)
		let docente_curso_8_Seccion_1 = new Docente('Pepe', 4)
		let docente_curso_9_Seccion_1 = new Docente('Pepe', 2)
		let docente_curso_9_Seccion_2 = new Docente('Pepe', 3)

		let arr_docentes = []
		arr_docentes.push(docente_curso_1_Seccion_1)
		arr_docentes.push(docente_curso_2_Seccion_1)
		arr_docentes.push(docente_curso_3_Seccion_1)
		arr_docentes.push(docente_curso_4_Seccion_1)
		arr_docentes.push(docente_curso_4_Seccion_2)
		arr_docentes.push(docente_curso_5_Seccion_1)
		arr_docentes.push(docente_curso_6_Seccion_1)
		arr_docentes.push(docente_curso_6_Seccion_2)
		arr_docentes.push(docente_curso_7_Seccion_1)
		arr_docentes.push(docente_curso_8_Seccion_1)
		arr_docentes.push(docente_curso_9_Seccion_1)
		arr_docentes.push(docente_curso_9_Seccion_2)

		function getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function* creacion_random(cantidad_cursos, cantidad_secciones) {
			for (let i = 0; i < cantidad_cursos; i++) {
				const cursillo = new Curso(`Curso ${i + 10}`, 8, getRndInteger(2, 5))
				for (let j = 0; j < cantidad_secciones; j++) {
					let ticha = arr_docentes[getRndInteger(0, arr_docentes.length)]
					let chedule = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
					let cant_oras = getRndInteger(2, 3)
					let ora_inisio = getRndInteger(7, 22 - cant_oras)
					chedule[getRndInteger(0, chedule)] = [ora_inisio, ora_inisio + cant_oras]
					let cursillo_seccion = new CursoSeccion(cursillo, j + 1, ticha, chedule)
					console.log(`generador random ${cursillo_seccion}`)
					yield cursillo_seccion
				}
			}
		}
		//																		    L	    M	    MI		 J	  	V		S
		let curso_1_Seccion_1 = new CursoSeccion(curso_1, 1, docente_curso_1_Seccion_1, [[0, 0], [0, 0], [18, 20], [0, 0], [18, 20], [0, 0]])
		let curso_2_Seccion_1 = new CursoSeccion(curso_2, 1, docente_curso_2_Seccion_1, [[0, 0], [0, 0], [13, 16], [0, 0], [14, 16], [0, 0]])
		let curso_3_Seccion_1 = new CursoSeccion(curso_3, 1, docente_curso_3_Seccion_1, [[0, 0], [0, 0], [0, 0], [0, 0], [20, 22], [9, 11]])
		let curso_4_Seccion_1 = new CursoSeccion(curso_4, 1, docente_curso_4_Seccion_1, [[0, 0], [18, 20], [0, 0], [0, 0], [0, 0], [14, 16]])
		let curso_4_Seccion_2 = new CursoSeccion(curso_4, 2, docente_curso_4_Seccion_2, [[0, 0], [0, 0], [0, 0], [20, 22], [20, 22], [0, 0]])
		let curso_5_Seccion_1 = new CursoSeccion(curso_5, 1, docente_curso_5_Seccion_1, [[7, 10], [0, 0], [7, 10], [0, 0], [0, 0], [0, 0]])
		let curso_6_Seccion_1 = new CursoSeccion(curso_6, 1, docente_curso_6_Seccion_1, [[7, 10], [0, 0], [0, 0], [0, 0], [18, 22], [0, 0]])
		let curso_6_Seccion_2 = new CursoSeccion(curso_6, 2, docente_curso_6_Seccion_2, [[0, 0], [7, 11], [0, 0], [7, 10], [0, 0], [0, 0]])
		let curso_7_Seccion_1 = new CursoSeccion(curso_7, 1, docente_curso_7_Seccion_1, [[0, 0], [7, 9], [0, 0], [7, 9], [0, 0], [0, 0]])
		let curso_8_Seccion_1 = new CursoSeccion(curso_8, 1, docente_curso_8_Seccion_1, [[0, 0], [0, 0], [13, 16], [0, 0], [14, 16], [0, 0]])
		let curso_9_Seccion_1 = new CursoSeccion(curso_9, 1, docente_curso_9_Seccion_1, [[7, 10], [0, 0], [0, 0], [7, 9], [0, 0], [0, 0]])
		let curso_9_Seccion_2 = new CursoSeccion(curso_9, 2, docente_curso_9_Seccion_2, [[0, 0], [0, 0], [18, 22], [0, 0], [14, 16], [0, 0]])
		// curso_X_Seccion_X = CursoSeccion(curso_X, 2, 'profe X', [( 0, 0),( 0, 0),( 0, 0),( 0, 0),( 0, 0),( 0, 0)])

		let arrayCursosSeccion = []
		arrayCursosSeccion.push(curso_1_Seccion_1)
		arrayCursosSeccion.push(curso_2_Seccion_1)
		arrayCursosSeccion.push(curso_3_Seccion_1)
		arrayCursosSeccion.push(curso_4_Seccion_1)
		arrayCursosSeccion.push(curso_4_Seccion_2)
		arrayCursosSeccion.push(curso_5_Seccion_1)
		arrayCursosSeccion.push(curso_6_Seccion_1)
		arrayCursosSeccion.push(curso_6_Seccion_2)
		arrayCursosSeccion.push(curso_7_Seccion_1)
		arrayCursosSeccion.push(curso_8_Seccion_1)
		arrayCursosSeccion.push(curso_9_Seccion_1)
		arrayCursosSeccion.push(curso_9_Seccion_2)

		
		this.arrAllCursoSeccion = []
		var arrAux = []
		arrAux.push(curso_1_Seccion_1);
		this.arrAllCursoSeccion[0] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_2_Seccion_1);
		this.arrAllCursoSeccion[1] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_3_Seccion_1);
		this.arrAllCursoSeccion[2] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_4_Seccion_1);
		arrAux.push(curso_4_Seccion_2);
		this.arrAllCursoSeccion[3] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_5_Seccion_1);
		this.arrAllCursoSeccion[4] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_6_Seccion_1);
		arrAux.push(curso_6_Seccion_2);
		this.arrAllCursoSeccion[5] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_7_Seccion_1);
		this.arrAllCursoSeccion[6] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_8_Seccion_1);
		this.arrAllCursoSeccion[7] = arrAux.slice()
		arrAux = []
		arrAux.push(curso_9_Seccion_1);
		arrAux.push(curso_9_Seccion_2);
		this.arrAllCursoSeccion[8] = arrAux.slice()

		
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

		return arrayCursosSeccion
	} // load_data

	runWEA(prm_cantIteraciones: number = 1000, prm_cantSeccionesMutadas: number = 1, prm_cantBestSolucions: number = 50){
		
		let start_time = new Date()
		let wea = new WEA(this.arrAllCursoSeccion, this.arrayHorarioHorasNoDeseadas, prm_cantIteraciones, prm_cantSeccionesMutadas, prm_cantBestSolucions);
		/*
		
	dificultad_maxima: number;
	numero_desado_cursos: number;
	peso_rating: any;
	pesos_objetivo: any;
	soluciones: any;
	arrayHorarioHorasNoDeseadas: any;
	arrAllCursoSeccion: CursoSeccion[][];*/
		wea.dificultad_maxima = this.dificultad_maxima
		wea.numero_desado_cursos = this.numero_desado_cursos
		wea.peso_rating = this.peso_rating
		wea.pesos_objetivo = this.pesos_objetivo
		
		wea.run();
		console.log(`--- Tiempo de calculo del puntaje:  ${(new Date().getTime() - start_time.getTime())*0.001} segundos ---`);
		let arr = wea.arrBestSolutions;
		for (let i = 0;  i<10 && i < arr.length; i++) {
			const element = arr[i];
			//console.log(element);
		}
	}

} // HorarioManager
let horarioManager = new HorarioManager();
horarioManager.runWEA();