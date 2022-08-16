import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects';
import { TopBarModule } from './shared/modules/topBar/topBar.module'
import { PersistenceService } from './shared/services/persistence.service'
import { AuthInterceptor } from './shared/services/authInterceptor.service';
import { GlobalFeedModule } from './globalFeed/globalFeed.module';
import { BannerModule } from './shared/modules/banner/banner.module'
import { PopularTagsModule } from './shared/modules/popularTags/popularTags.module'
import { FeedModule } from './shared/modules/feed/feed.module'
import { FeedToggleModule } from './shared/modules/feedToggle/feedToggle.module'
import { YourFeedModule } from './yourFeed/components/yourFeed.module';
import { TagFeedModule } from './tagFeed/components/tagFeed.module'
import { ArticleModule } from './article/article.module'
import { CreateArticleModule } from './createArticle/createArticle.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true // Pauses recording actions and state changes when the extension window is not open
    }),
    StoreRouterConnectingModule.forRoot(),
    TopBarModule,
    GlobalFeedModule,
    BannerModule,
    PopularTagsModule,
    FeedModule,
    FeedToggleModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,  // CreateArticleModule должен стоять раньше ArticleModule, иначе ArticleModule будет перехватывать
    ArticleModule
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
