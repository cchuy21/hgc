import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpresaynegocioPage } from './empresaynegocio.page';

describe('EmpresaynegocioPage', () => {
  let component: EmpresaynegocioPage;
  let fixture: ComponentFixture<EmpresaynegocioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaynegocioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaynegocioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
