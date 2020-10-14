import { Component } from '@angular/core';

import { ObjectAnalyserService } from './services';
import { FieldModel } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    input =
        '{"a":true,"b":1,"c":"Hello, World!","d":{"e":"I am a nested string!","f":{"g":{"h":{"i":"So am I!","j":false,"k":123,"l":"And I am last!"}}}}}';

    fields: FieldModel[] = [];

    constructor(private objectAnalyser: ObjectAnalyserService) {}

    inputChanged(newInput: any): void {
        this.input = newInput;

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
            console.error('JSON error:', error.message);
        }
    }
}
