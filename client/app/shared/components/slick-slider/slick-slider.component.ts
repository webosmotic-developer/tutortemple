import {AfterViewInit, Component, Input, OnInit} from '@angular/core';


declare const $: any;

@Component({
    selector: 'app-slick-slider',
    templateUrl: './slick-slider.component.html',
    styleUrls: ['./slick-slider.component.scss']
})
export class SlickSliderComponent implements OnInit, AfterViewInit {
    @Input() sources: any;
    @Input() slickid: string;

    constructor() {
    }

    ngOnInit() {
        setTimeout(() => {

        }, 0);
    }

    ngAfterViewInit() {
        $('.' + this.slickid).slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }
}
