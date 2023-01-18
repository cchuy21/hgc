import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaludPage } from './salud.page';

describe('SaludPage', () => {
  let component: SaludPage;
  let fixture: ComponentFixture<SaludPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaludPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaludPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
