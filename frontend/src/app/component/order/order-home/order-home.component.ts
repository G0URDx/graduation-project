import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from '../order';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../service/order/order.service';
import { Client } from '../../client/client';
import { TransportationOffer } from '../../transportation-offer/transportation-offer';
import { Cargo } from '../../cargo/cargo';
import { Recipient } from '../../recipient/recipient';
import { Customs } from '../../customs/customs';
import { Sender } from '../../sender/sender';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './order-home.component.html',
  styleUrl: './order-home.component.scss'
})
export class OrderHomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_order', 'name_manager', 'client', 'transportationOffer', 'id_client_order', 'payment_terms_order', 'freight_order', 'account_currency_order',
    'payment_currency_order', 'description_order', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Order>();
  orders: Order[]=[];
  filteredOrders: Order[]=[];

  // Blank objects for order
  sender: Sender = {
    id_sender: 0,
    name_sender: '',
    location_sender: '',
  };
  customes: Customs = {
    id_customs: 0,
    name_customs: '',
    location_customs: ''
  };
  recipient: Recipient = {
    id_recipient: 0,
    name_recipient: '',
    location_recipient: '',
  };
  cargo: Cargo = {
    id_cargo: null,
    name_cargo: '',
    ldm_cargo: null,
    price_cargo: null,
    gross_cargo: null,
    max_height_cargo: null,
    size_cargo: '',
    quantity_cargo: null,
    danger_cargo: false,
    sender: this.sender,
    location_load_cargo: '',
    date_load_cargo: new Date(0),
    customs: this.customes,
    date_customs_cargo: new Date(0),
    recipient: this.recipient,
    location_unload_cargo: '',
    date_unload_cargo: new Date(0),
  }

  /* Order dialog */
  client: Client = {
    id_client: 0,
    name_client: '',
    location_client: '',
    work_number_client: '',
    tax_number_client: '',
    employee_client: '',
    description_client: '',
  }
  transportationOffer: TransportationOffer = {
    id_offer: 0,
    date_offer: new Date(0),
    nameManager: '',
    client: this.client,
    cargo: this.cargo,
    freight_transportation_offer: 0,
  }
  id_client_order: String = '';
  payment_terms_order: String = '';
  freight_order: any = undefined;
  account_currency_order: String = '';
  payment_currency_order: String = '';
  description_order: String = '';

  order: Order = {
    id_order: 0,
    client: this.client,
    transportationOffer: this.transportationOffer,
    id_client_order: this.id_client_order,
    payment_terms_order: this.payment_terms_order,
    freight_order: this.freight_order,
    account_currency_order: this.account_currency_order,
    payment_currency_order: this.payment_currency_order,
    description_order: this.description_order
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  readonly dialog = inject(MatDialog);

  constructor(private orderService: OrderService) {}

  ngAfterViewInit(): void {
    this.orderService.fetchAllOrders().subscribe((data) => {
      this.orders = data;
      this.dataSource = new MatTableDataSource<Order>(data); // Input data
      this.dataSource.sort = this.sort; // Sorting
      this.dataSource.paginator = this.paginator; // Paginator
    })
  }

  searchOrder(input: any) {
    this.filteredOrders = this.orders.filter(order => 
      order.id_order.toString().toLowerCase().includes(input.toLowerCase()) ||
      order.client.name_client.toLowerCase().includes(input.toLowerCase()) ||
      order.transportationOffer.id_offer.toString().toLowerCase().includes(input.toLowerCase()) ||
      order.id_client_order.toLowerCase().includes(input.toLowerCase()) ||
      order.payment_terms_order.toLowerCase().includes(input.toLowerCase()) ||
      order.freight_order.toString().toLowerCase().includes(input.toLowerCase()) ||
      order.account_currency_order.toLowerCase().includes(input.toLowerCase()) ||
      order.payment_currency_order.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Order>(this.filteredOrders);
  }

  openOrderDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      data: {
        order: { ...order },
        transportationOffer: { ...order.transportationOffer }
      }
    });
  }

  deleteOrder(id_order: Number) {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      console.log("Deleting order with id:", id_order);
      this.orderService.deleteOrder(id_order).subscribe({
        next: () => {
          // Удаляем локально, чтобы не перезагружать страницу
          this.orders = this.orders.filter(order => order.id_order !== id_order);
          this.dataSource.data = this.orders; // Обновляем источник данных таблицы
          alert("Order deleted successfully");
        },
        error: (err) => {
          console.error("Error deleting order:", err);
          alert("Failed to delete order. Please try again.");
        }
      });
    }
  }
  

}
