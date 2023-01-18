import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YosoyPage } from './yosoy.page';

describe('YosoyPage', () => {
  let component: YosoyPage;
  let fixture: ComponentFixture<YosoyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YosoyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YosoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
