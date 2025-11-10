import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {path: '', component:SettingComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'privacy', component:PrivacyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
