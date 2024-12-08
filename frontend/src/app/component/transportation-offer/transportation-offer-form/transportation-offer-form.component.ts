import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatOption, provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TransportationOffer } from '../transportation-offer';
import { TransportationOfferService } from '../../../service/transportation-offer/transportation-offer.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ClientService } from '../../../service/client/client.service';
import { Client } from '../../client/client';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Cargo } from '../../cargo/cargo';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Sender } from '../../sender/sender';
import { Customs } from '../../customs/customs';
import { Recipient } from '../../recipient/recipient';
import { SenderService } from '../../../service/sender/sender.service';
import { CustomsService } from '../../../service/customs/customs.service';
import { RecipientService } from '../../../service/recipient/recipient.service';
import { CargoService } from '../../../service/cargo/cargo.service';

@Component({
  selector: 'app-transportation-offer-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatFormFieldModule, MatInputModule, MatIconModule, 
    MatDatepickerModule, MatButtonModule, CommonModule, FormsModule, MatSelect, MatOption, NgxMatSelectSearchModule, ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './transportation-offer-form.component.html',
  styleUrl: './transportation-offer-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransportationOfferFormComponent implements AfterViewInit {

  readonly dialogRef = inject(MatDialogRef<TransportationOfferFormComponent>);
  readonly dialogData = inject<any>(MAT_DIALOG_DATA);

  dataTransportationOffer: TransportationOffer = this.dialogData?.transportationOffer || {};
  dataCargo: Cargo = this.dialogData?.cargo || {};

  // Mat-Select-Search variables for Transportation offer
  clients: Client[] = [];
  public clientFilterCtrl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  public filteredClients: ReplaySubject<Client[]> = new ReplaySubject<Client[]>(1);
  // End of Mat-Select-Search variables for Transportation offer

  // Mat-Select-Search variables for Cargo
  senders: Sender[] = [];
  customs: Customs[] = [];
  recipients: Recipient[] = [];

  public senderFilterCtrl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  public customsFilterCtrl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  public recipientFilterCtrl: FormControl<string> = new FormControl<string>('', {nonNullable: true});

  public filteredSenders: ReplaySubject<Sender[]> = new ReplaySubject<Sender[]>(1);
  public filteredCustoms: ReplaySubject<Customs[]> = new ReplaySubject<Customs[]>(1);
  public filteredRecipients: ReplaySubject<Recipient[]> = new ReplaySubject<Recipient[]>(1);
  // End of Mat-Select-Search variables for Transportation offer

  // Mat-Select-Search settings
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  // End of Mat-Select-Search settings

  constructor(
    private transportationOfferService: TransportationOfferService,
    private cargoService: CargoService, 
    private clientService: ClientService,
    private senderService: SenderService,
    private customsService: CustomsService,
    private recipientService: RecipientService
  ) {}

  ngAfterViewInit(): void {
    // Fetching all clients for Mat-Select-Search
    this.clientService.fetchAllClient().subscribe((clientData) => {
      this.clients = clientData;
      this.filteredClients.next(this.clients.slice());
    });
    this.clientFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filterClients();
    });
    // End of Fetching all clients for Mat-Select-Search

    // Fetching all senders for Mat-Select-Search
    this.senderService.fetchAllSenders().subscribe((senderData) => {
      this.senders = senderData;
      this.filteredSenders.next(this.senders.slice());
    });
    this.senderFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filterSenders();
    });
    // End of Fetching all senders for Mat-Select-Search

    // Fetching all customs for Mat-Select-Search
    this.customsService.fetchAllCustoms().subscribe((customsData) => {
      this.customs = customsData;
      this.filteredCustoms.next(this.customs.slice());
    });
    this.customsFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filterCustoms();
    });
    // End of Fetching all customs for Mat-Select-Search

    // Fetching all recipients for Mat-Select-Search
    this.recipientService.fetchAllRecipients().subscribe((recipientData) => {
      this.recipients = recipientData;
      this.filteredRecipients.next(this.recipients.slice());
    });
    this.recipientFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
        this.filterRecipients();
    });
    // End of Fetching all recipients for Mat-Select-Search
  }

  addOrEditTransportationOffer(transportationOffer: TransportationOffer, cargo: Cargo) {
    if(transportationOffer.id_offer !== 0) {
      this.cargoService.updateCargo(cargo).subscribe({
        next:(dataCargo) => {
          console.log("Cargo updated Successfully")
          transportationOffer.cargo = dataCargo;
          this.transportationOfferService.updateTransportationOffer(transportationOffer).subscribe({
            next:(dataTransportationOffer) => {
              console.log("Transportation offer created Successfully")
              window.location.reload();
            },
            error:(err) => {
              console.log(err);
            }
          })
        },
        error:(err) => {
          console.log(err);
        }
      })
    } else {
      this.cargoService.createCargo(cargo).subscribe({
        next:(dataCargo) => {
          console.log("Cargo created Successfully")
          transportationOffer.cargo = dataCargo;
          this.transportationOfferService.createTransportationOffer(transportationOffer).subscribe({
            next:(dataTransportationOffer) => {
              console.log("Transportation offer created Successfully")
              window.location.reload();
            },
            error:(err) => {
              console.log(err);
            }
          })
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }

  // Filter method
  protected filterItems<T>(
    items: T[] | undefined,
    filterCtrl: { value: string | null },
    filteredItems: { next: (value: T[]) => void },
    nameField: keyof T
  ) {
    if (!items) {
      return;
    }
  
    let search = filterCtrl.value;
    if (!search) {
      filteredItems.next(items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    filteredItems.next(
      items.filter((item) => {
        const name = (item[nameField] as unknown as string).toLowerCase();
        return name.indexOf(search) > -1;
      })
    );
  }
  // End of Filter method

  // Custom filter methods
  protected filterClients() {
    this.filterItems(this.clients, this.clientFilterCtrl, this.filteredClients, 'name_client');
  }
  
  protected filterSenders() {
    this.filterItems(this.senders, this.senderFilterCtrl, this.filteredSenders, 'name_sender');
  }

  protected filterCustoms() {
    this.filterItems(this.customs, this.customsFilterCtrl, this.filteredCustoms, 'name_customs');
  }

  protected filterRecipients() {
    this.filterItems(this.recipients, this.recipientFilterCtrl, this.filteredRecipients, 'name_recipient');
  }
  // End of Custom filter methods

  danger_cargo: boolean = false;

  changeValue(value) {
    this.danger_cargo = !value;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
  
}
