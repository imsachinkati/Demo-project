import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserIstComponent } from './modules/user/user-ist/user-ist.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { FormsModule } from '@angular/forms';
import { PureTimeAgoPipe } from './shared/pipes/pure-time-ago';
import { ImpureTimeAgoPipe } from './shared/pipes/impure-time-ago';


@NgModule({
  declarations: [
    AppComponent, 
    UserIstComponent,
    PureTimeAgoPipe, // Declare your pure pipe
    ImpureTimeAgoPipe // Declare your impure pipe
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
