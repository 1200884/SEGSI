import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardFleetComponent } from './board-fleet/board-fleet.component';
import { WarehousesComponent } from './board-warehouse/get-warehouses/get-warehouses.component';
import { UpdateWarehouseComponent } from './board-warehouse/update-warehouse/update-warehouse.component';
import { BoardWarehouseComponent } from './board-warehouse/board-warehouse.component';
import { CreateWarehouseComponent } from './board-warehouse/create-warehouse/create-warehouse.component';
import { BoardLogisticsComponent } from './board-logistics/board-logistics.component';
import { CreateTruckComponent } from './board-fleet/create-truck/create-truck.component';
import { PutTruckComponent } from './board-fleet/put-truck/put-truck.component';
import { PatchTruckComponent } from './board-fleet/patch-truck/patch-truck.component';
import { GetTruckComponent } from './board-fleet/get-truck/get-truck.component';
import { DeliveriesComponent } from "./board-warehouse/get-deliveries/get-deliveries.component";
import { CreateDeliveryComponent } from "./board-warehouse/create-delivery/create-delivery.component";
import { UpdateDeliveryComponent } from "./board-warehouse/update-delivery/update-delivery.component";
import { CreatePathComponent } from './board-logistics/create-path/create-path.component';
import { GetTrucksComponent } from './board-fleet/get-trucks/get-trucks.component';
import { OktaCallbackComponent } from '@okta/okta-angular';

import { GetPackagingComponent } from './board-logistics/get-packaging/get-packaging.component';
import { GetPackagingsComponent } from './board-logistics/get-packagings/get-packagings.component';
import { PutPackagingComponent } from './board-logistics/put-packaging/put-packaging.component';
import { CreatePackagingComponent } from './board-logistics/create-packaging/create-packaging.component';
import { GetPathsComponent } from './board-logistics/get-path/get-paths.component';
import { GetPlanningComponent } from './board-logistics/get-planning/get-planning.component';
import { GetGeneticplanningComponent } from './board-logistics/get-geneticplanning/get-geneticplanning.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'warehouse', component: BoardWarehouseComponent },
  { path: 'fleet', component: BoardFleetComponent },
  { path: 'logistics', component: BoardLogisticsComponent },
  { path: 'warehouses', component: WarehousesComponent },
  { path: 'deliveries', component: DeliveriesComponent },
  { path: 'warehouses/:id/:check3', component: UpdateWarehouseComponent },
  { path: 'deliveries/:id', component: UpdateDeliveryComponent },
  { path: 'trucks/:id', component: PutTruckComponent},
  { path: 'Create warehouses', component: CreateWarehouseComponent },
  { path: 'Create deliveries', component: CreateDeliveryComponent },
  { path: 'get-trucks', component: GetTrucksComponent },
  { path: 'get-truck', component: GetTruckComponent },
  { path: 'create-truck', component: CreateTruckComponent },
  { path: 'put-truck', component: PutTruckComponent },
  { path: 'patch-truck', component: PatchTruckComponent },
  { path: 'create-paths', component: CreatePathComponent },
  { path: 'get-paths', component: GetPathsComponent },
  { path: 'get-planning', component: GetPlanningComponent },
  {path: 'get-geneticplanning', component:GetGeneticplanningComponent},
  { path: 'get-packagings', component: GetPackagingsComponent },
  { path: 'get-packaging', component: GetPackagingComponent },
  { path: 'create-packaging', component: CreatePackagingComponent },
  { path: 'put-packaging', component: PutPackagingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'login/callback', component: OktaCallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
