import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-crud',
  templateUrl: './posts-crud.component.html',
  styleUrls: ['./posts-crud.component.css']
})
export class PostsCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToUserCreate(): void {
    this.router.navigate(['/posts/create']);
  }
}
