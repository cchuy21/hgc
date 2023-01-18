import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IniciaexitoPage } from './iniciaexito.page';

describe('IniciaexitoPage', () => {
  let component: IniciaexitoPage;
  let fixture: ComponentFixture<IniciaexitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciaexitoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciaexitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
