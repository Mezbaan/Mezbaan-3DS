import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/shared/user.service';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponent implements OnInit {
	
	public user;

  constructor(public userService: UserService,
              public route: ActivatedRoute
              ) {

              this.route.params.subscribe(params => {
      console.log('params["id"]',params['id']);
      this.userService.getProfile(params['id']).subscribe((data)=>{
        console.log(data)
        this.user = data;
        
      });
    });
              }

  ngOnInit() {
    
  }


}