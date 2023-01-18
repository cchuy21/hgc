import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OxxoPage } from './oxxo.page';

describe('OxxoPage', () => {
  let component: OxxoPage;
  let fixture: ComponentFixture<OxxoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxxoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OxxoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
