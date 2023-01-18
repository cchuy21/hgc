import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscuelaPage } from './escuela.page';

describe('EscuelaPage', () => {
  let component: EscuelaPage;
  let fixture: ComponentFixture<EscuelaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscuelaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
