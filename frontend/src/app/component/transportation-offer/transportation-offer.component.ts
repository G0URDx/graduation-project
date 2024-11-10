import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token/token.service';

@Component({
  selector: 'app-transportation-offer',
  templateUrl: './transportation-offer.component.html',
  styleUrl: './transportation-offer.component.scss'
})
export class TransportationOfferComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
      if (this.tokenService.getToken()) {
        this.isLogged = true;
      }
      else {
        this.isLogged = false;
      }
  }
}
