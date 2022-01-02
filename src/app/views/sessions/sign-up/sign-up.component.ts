import {Component, OnInit} from '@angular/core';
import {SharedAnimations} from '../../../shared/shared-animations/shared-animations';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    animations: [SharedAnimations]
})
export class SignUpComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
