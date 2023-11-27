import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../post.model';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-read',
  templateUrl: './post-read.component.html',
  styleUrls: ['./post-read.component.css'],
})
export class PostReadComponent implements OnInit {
  dataSource: MatTableDataSource<Post>;
  displayedColumns: string[] = ['id', 'name', 'title', 'body', 'action'];
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  formatText(text: string): string {
    if (text.length > 40) {
      return text.substring(0, 40) + '...';
    } else {
      return text;
    }
  }

  loadPosts(): void {
    this.postService.read().subscribe((posts) => {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
