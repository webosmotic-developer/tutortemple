import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ReadJsonService} from '../../shared/services/read-json-service/read-json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public tutors: any = [];
  public subjects: any = [];
  public categories: any = [];
  public search: any;

  public selected: string;

  constructor(private http: HttpClient, private readJsonService: ReadJsonService) {
    this.readJsonService.getData('assets/jsonData/tutor-data.json').then((response) => {
      this.tutors = response;
    });

    this.readJsonService.getData('assets/jsonData/subject-data.json').then(response => {
      this.subjects = response;
    });

    this.readJsonService.getData('assets/jsonData/category-data.json').then(response => {
      this.categories = response;
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.selected = 'popular';
    });
  }
}
