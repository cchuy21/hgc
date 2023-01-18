import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OportunidadesPage } from './oportunidades.page';

describe('OportunidadesPage', () => {
  let component: OportunidadesPage;
  let fixture: ComponentFixture<OportunidadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OportunidadesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OportunidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
