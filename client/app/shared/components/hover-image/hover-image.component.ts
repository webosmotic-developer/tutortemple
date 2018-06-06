import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hover-image',
  templateUrl: './hover-image.component.html',
  styleUrls: ['./hover-image.component.css']
})
export class HoverImageComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
