import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@ngrx/store': 'Store',
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype'
};

export default {
    external: Object.keys(globals),
    plugins: [resolve(), sourcemaps()],
    onwarn: () => { return },
    output: {
        format: 'umd',
        name: 'ng.ngrxActionDebouncer',
        globals: globals,
        sourcemap: true,
        exports: 'named'
    }
}
