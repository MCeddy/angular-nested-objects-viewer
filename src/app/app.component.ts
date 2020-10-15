import { Component } from '@angular/core';

import { ObjectAnalyserService } from './services';
import { FieldModel } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    input = '';
    errorMessage: string;

    fields: FieldModel[] = [];

    constructor(private objectAnalyser: ObjectAnalyserService) {}

    inputChanged(newInput: string): void {
        this.input = newInput;

        // reset error
        this.errorMessage = null;

        if (newInput === '') {
            // reset fields
            this.fields = [];

            return;
        }

        try {
            const nestedObject = JSON.parse(this.input);

            this.fields = this.objectAnalyser.analyse(nestedObject);

            console.log('fields', this.fields);
        } catch (error) {
            console.error(error?.message);

            this.errorMessage = error?.message;
        }
    }
}
